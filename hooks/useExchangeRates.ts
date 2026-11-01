import { useQuery } from "@tanstack/react-query";
import { parseExchangeRates, type ExchangeRates } from "../utils/exchangeRates";

async function fetchExchangeRates(): Promise<ExchangeRates> {
  const res = await fetch("/api/rates");
  if (!res.ok) throw new Error(`Failed to load exchange rates (${res.status})`);
  return parseExchangeRates(await res.text());
}

export function useExchangeRates() {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
    staleTime: 60 * 60 * 1000,
  });
}
