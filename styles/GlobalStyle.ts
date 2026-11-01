import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    accent-color: ${({ theme }) => theme.colors.primary};
  }

  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    caret-color: ${({ theme }) => theme.colors.primary};
  }

  ::selection {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.highlight};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  mark {
    color: inherit;
    background: ${({ theme }) => theme.colors.highlight};
    border-radius: 2px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;
