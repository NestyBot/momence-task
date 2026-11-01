import styled, { css } from "styled-components";

// Native <details> handles the collapsing and its keyboard/screen reader support
export const Wrapper = styled.details`
  width: 100%;
  max-width: 760px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
  transition: border-color 150ms, box-shadow 150ms;

  /* Same focus look as the amount fields, only for keyboard focus on the toggle */
  &:has(> summary:focus-visible) {
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.highlight};
  }
`;

export const Summary = styled.summary`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  font-weight: 600;
  list-style: none;
  cursor: pointer;
  user-select: none;

  &::-webkit-details-marker {
    display: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.highlightSubtle};
  }

  /* The wrapper shows focus, so drop the global :focus-visible ring */
  &:focus,
  &:focus-visible {
    outline: none;
  }

  details[open] > & {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const Chevron = styled.svg`
  width: 0.875em;
  height: 0.875em;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: transform 150ms;
  transform: rotate(-90deg);

  details[open] & {
    transform: rotate(0deg);
  }
`;

// Keeps "30 Oct 2026" on one line when the title wraps
export const NoWrap = styled.span`
  white-space: nowrap;
`;

export const Count = styled.span`
  margin-left: auto;
  font-weight: 400;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textMuted};
`;

// Positioning context for the scroll hints, which stay put while the table scrolls
export const ScrollArea = styled.div`
  position: relative;
`;

// Scrolls sideways on narrow screens instead of squeezing the columns
export const Scroll = styled.div`
  overflow-x: auto;
`;

// Fades the cut-off edge and shows an arrow badge next to the column headers
export const ScrollHint = styled.div<{ $side: "left" | "right"; $visible: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ $side }) => $side}: 0;
  display: flex;
  align-items: flex-start;
  justify-content: ${({ $side }) => ($side === "left" ? "flex-start" : "flex-end")};
  width: ${({ theme }) => theme.spacing(10)};
  padding: ${({ theme }) => theme.spacing(1)};
  background: linear-gradient(
    to ${({ $side }) => ($side === "left" ? "right" : "left")},
    ${({ theme }) => theme.colors.background},
    transparent
  );
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 150ms;
`;

export const HintBadge = styled.svg`
  width: 24px;
  height: 24px;
  padding: 4px;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.highlight};
  border-radius: 50%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  white-space: nowrap;
`;

// Tighter columns on small screens so more of the table fits without scrolling
const cellPadding = css`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(1)};

  /* Outer cells keep some room from the table border */
  &:first-child {
    padding-left: ${({ theme }) => theme.spacing(2)};
  }

  &:last-child {
    padding-right: ${({ theme }) => theme.spacing(2)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &,
    &:first-child,
    &:last-child {
      padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
    }
  }
`;

export const HeaderCell = styled.th<{ $numeric?: boolean }>`
  ${cellPadding}
  font-weight: 600;
  text-align: ${({ $numeric }) => ($numeric ? "right" : "left")};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Cell = styled.td<{ $numeric?: boolean }>`
  ${cellPadding}
  text-align: ${({ $numeric }) => ($numeric ? "right" : "left")};
  font-variant-numeric: tabular-nums;
`;

export const BodyRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gridLine};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.highlightSubtle};
  }
`;

export const Code = styled.span`
  font-weight: 600;
`;
