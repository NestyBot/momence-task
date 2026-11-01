import type { ExchangeRate } from "./exchangeRates";

export function convertFromCzk(czk: number, rate: ExchangeRate): number {
  return (czk * rate.amount) / rate.rate;
}

export function convertToCzk(amount: number, rate: ExchangeRate): number {
  return (amount * rate.rate) / rate.amount;
}

export function roundAmount(value: number): number {
  return Math.round(value * 100) / 100;
}

export function matchesQuery(rate: ExchangeRate, query: string): boolean {
  const q = query.trim().toLowerCase();
  return [rate.code, rate.country, rate.currency].some(
    (field) => field.toLowerCase().includes(q)
  );
}
