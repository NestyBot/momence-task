import styled, { css } from "styled-components";

export const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  font-size: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.background};
`;

// Shared by the <input> on the left and the <output> on the right
export const valueStyles = css`
  flex: 1 1 0;
  min-width: 0;
  width: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  border: none;
  background: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Shared by the "CZK" label and the currency dropdown trigger
export const unitStyles = css`
  flex-shrink: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;
