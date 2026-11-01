import styled from "styled-components";
import { Field, unitStyles, valueStyles } from "../AmountField/AmountField.styles";

export const Wrapper = styled(Field).attrs({ as: "form" })`
  transition: border-color 150ms, box-shadow 150ms;

  /* Only the number field lights up the box, the currency button has its own ring */
  &:has(input:focus) {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.highlight};
  }
`;

export const Input = styled.input`
  ${valueStyles}
  -moz-appearance: textfield;

  /* The surrounding box shows focus, so drop the global :focus-visible ring */
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const UnitLabel = styled.label`
  ${unitStyles}
`;
