import { describe, expect, test } from "bun:test";
import type { ExchangeRate } from "./exchangeRates";
import { MAX_AMOUNT, convertFromCzk, convertToCzk, matchesQuery, parseAmount, roundAmount } from "./currency";

const jpy: ExchangeRate = { country: "Japan", currency: "yen", amount: 100, code: "JPY", rate: 13.83 };

describe("Given a rate quoted per 100 units (JPY)", () => {
  test("When converting 13.83 CZK, Then it returns 100 JPY", () => {
    expect(convertFromCzk(13.83, jpy)).toBeCloseTo(100);
  });

  test("When converting 100 JPY, Then it returns 13.83 CZK", () => {
    expect(convertToCzk(100, jpy)).toBeCloseTo(13.83);
  });
});

describe("Given a value with more than 2 decimals", () => {
  test("When rounding, Then it keeps 2 decimals", () => {
    expect(roundAmount(2.346)).toBe(2.35);
    expect(roundAmount(2.344)).toBe(2.34);
  });
});

describe("Given raw input text", () => {
  test("When it is empty, Then the amount is 0", () => {
    expect(parseAmount("", 0)).toBe(0);
  });

  test("When it is exactly the maximum, Then it is accepted", () => {
    expect(parseAmount(String(MAX_AMOUNT), 0)).toBe(MAX_AMOUNT);
  });

  test("When it is over the maximum, Then it is rejected", () => {
    expect(parseAmount(String(MAX_AMOUNT + 1), 0)).toBeNull();
  });

  test("When a converted value over the maximum is shortened, Then it is accepted", () => {
    const converted = MAX_AMOUNT * 30;
    expect(parseAmount(String(converted / 10), converted)).toBe(converted / 10);
    expect(parseAmount("", converted)).toBe(0);
  });

  test("When a converted value over the maximum is made larger, Then it is rejected", () => {
    const converted = MAX_AMOUNT * 30;
    expect(parseAmount(String(converted * 10), converted)).toBeNull();
  });
});

describe("Given a search query", () => {
  test("When it matches code, country or currency in any case, Then the rate matches", () => {
    expect(matchesQuery(jpy, " jpy ")).toBe(true);
    expect(matchesQuery(jpy, "JAPAN")).toBe(true);
    expect(matchesQuery(jpy, "yen")).toBe(true);
  });

  test("When it matches nothing, Then the rate does not match", () => {
    expect(matchesQuery(jpy, "euro")).toBe(false);
  });
});
