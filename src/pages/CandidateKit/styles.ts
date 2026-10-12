import { keyframes, styled } from "../../theme/stitches";

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
  minWidth: 0,
  maxWidth: "100%",
  border: "1px solid $border",
  borderRadius: "$sm",
  padding: "$3 $4",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  color: "$text",
  fontFamily: "$body",
  fontSize: "$md",
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
  textDecoration: "none", // also rendered as <a> (Button as={Link})
  display: "inline-block",
  textAlign: "center",
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$3 $5",
  fontWeight: "$bold",
  fontSize: "$sm",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  color: "$text",
  transition: "background-color 140ms ease, border-color 140ms ease",
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
      urgent: {
        backgroundColor: "$accent",
        borderColor: "$accent",
        color: "$canvas",
        '&:hover:not(:disabled)': {
          filter: "brightness(1.08)",
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

export const Overlay = styled("div", {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(3, 4, 8, 0.6)",
  display: "grid",
  placeItems: "center",
  zIndex: 40,
  padding: "$5",
});

export const Modal = styled("div", {
  width: "100%",
  maxWidth: "480px",
  borderRadius: "$lg",
  border: "1px solid $border",
  backgroundColor: "$canvasAlt",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  padding: "$5",
  display: "grid",
  gap: "$3",
  boxShadow: "$medium",
});

// --- Microform primitives (one question per screen — see Fase 2) ---

export const StepTrack = styled("div", {
  height: "4px",
  borderRadius: "$none",
  backgroundColor: "$surface",
  overflow: "hidden",
});

export const StepFill = styled("div", {
  height: "100%",
  backgroundColor: "$brand",
  transition: "width 200ms ease",
});

export const StepCount = styled("span", {
  display: "block",
  fontFamily: "$mono",
  fontSize: "$xs",
  color: "$textMuted",
  marginTop: "$2",
});

export const StepBody = styled("div", {
  display: "grid",
  alignContent: "start",
  gap: "$3",
  padding: "$6 0",
});

export const StepQuestion = styled("h2", {
  fontFamily: "$display",
  fontWeight: "$semibold",
  fontSize: "$xl",
  color: "$text",
  margin: 0,
});

export const StepHelp = styled("p", {
  margin: 0,
  color: "$textMuted",
  fontSize: "$md",
});

export const StepNav = styled("div", {
  display: "flex",
  gap: "$3",
  paddingTop: "$4",
  borderTop: "1px solid $border",
  '@md': {
    borderTop: "none",
    paddingTop: 0,
  },
});

export const WizardShell = styled("div", {
  display: "grid",
  gridTemplateRows: "auto 1fr",
  minHeight: "min(640px, 80dvh)",
});

export const Chip = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$2",
  border: "1px solid $border",
  borderRadius: "$sm",
  padding: "$2 $3",
  fontSize: "$sm",
  fontWeight: "$semibold",
  backgroundColor: "$surface",
  color: "$textMuted",
  transition: "background-color 140ms ease, border-color 140ms ease, color 140ms ease",
  variants: {
    selected: {
      true: {
        backgroundColor: "$brandSoft",
        borderColor: "$brand",
        color: "$text",
      },
    },
  },
});

export const ChipRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
});

export const Dropzone = styled("label", {
  display: "grid",
  placeItems: "center",
  gap: "$2",
  border: "1px dashed $border",
  borderRadius: "$sm",
  padding: "$8 $4",
  textAlign: "center",
  color: "$textMuted",
  fontSize: "$sm",
  cursor: "pointer",
  transition: "border-color 140ms ease, background-color 140ms ease",
  '&:hover': {
    borderColor: "$brand",
    backgroundColor: "$surfaceStrong",
  },
});

export const ReviewRow = styled("div", {
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

export const ReviewLabel = styled("span", {
  color: "$textMuted",
});

export const ReviewValue = styled("span", {
  color: "$text",
  fontWeight: "$semibold",
  textAlign: "right",
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
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
});

// --- Labeled score bars (assessment results) ---

export const ScoreRow = styled("div", {
  display: "grid",
  gap: "$1",
  marginBottom: "$3",
  '&:last-child': {
    marginBottom: 0,
  },
});

export const ScoreLabelRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "$sm",
  color: "$textMuted",
});

export const ScoreTrack = styled("div", {
  height: "8px",
  borderRadius: "$none",
  backgroundColor: "$canvasAlt",
  overflow: "hidden",
});

export const ScoreFill = styled("div", {
  height: "100%",
  backgroundColor: "$brand",
  transition: "width 200ms ease",
  variants: {
    tone: {
      brand: { backgroundColor: "$brand" },
      accent: { backgroundColor: "$accent" },
    },
  },
  defaultVariants: {
    tone: "brand",
  },
});

export const OptionButton = styled("button", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
  width: "100%",
  textAlign: "left",
  border: "1px solid $border",
  borderRadius: "$sm",
  padding: "$3 $4",
  backgroundColor: "$surface",
  color: "$text",
  fontFamily: "$body",
  fontSize: "$md",
  transition: "background-color 140ms ease, border-color 140ms ease",
  '&:hover': {
    borderColor: "$borderStrong",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "$brandSoft",
        borderColor: "$brand",
        color: "$text",
        fontWeight: "$semibold",
      },
    },
  },
});

// Small helper line under a field (purpose of a sensitive/optional question).
export const FieldNote = styled("span", {
  color: "$textMuted",
  fontSize: "$xs",
  fontWeight: "$regular",
  letterSpacing: 0,
  textTransform: "none",
  lineHeight: 1.5,
});

// Fluid card grid for directory-style listings (vagas, etc.).
export const CardGrid = styled("div", {
  display: "grid",
  gap: "$4",
  alignItems: "start",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
});

export const TagRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "$2",
});

// --- Loading skeletons (replace plain "Carregando..." text) ---

const shimmer = keyframes({
  "0%": { backgroundPosition: "200% 0" },
  "100%": { backgroundPosition: "-200% 0" },
});

export const Skeleton = styled("div", {
  height: "16px",
  borderRadius: "$sm",
  border: "1px solid $border",
  backgroundColor: "$surface",
  backgroundImage: "linear-gradient(90deg, transparent 0%, $colors$surfaceStrong 50%, transparent 100%)",
  backgroundSize: "200% 100%",
  animation: `${shimmer} 1.4s linear infinite`,
  '@media (prefers-reduced-motion: reduce)': { animation: "none" },
  variants: {
    size: {
      line: { height: "16px" },
      title: { height: "28px", width: "40%" },
      block: { height: "96px" },
    },
  },
});

// --- Vertical timeline (application history) ---

export const Timeline = styled("ol", {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gap: 0,
});

export const TimelineItem = styled("li", {
  position: "relative",
  display: "grid",
  gap: "$1",
  padding: "0 0 $5 $6",
  borderLeft: "1px solid $border",
  marginLeft: "6px",
  '&:last-child': {
    paddingBottom: 0,
    borderLeftColor: "transparent",
  },
  '&::before': {
    content: '""',
    position: "absolute",
    left: "-6px",
    top: "4px",
    width: "11px",
    height: "11px",
    backgroundColor: "$brand",
    border: "2px solid $canvas",
  },
  variants: {
    kind: {
      stage: { '&::before': { backgroundColor: "$brand" } },
      interview: { '&::before': { backgroundColor: "$accent" } },
      form: { '&::before': { backgroundColor: "$success" } },
      exam: { '&::before': { backgroundColor: "$success" } },
    },
  },
});
