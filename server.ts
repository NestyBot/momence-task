import index from "./index.html";

// CNB only allows CORS from its own origin, so the browser fetches through this proxy.
const CNB_RATES_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

// CNB publishes new rates every working day at 14:30 Prague time.
const PUBLISH_TIME_ZONE = "Europe/Prague";
const PUBLISH_HOUR = 14;
const PUBLISH_MINUTE = 35;

const DAY_MS = 24 * 60 * 60 * 1000;

// Offset of the time zone from UTC at the given instant, in ms.
function timeZoneOffset(date: Date, timeZone: string): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
      .formatToParts(date)
      .map((p) => [p.type, Number(p.value)])
  );
  const wallClock = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return wallClock - Math.floor(date.getTime() / 1000) * 1000;
}

// Next publish time strictly after `now`. Weekends are not skipped, so there is
// at most one extra upstream fetch per weekend day.
function nextPublishTime(now: Date): Date {
  const offset = timeZoneOffset(now, PUBLISH_TIME_ZONE);
  const prague = new Date(now.getTime() + offset);
  let target =
    Date.UTC(prague.getUTCFullYear(), prague.getUTCMonth(), prague.getUTCDate(), PUBLISH_HOUR, PUBLISH_MINUTE) - offset;
  if (target <= now.getTime()) target += DAY_MS;
  return new Date(target);
}

const metrics = {
  startedAt: new Date(),
  requests: 0,
  upstreamFetches: 0,
  upstreamErrors: 0,
};

type CachedRates = { body: string; fetchedAt: Date; expiresAt: Date };

let cache: CachedRates | undefined;
// Shared between concurrent requests so a cache miss triggers only one upstream fetch.
let inflight: Promise<CachedRates> | undefined;

async function fetchUpstream(): Promise<CachedRates> {
  metrics.upstreamFetches++;
  const res = await fetch(CNB_RATES_URL);
  if (!res.ok) throw new Error(`CNB responded with ${res.status}`);
  const now = new Date();
  return { body: await res.text(), fetchedAt: now, expiresAt: nextPublishTime(now) };
}

async function getRates(): Promise<CachedRates> {
  if (cache && cache.expiresAt > new Date()) return cache;

  inflight ??= fetchUpstream()
    .then((fresh) => (cache = fresh))
    .catch((error) => {
      metrics.upstreamErrors++;
      throw error;
    })
    .finally(() => (inflight = undefined));

  try {
    return await inflight;
  } catch (error) {
    // Better to serve yesterday's rates than nothing.
    if (cache) return cache;
    throw error;
  }
}

const server = Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  development: process.env.NODE_ENV !== "production",
  routes: {
    "/api/rates": async () => {
      metrics.requests++;
      try {
        const rates = await getRates();
        return new Response(rates.body, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      } catch {
        return new Response("Upstream error", { status: 502 });
      }
    },
    "/api/metrics": () =>
      Response.json({
        ...metrics,
        cacheFetchedAt: cache?.fetchedAt ?? null,
        cacheExpiresAt: cache?.expiresAt ?? null,
      }),
    "/*": index,
  },
});

console.log(`Listening on ${server.url}`);
