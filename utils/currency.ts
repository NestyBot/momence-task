import type { ExchangeRate } from "./exchangeRates";

// 1 trillion, anything above is pointless for a converter.
export const MAX_AMOUNT = 1_000_000_000_000;

export function convertFromCzk(czk: number, rate: ExchangeRate): number {
  return (czk * rate.amount) / rate.rate;
}

export function convertToCzk(amount: number, rate: ExchangeRate): number {
  return (amount * rate.rate) / rate.amount;
}

export function roundAmount(value: number): number {
  return Math.round(value * 100) / 100;
}

// Returns null when the value is over MAX_AMOUNT, so the input can reject it.
// A converted value can already be over the max, so shrinking it is still allowed.
export function parseAmount(raw: string, current: number): number | null {
  const value = roundAmount(Number(raw));
  return value > MAX_AMOUNT && value > current ? null : value;
}

export function matchesQuery(rate: ExchangeRate, query: string): boolean {
  const q = query.trim().toLowerCase();
  return [rate.code, rate.country, rate.currency].some(
    (field) => field.toLowerCase().includes(q)
  );
}
