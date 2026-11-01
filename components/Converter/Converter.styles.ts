import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  width: 100%;
  max-width: 760px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  }
`;
