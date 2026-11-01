import type { ReactNode } from "react";
import { MAX_AMOUNT, parseAmount } from "../../utils/currency";
import { Input, Wrapper } from "./AmountInput.styles";

export function AmountInput({
  id,
  label,
  amount,
  onAmountChange,
  children,
}: {
  id: string
  label: string
  amount: number
  onAmountChange: (value: number) => void
  children: ReactNode
}){

  return (
    <Wrapper onSubmit={(e) => e.preventDefault()}>
      <Input
        id={id}
        aria-label={label}
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        max={MAX_AMOUNT}
        placeholder="0"
        value={amount === 0 ? '' : amount}
        onChange={(e) => {
          const parsed = parseAmount(e.target.value, amount);
          // Too large: skip the update so React restores the previous value.
          if (parsed === null) return;
          const value = e.target.value.replace(/^0+(?=\d)/, '');
          if (value !== e.target.value) {
            e.target.value = value;
          }
          onAmountChange(parsed);
        }}
      />
      {children}
    </Wrapper>
  )
}
