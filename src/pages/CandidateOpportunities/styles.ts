import { styled } from "../../theme/stitches";

export const Header = styled("header", {
  display: "grid",
  gap: "$3",
  marginBottom: "$4",
});

export const Lead = styled("p", {
  color: "$textMuted",
  maxWidth: "60ch",
});

export const SearchInput = styled("input", {
  border: "1px solid $border",
  borderRadius: "$sm",
  padding: "$3 $4",
  maxWidth: "420px",
  backgroundColor: "$surface",
  color: "$text",
  '&::placeholder': {
    color: "$textFaint",
  },
});

export const Grid = styled("section", {
  display: "grid",
  gap: "$3",
  '@lg': {
    gridTemplateColumns: "1fr 1fr",
  },
});

export const Card = styled("article", {
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$surface",
  padding: "$5",
  display: "grid",
  gap: "$3",
});

export const Meta = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
  color: "$textMuted",
  fontSize: "$sm",
});

export const Button = styled("button", {
  border: "1px solid $brand",
  borderRadius: "$pill",
  backgroundColor: "$brand",
  color: "$text",
  padding: "$2 $4",
  width: "fit-content",
});
