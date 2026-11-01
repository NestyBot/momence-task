import { describe, expect, test } from "bun:test";
import { parseExchangeRates } from "./exchangeRates";

describe("Given a CNB exchange rates response", () => {
  const text = `30 Oct 2026 #209
Country|Currency|Amount|Code|Rate
EMU|euro|1|EUR|24.335
Japan|yen|100|JPY|13.830
`;

  test("When parsing, Then it returns the date and typed rates", () => {
    expect(parseExchangeRates(text)).toEqual({
      date: "30 Oct 2026",
      rates: [
        { country: "EMU", currency: "euro", amount: 1, code: "EUR", rate: 24.335 },
        { country: "Japan", currency: "yen", amount: 100, code: "JPY", rate: 13.83 },
      ],
    });
  });
});

describe("Given an empty response", () => {
  test("When parsing, Then it throws", () => {
    expect(() => parseExchangeRates("")).toThrow("Empty exchange rates response");
  });
});
