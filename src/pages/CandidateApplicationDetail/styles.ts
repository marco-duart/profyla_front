import { styled } from "../../theme/stitches";

export const Wrapper = styled("section", {
  display: "grid",
  gap: "$4",
});

export const Hero = styled("article", {
  border: "1px solid $border",
  borderRadius: "$lg",
  background: "linear-gradient(135deg, $surface 0%, $canvasAlt 100%)",
  padding: "$5",
  display: "grid",
  gap: "$3",
});

export const HeroMeta = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
  color: "$textMuted",
});

export const StatusPill = styled("span", {
  width: "fit-content",
  borderRadius: "$pill",
  padding: "$1 $3",
  fontSize: "$xs",
  fontWeight: "$semibold",
  border: "1px solid $border",
  backgroundColor: "$surface",
});

export const InfoGrid = styled("div", {
  display: "grid",
  gap: "$4",
  '@lg': {
    gridTemplateColumns: "1fr 1fr",
  },
});

export const Card = styled("article", {
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$surface",
  padding: "$4",
  display: "grid",
  gap: "$3",
});

export const ActionRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
});

export const Button = styled("button", {
  border: "1px solid $border",
  borderRadius: "$pill",
  padding: "$2 $4",
  backgroundColor: "$surface",
});

export const DangerButton = styled("button", {
  border: "1px solid $error",
  borderRadius: "$pill",
  padding: "$2 $4",
  backgroundColor: "$errorSubtle",
  color: "$error",
});

export const TextArea = styled("textarea", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$3",
  minHeight: "90px",
});

export const ToolList = styled("ul", {
  display: "grid",
  gap: "$2",
});

export const ToolItem = styled("li", {
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$canvasAlt",
  padding: "$3",
});
