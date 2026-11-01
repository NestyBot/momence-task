import styled from "styled-components";
import { unitStyles } from "../AmountField/AmountField.styles";

// No positioning here: the popover anchors to the surrounding AmountField
export const Root = styled.div`
  display: contents;
`;

export const Trigger = styled.button`
  ${unitStyles}
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  /* Padding gives the focus ring room, negative margin keeps the layout unchanged */
  padding: 2px ${({ theme }) => theme.spacing(2)};
  margin: -2px -${({ theme }) => theme.spacing(2)};
  font: inherit;
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  background: none;
  cursor: pointer;
  transition: box-shadow 150ms, background 150ms;

  &:focus {
    outline: none;
  }

  /* Same soft ring as the amount fields, only for keyboard focus */
  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.colors.highlightSubtle};
    box-shadow:
      0 0 0 1px ${({ theme }) => theme.colors.focus},
      0 0 0 4px ${({ theme }) => theme.colors.highlight};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Chevron = styled.svg<{ $open: boolean }>`
  width: 0.75em;
  height: 0.75em;
  transition: transform 150ms;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

export const Popover = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing(1)});
  left: 0;
  right: 0;
  z-index: 10;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
`;

export const Search = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)};
  font: inherit;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
`;

export const List = styled.ul`
  max-height: 300px;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
`;

export const Option = styled.li<{ $active: boolean; $selected: boolean }>`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  cursor: pointer;
  background: ${({ theme, $active, $selected }) =>
    $selected
      ? theme.colors.highlight
      : $active
        ? theme.colors.highlightSubtle
        : "transparent"};
`;

export const Empty = styled.li`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.textMuted};
`;
