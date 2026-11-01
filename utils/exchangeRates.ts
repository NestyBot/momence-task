export type ExchangeRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

export type ExchangeRates = {
  date: string;
  rates: ExchangeRate[];
};

// Format: "30 Oct 2026 #209", then a column header line, then "Country|Currency|Amount|Code|Rate" rows.
export function parseExchangeRates(text: string): ExchangeRates {
  const [header, , ...rows] = text.trim().split("\n");
  if (!header) throw new Error("Empty exchange rates response");

  const date = header.split("#")[0]!.trim();
  const rates = rows.map((row) => {
    const [country, currency, amount, code, rate] = row.split("|");
    return {
      country: country!,
      currency: currency!,
      amount: Number(amount),
      code: code!,
      rate: Number(rate),
    };
  });

  return { date, rates };
}
