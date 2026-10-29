export type ExchangeRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

// CNB exchange rates, 29 Oct 2026 #208
export const exchangeRates: ExchangeRate[] = [
  { country: "Australia", currency: "dollar", amount: 1, code: "AUD", rate: 15.359 },
  { country: "Brazil", currency: "real", amount: 1, code: "BRL", rate: 4.085 },
  { country: "Canada", currency: "dollar", amount: 1, code: "CAD", rate: 15.619 },
  { country: "China", currency: "renminbi", amount: 1, code: "CNY", rate: 3.282 },
  { country: "Denmark", currency: "krone", amount: 1, code: "DKK", rate: 3.256 },
  { country: "EMU", currency: "euro", amount: 1, code: "EUR", rate: 24.335 },
  { country: "Hongkong", currency: "dollar", amount: 1, code: "HKD", rate: 2.786 },
  { country: "Hungary", currency: "forint", amount: 100, code: "HUF", rate: 6.65 },
  { country: "Iceland", currency: "krona", amount: 100, code: "ISK", rate: 17.92 },
  { country: "IMF", currency: "SDR", amount: 1, code: "XDR", rate: 29.553 },
  { country: "India", currency: "rupee", amount: 100, code: "INR", rate: 22.949 },
  { country: "Indonesia", currency: "rupiah", amount: 1000, code: "IDR", rate: 1.206 },
  { country: "Israel", currency: "new shekel", amount: 1, code: "ILS", rate: 7.017 },
  { country: "Japan", currency: "yen", amount: 100, code: "JPY", rate: 13.83 },
  { country: "Malaysia", currency: "ringgit", amount: 1, code: "MYR", rate: 5.385 },
  { country: "Mexico", currency: "peso", amount: 1, code: "MXN", rate: 1.165 },
  { country: "New Zealand", currency: "dollar", amount: 1, code: "NZD", rate: 12.277 },
  { country: "Norway", currency: "krone", amount: 1, code: "NOK", rate: 2.353 },
  { country: "Philippines", currency: "peso", amount: 100, code: "PHP", rate: 34.248 },
  { country: "Poland", currency: "zloty", amount: 1, code: "PLN", rate: 5.539 },
  { country: "Romania", currency: "leu", amount: 1, code: "RON", rate: 4.552 },
  { country: "Singapore", currency: "dollar", amount: 1, code: "SGD", rate: 17.059 },
  { country: "South Africa", currency: "rand", amount: 1, code: "ZAR", rate: 1.313 },
  { country: "South Korea", currency: "won", amount: 100, code: "KRW", rate: 1.634 },
  { country: "Sweden", currency: "krona", amount: 1, code: "SEK", rate: 2.212 },
  { country: "Switzerland", currency: "franc", amount: 1, code: "CHF", rate: 26.377 },
  { country: "Thailand", currency: "baht", amount: 100, code: "THB", rate: 64.774 },
  { country: "Turkey", currency: "lira", amount: 100, code: "TRY", rate: 43.868 },
  { country: "United Kingdom", currency: "pound", amount: 1, code: "GBP", rate: 29.115 },
  { country: "USA", currency: "dollar", amount: 1, code: "USD", rate: 21.862 },
];
