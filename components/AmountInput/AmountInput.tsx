import type { ReactNode } from "react";
import { roundAmount } from "../../utils/currency";
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
        placeholder="0"
        value={amount === 0 ? '' : amount}
        onChange={(e) => {
          const value = e.target.value.replace(/^0+(?=\d)/, '');
          if (value !== e.target.value) {
            e.target.value = value;
          }
          onAmountChange(roundAmount(Number(value)));
        }}
      />
      {children}
    </Wrapper>
  )
}
