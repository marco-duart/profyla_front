import { NavLink } from "react-router-dom";
import { styled } from "../../theme/stitches";

const GLASS_BLUR = "blur(20px) saturate(140%)";

export const Layout = styled("div", {
  "@media print": { display: "block" },
  minHeight: "100dvh",
  display: "grid",
  gridTemplateColumns: "1fr",
  '@md': {
    gridTemplateColumns: "272px 1fr",
  },
});

// Below @md the sidebar is an off-canvas drawer (data-open); from @md on it is the fixed column.
export const Sidebar = styled("aside", {
  backgroundColor: "$canvasAlt",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  borderRight: "1px solid $border",
  padding: "$5",
  display: "grid",
  gridTemplateRows: "auto auto 1fr auto",
  alignContent: "start",
  gap: "$4",
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  width: "min(86vw, 300px)",
  overflowY: "auto",
  zIndex: 50,
  transform: "translateX(-102%)",
  visibility: "hidden",
  transition: "transform 200ms ease, visibility 0s linear 200ms",
  '&[data-open=true]': {
    transform: "translateX(0)",
    visibility: "visible",
    transition: "transform 200ms ease, visibility 0s",
  },
  '@md': {
    gridTemplateRows: "auto 1fr auto",
    position: "sticky",
    width: "auto",
    height: "100dvh",
    transform: "none",
    visibility: "visible",
    backgroundColor: "$surface",
    zIndex: "auto",
  },
});

export const Backdrop = styled("div", {
  position: "fixed",
  inset: 0,
  zIndex: 40,
  backgroundColor: "rgba(3, 4, 8, 0.6)",
  '@md': {
    display: "none",
  },
});

export const TopBar = styled("header", {
  "@media print": { display: "none" },
  position: "sticky",
  top: 0,
  zIndex: 30,
  display: "flex",
  alignItems: "center",
  gap: "$3",
  padding: "$3 $4",
  paddingTop: "calc(12px + env(safe-area-inset-top, 0px))",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  borderBottom: "1px solid $border",
  '@md': {
    display: "none",
  },
});

export const MenuButton = styled("button", {
  display: "grid",
  placeItems: "center",
  width: "40px",
  height: "40px",
  border: "1px solid $border",
  borderRadius: "$sm",
  backgroundColor: "$surface",
  color: "$text",
  '&:focus-visible': {
    outline: "2px solid $brand",
    outlineOffset: "2px",
  },
});

export const TopBarTitle = styled("span", {
  fontFamily: "$display",
  fontWeight: "$bold",
  fontSize: "$md",
});

export const DrawerClose = styled("button", {
  justifySelf: "end",
  display: "grid",
  placeItems: "center",
  width: "36px",
  height: "36px",
  border: "1px solid $border",
  borderRadius: "$sm",
  backgroundColor: "transparent",
  color: "$text",
  '@md': {
    display: "none",
  },
});

export const Brand = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});

export const BrandIcon = styled("img", {
  width: "36px",
  height: "36px",
  flexShrink: 0,
});

export const BrandText = styled("div", {
  display: "grid",
  gap: "$1",
});

export const BrandTitle = styled("h1", {
  fontFamily: "$display",
  fontWeight: "$bold",
  fontSize: "$lg",
  letterSpacing: "-0.01em",
});

export const BrandSubtitle = styled("p", {
  fontSize: "$sm",
  color: "$textMuted",
  fontFamily: "$mono",
});

export const Nav = styled("nav", {
  display: "grid",
  gap: "$2",
});

export const NavSectionLabel = styled("p", {
  fontSize: "$xs",
  fontWeight: "$bold",
  color: "$textFaint",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginTop: "$3",
  '&:first-child': {
    marginTop: 0,
  },
});

export const NavItem = styled(NavLink, {
  textDecoration: "none",
  color: "$text",
  borderRadius: "$sm",
  padding: "$3 $4",
  fontSize: "$sm",
  fontWeight: "$medium",
  border: "1px solid transparent",
  transition: "background-color 140ms ease, border-color 140ms ease, color 140ms ease",
  '&:hover': {
    backgroundColor: "$surfaceStrong",
  },
  '&[data-featured=true]': {
    background: "linear-gradient(135deg, $colors$brand 0%, $colors$brandStrong 100%)",
    color: "$colors$text",
    borderColor: "$brandStrong",
    boxShadow: "$glowBrand",
    fontWeight: "$bold",
    '&:hover': {
      filter: "brightness(1.06)",
    },
    '&.active': {
      color: "$colors$text",
      borderColor: "$accent",
      boxShadow: "$glowAccent",
    },
  },
  '&.active': {
    backgroundColor: "$brandSoft",
    borderColor: "$brand",
    color: "$text",
    fontWeight: "$bold",
  },
});

export const ActionButton = styled("button", {
  border: "1px solid $border",
  borderRadius: "$sm",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  color: "$text",
  padding: "$3 $4",
  fontWeight: "$bold",
  fontSize: "$sm",
  transition: "background-color 140ms ease, border-color 140ms ease",
  '&:hover': {
    borderColor: "$error",
    color: "$error",
    backgroundColor: "$errorSubtle",
  },
});

export const Content = styled("main", {
  padding: "$5",
  '@md': {
    padding: "$8",
  },
});
