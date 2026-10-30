import type { JSX } from "react";
import { useState } from "react";
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

function ExchangeRatesTable({
  exchangeRates,
  filterText,
}: {
  exchangeRates: ExchangeRate[];
  filterText: string;
}) {
  const rows: JSX.Element[] = [];

  exchangeRates.forEach((rate) => {
    if (rate.code.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
      return
    }
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
          <th>Currency</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  onFilterTextChange
}: {
  filterText: string;
  onFilterTextChange: (value: string) => void;
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </form>
  );
}

function FilterableExchangeRatesTable({ exchangeRates }: { exchangeRates: ExchangeRate[] }) {
  const [filterText, setFilterText] = useState('');
  return (
    <div>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}/>
      <ExchangeRatesTable
        exchangeRates={exchangeRates}
        filterText={filterText}/>
    </div>
  );
}

function InputAmount({
  amount,
  onAmountChange
}: {
  amount: number
  onAmountChange: (value: number) => void
}){

  return (
    <div>
      <form>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="0"
          value={amount === 0 ? '' : amount}
          onChange={(e) => {
            const value = e.target.value.replace(/^0+(?=\d)/, '');
            if (value !== e.target.value) {
              e.target.value = value;
            }
            onAmountChange(Math.round(Number(value) * 100) / 100);
          }}
        />
          <label>CZK</label>
      </form>
    </div>
  )
}

function OutputAmount({ amount }: { amount: number }){
  return (
    <div>
      <p>{amount}</p>
    </div>
  )
}

export default function App() {
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <InputAmount amount={amount} onAmountChange={setAmount}/>
      <OutputAmount amount={amount} />
      <FilterableExchangeRatesTable exchangeRates={exchangeRates} />
    </div>
  );
}