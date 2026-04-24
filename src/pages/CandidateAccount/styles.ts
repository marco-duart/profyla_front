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
  gap: "$2",
});

export const Lead = styled("p", {
  color: "$textMuted",
  maxWidth: "56ch",
});

export const Card = styled("article", {
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$surface",
  padding: "$5",
  display: "grid",
  gap: "$3",
});

export const Field = styled("label", {
  display: "grid",
  gap: "$1",
});

export const Input = styled("input", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$2 $3",
});

export const Button = styled("button", {
  border: "1px solid $brand",
  borderRadius: "$pill",
  backgroundColor: "$brand",
  color: "$surface",
  padding: "$2 $4",
  width: "fit-content",
});
