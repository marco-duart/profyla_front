import { styled } from "../../theme/stitches";

export const Grid = styled("div", {
  display: "grid",
  gap: "$4",
  gridTemplateColumns: "1fr",
  '@md': { gridTemplateColumns: "repeat(2, 1fr)" },
  '@lg': { gridTemplateColumns: "repeat(3, 1fr)" },
});

export const CardWrap = styled("article", {
  display: "flex",
  flexDirection: "column",
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$surface",
  boxShadow: "$soft",
  overflow: "hidden",
});

export const Image = styled("img", {
  display: "block",
  width: "100%",
  aspectRatio: "3 / 1",
  objectFit: "cover",
  backgroundColor: "$canvasAlt",
});

export const Body = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
  padding: "$4",
  flex: 1,
});

export const Tag = styled("span", {
  width: "fit-content",
  fontFamily: "$mono",
  fontSize: "$xs",
  fontWeight: "$medium",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  padding: "$1 $3",
  borderRadius: "$sm",
  border: "1px solid $brand",
  backgroundColor: "$brandSoft",
  color: "$tint",
});

export const Title = styled("h3", {
  fontFamily: "$display",
  fontSize: "$lg",
  fontWeight: "$semibold",
});

export const Subtitle = styled("p", { color: "$textMuted" });

export const Price = styled("p", { fontWeight: "$semibold" });

export const Text = styled("div", {
  color: "$textMuted",
  fontSize: "$sm",
  '& p + p': { marginTop: "$2" },
  '& a': { color: "$brand", textDecoration: "underline" },
});

export const Footer = styled("div", { marginTop: "auto", paddingTop: "$2" });

export const CtaLink = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 44,
  padding: "$2 $5",
  border: "1px solid $brandStrong",
  borderRadius: "$md",
  fontSize: "$sm",
  fontWeight: "$bold",
  backgroundColor: "$brand",
  color: "$text",
  boxShadow: "$glowBrand",
  transition: "background-color 140ms ease",
  '&:hover': { backgroundColor: "$brandStrong" },
});

export const SectionHead = styled("div", {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "$3",
  '& a': { color: "$brand", fontSize: "$sm", fontWeight: "$semibold" },
});

export const SectionTitle = styled("h3", {
  fontFamily: "$display",
  fontWeight: "$semibold",
  fontSize: "$lg",
});

export const Section = styled("section", { display: "grid", gap: "$3" });
