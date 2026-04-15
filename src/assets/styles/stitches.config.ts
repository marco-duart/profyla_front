import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes, createTheme, config } =
  createStitches({
    theme: {
      colors: {
        primary: "#3974BB",
        primaryDark: "#1C2640",
        primaryLight: "#56B1D5",

        secondary: "#2D4068",
        secondaryDark: "#1A2238",
        secondaryLight: "#3B75C2",

        accent: "#448BCA",
        accentLight: "#6FBFE3",
        accentDark: "#2F6FAF",

        success: "#2ECC71",
        successLight: "#58D68D",
        successDark: "#27AE60",

        error: "#D91B5B",
        errorLight: "#F36A9B",
        errorDark: "#B9154A",

        warning: "#F39C12",
        warningLight: "#F7B84A",
        warningDark: "#D68910",

        info: "#3B75C2",
        infoLight: "#56B1D5",
        infoDark: "#2D4068",

        white: "#F3F3F4",
        black: "#000000",

        lightGray: "#F3F3F4",
        mediumGray: "#D9D4C5",
        darkGray: "#282E38",

        background: "#FFFFFF",
        text: "#282E38",

        shadow: "rgba(0, 0, 0, 0.25)",
        overlay: "rgba(0, 0, 0, 0.5)",
      },

      fonts: {
        primary:
          '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        code:
          'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
      },

      fontWeights: {
        light: 300,
        regular: 400,
        bold: 700,
        extraBold: 800,
      },

      fontSizes: {
        base: "10px",
        small: "1.1em",
        regular: "1.2em",
        medium: "1.3em",
        large: "1.6em",
        xlarge: "2.6em",
        xxlarge: "2.8em",
        huge: "4em",
      },

      space: {
        xsmall: "5px",
        small: "8px",
        medium: "16px",
        large: "20px",
        xlarge: "30px",
        xxlarge: "60px",
      },

      shadows: {
        small: "0 2px 6px rgba(0,0,0,0.15)",
        medium: "0 4px 12px rgba(0,0,0,0.2)",
        large: "0 8px 24px rgba(0,0,0,0.25)",
      },

      breakpoints: {
        mobileS: "(min-width: 320px)",
        mobileM: "(min-width: 375px)",
        mobileL: "(min-width: 425px)",
        tablet: "(min-width: 768px)",
        desktop: "(min-width: 1024px)",
        fullHd: "(min-width: 1920px)",
      },
    },
  });

export type Theme = typeof config.theme;
