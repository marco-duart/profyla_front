import { styled } from "../../theme/stitches";

export const Page = styled("section", {
  display: "grid",
  gap: "$5",
});

export const Hero = styled("header", {
  display: "grid",
  gap: "$2",
});

export const Lead = styled("p", {
  color: "$textMuted",
  maxWidth: "72ch",
});

export const Panel = styled("div", {
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$surface",
  boxShadow: "$soft",
  padding: "$5",
  display: "grid",
  gap: "$4",
});

export const PanelTitle = styled("h3", {
  fontSize: "$lg",
});

export const Grid = styled("div", {
  display: "grid",
  gap: "$3",
  gridTemplateColumns: "1fr",
  '@md': {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
});

export const Field = styled("label", {
  display: "grid",
  gap: "$2",
  color: "$textMuted",
  fontSize: "$sm",
});

export const Input = styled("input", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$3 $4",
  backgroundColor: "$canvas",
});

export const Select = styled("select", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$3 $4",
  backgroundColor: "$canvas",
});

export const Textarea = styled("textarea", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$3 $4",
  minHeight: "96px",
  resize: "vertical",
  backgroundColor: "$canvas",
});

export const Actions = styled("div", {
  display: "flex",
  gap: "$2",
  flexWrap: "wrap",
});

export const Button = styled("button", {
  border: "1px solid $border",
  borderRadius: "$pill",
  padding: "$2 $4",
  fontWeight: "$semibold",
  backgroundColor: "$canvas",
  color: "$text",
  '&:disabled': {
    opacity: 0.55,
    cursor: "not-allowed",
  },
  variants: {
    tone: {
      brand: {
        backgroundColor: "$brand",
        borderColor: "$brandStrong",
        color: "white",
      },
      danger: {
        backgroundColor: "$errorSubtle",
        borderColor: "$error",
        color: "$error",
      },
      ghost: {
        backgroundColor: "transparent",
      },
    },
  },
});

export const List = styled("ul", {
  display: "grid",
  gap: "$3",
});

export const Item = styled("li", {
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$canvasAlt",
  padding: "$4",
  display: "grid",
  gap: "$2",
});

export const ItemTop = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$3",
  flexWrap: "wrap",
});

export const Meta = styled("p", {
  color: "$textMuted",
  fontSize: "$sm",
});

export const Empty = styled("p", {
  color: "$textMuted",
  border: "1px dashed $border",
  borderRadius: "$md",
  padding: "$4",
});
