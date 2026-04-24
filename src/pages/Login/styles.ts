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

export const Title = styled("h1", {
  marginBottom: "$2",
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
  color: "$surface",
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
