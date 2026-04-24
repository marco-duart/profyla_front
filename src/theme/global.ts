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
      "radial-gradient(circle at 8% 8%, #f8dbbf 0%, transparent 40%), radial-gradient(circle at 88% 0%, #c4e4e0 0%, transparent 34%), linear-gradient(180deg, #f5efe5 0%, #efe4d6 100%)",
    lineHeight: 1.5,
  },
  h1: {
    fontFamily: "$display",
    fontSize: "$xxl",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontFamily: "$display",
    fontSize: "$xl",
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
  },
  input: {
    fontFamily: "$body",
  },
  button: {
    fontFamily: "$body",
    cursor: "pointer",
  },
});
