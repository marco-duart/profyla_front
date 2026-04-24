import { styled } from "../../theme/stitches";

export const Grid = styled("section", {
  display: "grid",
  gap: "$4",
  '@lg': {
    gridTemplateColumns: "1.15fr 1fr",
  },
});

export const Hero = styled("article", {
  background: "linear-gradient(135deg, $surface 0%, $canvasAlt 100%)",
  border: "1px solid $border",
  borderRadius: "$lg",
  boxShadow: "$soft",
  padding: "$6",
  display: "grid",
  gap: "$4",
});

export const MetricRow = styled("div", {
  display: "grid",
  gap: "$3",
  '@md': {
    gridTemplateColumns: "1fr 1fr",
  },
});

export const MetricCard = styled("div", {
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$surface",
  padding: "$4",
  display: "grid",
  gap: "$1",
});

export const Eyebrow = styled("span", {
  fontSize: "$xs",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "$textMuted",
});

export const MetricValue = styled("strong", {
  fontSize: "$xl",
  fontFamily: "$display",
});

export const Card = styled("article", {
  backgroundColor: "$surface",
  border: "1px solid $border",
  borderRadius: "$lg",
  boxShadow: "$soft",
  padding: "$5",
  display: "grid",
  gap: "$3",
});

export const Title = styled("h2", {
  fontSize: "$lg",
});

export const Progress = styled("div", {
  height: "12px",
  borderRadius: "$pill",
  backgroundColor: "$surfaceStrong",
  overflow: "hidden",
});

export const ProgressFill = styled("div", {
  height: "100%",
  backgroundColor: "$brand",
});

export const ItemList = styled("ul", {
  display: "grid",
  gap: "$3",
});

export const Item = styled("li", {
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$canvasAlt",
  padding: "$3",
  display: "grid",
  gap: "$2",
});

export const ItemMeta = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
  color: "$textMuted",
  fontSize: "$sm",
});

export const InlineLink = styled("a", {
  color: "$brandStrong",
  fontWeight: "$semibold",
  textDecoration: "none",
});
