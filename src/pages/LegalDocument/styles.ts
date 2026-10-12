import { styled } from "../../theme/stitches";

export const Page = styled("main", {
  minHeight: "100dvh",
  display: "grid",
  justifyItems: "center",
  alignContent: "start",
  padding: "$6 $4",
  gap: "$4",
});

export const Article = styled("article", {
  width: "100%",
  maxWidth: "820px",
  display: "grid",
  gap: "$3",
  alignContent: "start",
  padding: "$6",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$surface",
  backdropFilter: "blur(20px) saturate(140%)",
  boxShadow: "$medium",
  '& h2': { fontFamily: "$display", fontSize: "$xl", marginTop: "$3" },
  '& h3': { fontFamily: "$display", fontSize: "$lg", marginTop: "$2" },
  '& p, & li': { color: "$text", lineHeight: 1.65 },
  '& ul': { paddingLeft: "$5", display: "grid", gap: "$1" },
  '& a': { color: "$brand" },
  '& blockquote': {
    border: "1px solid $accent",
    backgroundColor: "$surface",
    padding: "$3 $4",
    color: "$accent",
    fontWeight: "$semibold",
  },
});

export const TopRow = styled("div", {
  width: "100%",
  maxWidth: "820px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$3",
  flexWrap: "wrap",
  '& a': { color: "$brand", fontWeight: "$semibold" },
});

export const Meta = styled("p", {
  color: "$textMuted",
  fontSize: "$sm",
});
