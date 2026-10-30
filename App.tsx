import type { JSX } from "react";
import { useState } from "react";
import { exchangeRates, type ExchangeRate } from "./mockData";

function CountryCodeRow({
  code,
  onSelect,
}: {
  code: string
  onSelect: () => void
}) {
  return (
    <tr>
      <th colSpan={2}>
        <button type="button" onClick={onSelect}>
          {code}
        </button>
      </th>
    </tr>
  );
}

function ExchangeRatesTable({
  exchangeRates,
  filterText,
  onRateChange,
}: {
  exchangeRates: ExchangeRate[]
  filterText: string
  onRateChange: (value: ExchangeRate) => void
}) {
  const rows: JSX.Element[] = [];

  exchangeRates.forEach((rate) => {
    if (rate.code.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
      return
    }
    rows.push(
      <CountryCodeRow
        code={rate.code}
        onSelect={() => onRateChange(rate)}
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

function FilterableExchangeRatesTable({
  exchangeRates,
  onRateChange
}: {
  exchangeRates: ExchangeRate[]
  onRateChange: (value : ExchangeRate) => void
}) {
  const [filterText, setFilterText] = useState('');
  return (
    <div>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}/>
      <ExchangeRatesTable
        exchangeRates={exchangeRates}
        filterText={filterText}
        onRateChange={onRateChange}/>
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

function convertFromCzk(czk: number, rate: ExchangeRate): number {
  return (czk * rate.amount) / rate.rate;
}

function OutputAmount({ amount, rate }: { amount: number; rate: ExchangeRate }){
  const formatted = Number(convertFromCzk(amount, rate).toFixed(3));
  return (
    <div>
      <p>{formatted} {rate.code}</p>
    </div>
  )
}

export default function App() {
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(exchangeRates[0])
  return (
    <div>
      <InputAmount amount={amount} onAmountChange={setAmount}/>
      <OutputAmount amount={amount} rate={rate} />
      <FilterableExchangeRatesTable exchangeRates={exchangeRates} onRateChange={setRate} />
    </div>
  );
}