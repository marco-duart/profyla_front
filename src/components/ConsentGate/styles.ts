import { styled } from "../../theme/stitches";

export const Overlay = styled("div", {
  position: "fixed",
  inset: 0,
  zIndex: 60,
  display: "grid",
  placeItems: "center",
  padding: "$5",
  backgroundColor: "rgba(3, 4, 8, 0.78)",
});

export const Modal = styled("div", {
  width: "100%",
  maxWidth: "520px",
  display: "grid",
  gap: "$3",
  padding: "$6",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$canvasAlt",
  boxShadow: "$medium",
  '& h2': { fontFamily: "$display", fontSize: "$xl" },
  '& p': { color: "$textMuted" },
  '& a': { color: "$brand", fontWeight: "$semibold" },
});

export const Checkbox = styled("label", {
  display: "flex",
  gap: "$3",
  alignItems: "flex-start",
  fontSize: "$sm",
  cursor: "pointer",
  '& input': { marginTop: "3px", accentColor: "$colors$brand" },
});

export const Actions = styled("div", {
  display: "flex",
  gap: "$2",
  flexWrap: "wrap",
});

export const Button = styled("button", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$3 $5",
  fontWeight: "$bold",
  fontSize: "$sm",
  backgroundColor: "$surface",
  color: "$text",
  '&:disabled': { opacity: 0.55, cursor: "not-allowed" },
  variants: {
    tone: {
      brand: { backgroundColor: "$brand", borderColor: "$brandStrong", boxShadow: "$glowBrand" },
      ghost: { backgroundColor: "transparent", borderColor: "transparent" },
    },
  },
});
