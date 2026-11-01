import styled from "styled-components";

export const Svg = styled.svg`
  flex-shrink: 0;
  align-self: center;
  justify-self: center;
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
