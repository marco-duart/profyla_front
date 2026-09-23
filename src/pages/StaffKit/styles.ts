import { styled } from "../../theme/stitches";

const GLASS_BLUR = "blur(20px) saturate(140%)";

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
  borderRadius: "$md",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  boxShadow: "$soft",
  padding: "$5",
  display: "grid",
  alignContent: "start",
  alignSelf: "start",
  gap: "$4",
});

export const PanelTitle = styled("h3", {
  fontFamily: "$display",
  fontWeight: "$semibold",
  fontSize: "$lg",
});

export const Grid = styled("div", {
  display: "grid",
  gap: "$3",
  alignItems: "start",
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
  fontWeight: "$semibold",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

const controlBase = {
  border: "1px solid $border",
  borderRadius: "$sm",
  padding: "$3 $4",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  color: "$text",
  fontFamily: "$body",
  transition: "border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease",
  '&::placeholder': {
    color: "$textFaint",
  },
  '&:focus-visible': {
    outline: "none",
    borderColor: "$brand",
    backgroundColor: "$surfaceStrong",
    boxShadow: "$glowBrand",
  },
};

export const Input = styled("input", controlBase);

export const Select = styled("select", controlBase);

export const Textarea = styled("textarea", {
  ...controlBase,
  minHeight: "96px",
  resize: "vertical",
});

export const Actions = styled("div", {
  display: "flex",
  gap: "$2",
  flexWrap: "wrap",
});

export const Button = styled("button", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$2 $5",
  fontWeight: "$bold",
  fontSize: "$sm",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  color: "$text",
  transition: "background-color 140ms ease, border-color 140ms ease, transform 140ms ease",
  '&:hover:not(:disabled)': {
    borderColor: "$borderStrong",
    backgroundColor: "$surfaceStrong",
  },
  '&:disabled': {
    opacity: 0.55,
    cursor: "not-allowed",
  },
  variants: {
    tone: {
      brand: {
        backgroundColor: "$brand",
        borderColor: "$brandStrong",
        color: "$text",
        boxShadow: "$glowBrand",
        '&:hover:not(:disabled)': {
          backgroundColor: "$brandStrong",
        },
      },
      danger: {
        backgroundColor: "$errorSubtle",
        borderColor: "$error",
        color: "$error",
      },
      ghost: {
        backgroundColor: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        border: "1px solid transparent",
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
  borderRadius: "$sm",
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
  borderRadius: "$sm",
  padding: "$4",
});

export const Badge = styled("span", {
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  fontFamily: "$mono",
  fontSize: "$xs",
  fontWeight: "$medium",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  padding: "$1 $3",
  borderRadius: "$sm",
  border: "1px solid transparent",
  variants: {
    tone: {
      positive: { backgroundColor: "$successSubtle", color: "$success", borderColor: "$success" },
      negative: { backgroundColor: "$errorSubtle", color: "$error", borderColor: "$error" },
      neutral: { backgroundColor: "$surface", color: "$textMuted", borderColor: "$border" },
      warning: { backgroundColor: "$warningSubtle", color: "$warningDark", borderColor: "$warningDark" },
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
});

export const InfoRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "$3",
  padding: "$2 0",
  borderBottom: "1px solid $border",
  fontSize: "$sm",
  '&:last-child': {
    borderBottom: "none",
  },
});

export const InfoLabel = styled("span", {
  color: "$textMuted",
});

export const InfoValue = styled("span", {
  color: "$text",
  fontWeight: "$semibold",
  textAlign: "right",
});

export const StatGrid = styled("div", {
  display: "grid",
  gap: "$3",
  gridTemplateColumns: "1fr",
  '@sm': {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  '@lg': {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
});

export const StatTile = styled("div", {
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  padding: "$4",
  display: "grid",
  gap: "$2",
  variants: {
    featured: {
      true: {
        borderColor: "$accent",
        boxShadow: "$glowAccent",
      },
    },
  },
});

export const StatLabel = styled("span", {
  fontFamily: "$body",
  fontSize: "$xs",
  fontWeight: "$bold",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "$textMuted",
});

export const StatValue = styled("span", {
  fontFamily: "$mono",
  fontSize: "$xxl",
  fontWeight: "$semibold",
  color: "$text",
  fontVariantNumeric: "tabular-nums",
});

export const StatTrend = styled("span", {
  fontFamily: "$body",
  fontSize: "$sm",
  fontWeight: "$semibold",
  variants: {
    tone: {
      positive: { color: "$success" },
      negative: { color: "$error" },
      neutral: { color: "$textMuted" },
      warning: { color: "$warningDark" },
    },
  },
});

export const FunnelRow = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  gap: "$3",
});

export const FunnelLabelRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "$sm",
  color: "$textMuted",
});

export const FunnelTrack = styled("div", {
  height: "8px",
  borderRadius: "$none",
  backgroundColor: "$canvasAlt",
  overflow: "hidden",
});

export const FunnelFill = styled("div", {
  height: "100%",
  backgroundColor: "$brand",
  transition: "width 200ms ease",
  variants: {
    tone: {
      positive: { backgroundColor: "$success" },
      negative: { backgroundColor: "$error" },
      neutral: { backgroundColor: "$brand" },
    },
  },
});
