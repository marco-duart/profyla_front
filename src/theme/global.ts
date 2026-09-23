import { globalCss } from "./stitches";

export const globalStyles = globalCss({
  "@import": 'url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap")',
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  "html, body, #root": {
    minHeight: "100%",
  },
  body: {
    fontFamily: "$body",
    color: "$text",
    backgroundColor: "$canvas",
    backgroundImage:
      "radial-gradient(60% 50% at 12% 0%, rgba(106, 71, 245, 0.16) 0%, transparent 60%), radial-gradient(50% 45% at 92% 12%, rgba(255, 106, 77, 0.10) 0%, transparent 60%), linear-gradient(180deg, #0a0c12 0%, #0d0f17 100%)",
    backgroundAttachment: "fixed",
    lineHeight: 1.5,
  },
  h1: {
    fontFamily: "$display",
    fontSize: "$xxl",
    fontWeight: "$bold",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontFamily: "$display",
    fontSize: "$xl",
    fontWeight: "$semibold",
    lineHeight: 1.15,
    letterSpacing: "-0.01em",
  },
  h3: {
    fontFamily: "$display",
    fontWeight: "$semibold",
  },
  "input, textarea, select": {
    fontFamily: "$body",
    color: "$text",
    backgroundColor: "transparent",
  },
  button: {
    fontFamily: "$body",
    color: "$text",
    cursor: "pointer",
  },
  "::selection": {
    backgroundColor: "$brandSoft",
    color: "$text",
  },
  ":focus-visible": {
    outline: "2px solid $colors$brand",
    outlineOffset: "2px",
  },
});
