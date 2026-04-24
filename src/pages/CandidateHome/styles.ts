import { styled } from "../../theme/stitches";

export const Page = styled("main", {
  minHeight: "100dvh",
  padding: "$5",
  display: "grid",
  gap: "$5",
  '@md': {
    padding: "$8",
  },
});

export const Header = styled("header", {
  display: "grid",
  gap: "$3",
  backgroundColor: "$surface",
  borderRadius: "$lg",
  border: "1px solid $border",
  padding: "$5",
  boxShadow: "$soft",
  '@md': {
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
  },
});

export const HeaderInfo = styled("div", {
  display: "grid",
  gap: "$2",
});

export const HeaderTitle = styled("h1", {
  fontSize: "$xl",
});

export const HeaderSubtitle = styled("p", {
  color: "$textMuted",
  fontSize: "$sm",
});

export const ExitButton = styled("button", {
  border: "1px solid $border",
  backgroundColor: "$surface",
  color: "$text",
  borderRadius: "$pill",
  fontWeight: "$semibold",
  padding: "$3 $5",
});

export const ContentGrid = styled("section", {
  display: "grid",
  gap: "$5",
  '@lg': {
    gridTemplateColumns: "1.25fr 1fr",
    alignItems: "start",
  },
});

export const Card = styled("article", {
  backgroundColor: "$surface",
  border: "1px solid $border",
  borderRadius: "$lg",
  boxShadow: "$soft",
  padding: "$5",
  display: "grid",
  gap: "$4",
});

export const CardTitle = styled("h2", {
  fontSize: "$lg",
});

export const Form = styled("form", {
  display: "grid",
  gap: "$4",
});

export const FormGrid = styled("div", {
  display: "grid",
  gap: "$3",
  '@md': {
    gridTemplateColumns: "1fr 1fr",
  },
});

export const Field = styled("label", {
  display: "grid",
  gap: "$2",
  fontSize: "$sm",
  color: "$textMuted",
});

const inputBase = {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$3 $4",
  color: "$text",
  backgroundColor: "$surface",
  outline: "none",
  '&:focus': {
    borderColor: "$brand",
  },
};

export const Input = styled("input", inputBase);
export const Select = styled("select", inputBase);

export const TextArea = styled("textarea", {
  ...inputBase,
  minHeight: "110px",
  resize: "vertical",
});

export const Actions = styled("div", {
  display: "flex",
  gap: "$3",
  flexWrap: "wrap",
});

export const PrimaryButton = styled("button", {
  border: "none",
  borderRadius: "$pill",
  padding: "$3 $5",
  fontWeight: "$bold",
  backgroundColor: "$brand",
  color: "$surface",
});

export const SecondaryButton = styled("button", {
  border: "1px solid $border",
  borderRadius: "$pill",
  padding: "$3 $5",
  fontWeight: "$semibold",
  backgroundColor: "$surface",
  color: "$text",
});

export const ApplicationsList = styled("ul", {
  display: "grid",
  gap: "$3",
});

export const ApplicationItem = styled("li", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$4",
  backgroundColor: "$canvasAlt",
  display: "grid",
  gap: "$2",
});

export const Muted = styled("p", {
  color: "$textMuted",
  fontSize: "$sm",
});
