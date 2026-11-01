import { useState } from "react";
import type { ExchangeRate } from "../../mockData";
import { convertFromCzk, convertToCzk, roundAmount } from "../../utils/currency";
import { AmountInput } from "../AmountInput/AmountInput";
import { UnitLabel } from "../AmountInput/AmountInput.styles";
import { CurrencySelect } from "../CurrencySelect/CurrencySelect";
import { EqualsIcon } from "../EqualsIcon/EqualsIcon";
import { Row } from "./Converter.styles";

// Only the side the user last typed in is stored, the other one is derived.
// This avoids rounding drift from converting back and forth.
type Edited = { side: "czk" | "foreign"; value: number };

export function Converter({ rates }: { rates: ExchangeRate[] }) {
  const [edited, setEdited] = useState<Edited>({ side: "czk", value: 0 });
  const [rate, setRate] = useState(rates[0]);

  const czk = edited.side === "czk"
    ? edited.value
    : roundAmount(convertToCzk(edited.value, rate));
  const foreign = edited.side === "foreign"
    ? edited.value
    : roundAmount(convertFromCzk(edited.value, rate));

  return (
    <Row>
      <AmountInput
        id="amount-czk"
        label="Amount in CZK"
        amount={czk}
        onAmountChange={(value) => setEdited({ side: "czk", value })}
      >
        <UnitLabel htmlFor="amount-czk">CZK</UnitLabel>
      </AmountInput>
      <EqualsIcon />
      <AmountInput
        id="amount-foreign"
        label={`Amount in ${rate.code}`}
        amount={foreign}
        onAmountChange={(value) => setEdited({ side: "foreign", value })}
      >
        <CurrencySelect
          rates={rates}
          selected={rate}
          onSelect={(value) => {
            setRate(value);
            document.getElementById("amount-foreign")?.focus();
          }}
        />
      </AmountInput>
    </Row>
  );
}
