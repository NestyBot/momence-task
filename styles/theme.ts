const palette = {
  indigo50: "#eef2ff",
  indigo100: "#dbe4ff",
  indigo500: "#4c6ef5",
  indigo600: "#3b5bdb",
  indigo700: "#364fc7",
  gray50: "#f8f9fa",
  gray200: "#e9ecef",
  gray300: "#d0d0d0",
  gray600: "#6c757d",
  gray900: "#1a1a1a",
  white: "#ffffff",
};

export const theme = {
  colors: {
    text: palette.gray900,
    textMuted: palette.gray600,
    background: palette.white,
    surface: palette.gray50,
    border: palette.gray300,
    primary: palette.indigo600,
    primaryHover: palette.indigo700,
    // Highlights: text selection, focus rings, hovered/selected rows
    highlight: palette.indigo100,
    highlightSubtle: palette.indigo50,
    focus: palette.indigo500,
  },
  spacing: (n: number) => `${n * 4}px`,
  radius: "6px",
  breakpoints: {
    md: "768px",
  },
};

export type Theme = typeof theme;
