import styled from "styled-components";

export const Page = styled.main`
  display: grid;
  place-items: center;
  align-content: center;
  gap: ${({ theme }) => theme.spacing(4)};
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  text-align: center;
`;

export const Caption = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
`;
