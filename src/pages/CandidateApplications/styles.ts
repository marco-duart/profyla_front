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
  borderRadius: "$pill",
  padding: "$3 $4",
  maxWidth: "420px",
});

export const List = styled("ul", {
  display: "grid",
  gap: "$3",
});

export const Item = styled("li", {
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$surface",
  padding: "$5",
  display: "grid",
  gap: "$3",
});

export const ItemTop = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "$3",
  flexWrap: "wrap",
  alignItems: "center",
});

export const Meta = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
  color: "$textMuted",
  fontSize: "$sm",
});

export const StatusPill = styled("span", {
  borderRadius: "$pill",
  padding: "$1 $3",
  fontSize: "$xs",
  fontWeight: "$semibold",
  border: "1px solid $border",
  backgroundColor: "$canvasAlt",
});

export const DetailLink = styled("a", {
  color: "$brandStrong",
  textDecoration: "none",
  fontWeight: "$semibold",
});
