import { styled } from "../../theme/stitches";

const GLASS_BLUR = "blur(20px) saturate(140%)";

export const PrestigePanel = styled("section", {
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  boxShadow: "$medium",
  padding: "$5",
  display: "grid",
  gap: "$3",
});

export const PrestigeTitle = styled("h3", {
  fontSize: "$xl",
  fontFamily: "$display",
  fontWeight: "$bold",
  letterSpacing: "0.01em",
});

export const PrestigeLead = styled("p", {
  color: "$textMuted",
  maxWidth: "86ch",
});

export const Filters = styled("div", {
  display: "grid",
  gap: "$3",
  gridTemplateColumns: "1fr",
  '@md': {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
});

export const BoardViewport = styled("div", {
  width: "100%",
  overflowX: "auto",
  overflowY: "hidden",
  paddingBottom: "$2",
  '&::-webkit-scrollbar': {
    height: "10px",
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: "$canvasAlt",
    borderRadius: "$sm",
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: "$brand",
    borderRadius: "$sm",
    border: "2px solid $canvasAlt",
  },
});

export const KanbanBoard = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "minmax(320px, 360px)",
  alignItems: "start",
  gap: "$4",
  minWidth: "max-content",
});

export const Column = styled("section", {
  border: "1px solid $border",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  borderRadius: "$lg",
  padding: "$4",
  minHeight: "520px",
  display: "grid",
  gap: "$3",
  boxShadow: "$soft",
  position: "relative",
  transition: "border-color 160ms ease, box-shadow 160ms ease",
  variants: {
    isActiveColumn: {
      true: {
        borderColor: "$brand",
        boxShadow: "$glowBrand",
      },
    },
  },
});

export const ColumnDropZone = styled("div", {
  display: "grid",
  gap: "$3",
  alignContent: "start",
  minHeight: "420px",
  borderRadius: "$md",
  padding: "$1",
  border: "1px dashed transparent",
  transition: "background-color 140ms ease, border-color 140ms ease",
  variants: {
    isOver: {
      true: {
        backgroundColor: "$brandSoft",
        borderColor: "$brand",
      },
    },
  },
});

export const ColumnHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$2",
  borderBottom: "1px solid $border",
  paddingBottom: "$3",
});

export const ColumnTitle = styled("h3", {
  fontSize: "$md",
  fontFamily: "$display",
  fontWeight: "$semibold",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const Badge = styled("span", {
  borderRadius: "$sm",
  border: "1px solid $brand",
  backgroundColor: "$brandSoft",
  color: "$text",
  padding: "$1 $4",
  fontFamily: "$mono",
  fontSize: "$xs",
  fontWeight: "$semibold",
});

export const Card = styled("article", {
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$canvasAlt",
  padding: "$4",
  display: "grid",
  gap: "$2",
  boxShadow: "$soft",
  transition: "transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease",
  '&:hover': {
    transform: "translateY(-2px)",
    borderColor: "$borderStrong",
  },
  variants: {
    dragging: {
      true: {
        opacity: 0.35,
      },
    },
    overlay: {
      true: {
        opacity: 1,
        borderColor: "$brand",
        boxShadow: "$glowBrand",
      },
    },
  },
});

export const DropPreviewCard = styled("div", {
  minHeight: "108px",
  borderRadius: "$md",
  border: "2px dashed $brand",
  backgroundColor: "$brandSoft",
  display: "grid",
  placeItems: "center",
  color: "$text",
  fontSize: "$sm",
  fontWeight: "$semibold",
  textAlign: "center",
  padding: "$3",
});

export const CardTitle = styled("strong", {
  fontSize: "$md",
  color: "$text",
});

export const CardMeta = styled("p", {
  color: "$textMuted",
  fontSize: "$xs",
});

export const ColumnFoot = styled("div", {
  marginTop: "auto",
  borderTop: "1px solid $border",
  paddingTop: "$3",
  color: "$textMuted",
  fontSize: "$xs",
  fontWeight: "$medium",
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
  maxWidth: "680px",
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

export const DragHint = styled("p", {
  color: "$textMuted",
  fontSize: "$sm",
});
