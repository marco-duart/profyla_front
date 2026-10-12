import { styled } from "../../theme/stitches";

export const Page = styled("main", {
  minHeight: "100dvh",
  display: "grid",
  placeItems: "center",
  padding: "$6",
});

export const Panel = styled("section", {
  width: "100%",
  maxWidth: "460px",
  backgroundColor: "$surface",
  border: "1px solid $border",
  borderRadius: "$lg",
  boxShadow: "$medium",
  padding: "$8",
});

export const Logo = styled("img", {
  display: "block",
  width: "200px",
  height: "200px",
  margin: "0 auto $4",
});

export const Subtitle = styled("p", {
  fontSize: "$md",
  color: "$textMuted",
  marginBottom: "$6",
});

export const Form = styled("form", {
  display: "grid",
  gap: "$4",
});

export const FieldGroup = styled("label", {
  display: "grid",
  gap: "$2",
  fontWeight: "$medium",
  fontSize: "$sm",
});

export const Input = styled("input", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$4",
  backgroundColor: "$surface",
  color: "$text",
  outline: "none",
  transition: "border-color 140ms ease",
  "&:focus": {
    borderColor: "$brand",
  },
});

export const ErrorMessage = styled("p", {
  color: "$error",
  fontSize: "$sm",
});

export const SubmitButton = styled("button", {
  border: "none",
  borderRadius: "$pill",
  backgroundColor: "$brand",
  color: "$text",
  fontWeight: "$bold",
  padding: "$4 $6",
  fontSize: "$md",
  transition: "transform 140ms ease, background-color 140ms ease",
  "&:hover": {
    transform: "translateY(-1px)",
    backgroundColor: "$brandStrong",
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});

// --- Shared by the other public auth pages (register, forgot/reset password, confirmation) ---

export const Notice = styled("p", {
  color: "$textMuted",
  fontSize: "$md",
  marginBottom: "$4",
});

export const FieldHint = styled("span", {
  color: "$textMuted",
  fontSize: "$xs",
  fontWeight: "$regular",
});

export const FieldError = styled("span", {
  color: "$error",
  fontSize: "$xs",
});

export const CheckboxLabel = styled("label", {
  display: "flex",
  gap: "$3",
  alignItems: "flex-start",
  fontSize: "$sm",
  cursor: "pointer",
  '& input': { marginTop: "3px", accentColor: "$colors$brand" },
  '& a': { color: "$brand", fontWeight: "$semibold" },
});

export const StrengthTrack = styled("span", {
  display: "block",
  height: "4px",
  backgroundColor: "$canvasAlt",
});

export const StrengthFill = styled("span", {
  display: "block",
  height: "100%",
  transition: "width 160ms ease",
  variants: {
    score: {
      0: { width: "0%" },
      1: { width: "33%", backgroundColor: "$error" },
      2: { width: "66%", backgroundColor: "$warning" },
      3: { width: "100%", backgroundColor: "$success" },
    },
  },
});

export const SwitchRow = styled("p", {
  marginTop: "$4",
  fontSize: "$sm",
  color: "$textMuted",
  display: "flex",
  gap: "$3",
  flexWrap: "wrap",
  '& a': { color: "$brand", fontWeight: "$semibold" },
});
