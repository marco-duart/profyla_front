import { globalCss } from "./stitches.config";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },

  html: {
    fontSize: "$base",
  },

  body: {
    fontFamily: "$primary",
    color: "$black",
    lineHeight: 1.5,
    backgroundColor: "#f9f9f9",
  },

  "h1, h2, h3, h4, h5, h6": {
    fontWeight: "$bold",
    marginBottom: "$medium",
    lineHeight: 1.2,
  },

  a: {
    color: "inherit",
    textDecoration: "none",
  },

  "button, input, select, textarea": {
    fontFamily: "inherit",
    fontSize: "inherit",
  },

  button: {
    cursor: "pointer",
    border: "none",
    background: "transparent",
  },

  "ul, ol": {
    listStyle: "none",
  },

  img: {
    maxWidth: "100%",
    height: "auto",
    display: "block",
  },

  ".container": {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 $medium",
  },

  ".sr-only": {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },

  "@media (max-width: 768px)": {
    html: {
      fontSize: "8px",
    },
  },
});
