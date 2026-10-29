import type { JSX } from "react";
import { exchangeRates, type ExchangeRate } from "./mockData";

function CountryCodeRow({ code }: { code: string }) {
  return (
    <tr>
      <th colSpan={2}>
        {code}
      </th>
    </tr>
  );
}

function ExchangeRatesTable({ exchangeRates }: { exchangeRates: ExchangeRate[] }) {
  const rows: JSX.Element[] = [];

  exchangeRates.forEach((rate) => {
    rows.push(
      <CountryCodeRow
        code={rate.code}
        key={rate.code} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Code</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
    </form>
  );
}

function FilterableExchangeRatesTable({ exchangeRates }: { exchangeRates: ExchangeRate[] }) {
  return (
    <div>
      <SearchBar />
      <ExchangeRatesTable exchangeRates={exchangeRates} />
    </div>
  );
}

export default function App() {
  return <FilterableExchangeRatesTable exchangeRates={exchangeRates} />;
}