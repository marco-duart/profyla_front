import { NavLink } from "react-router-dom";
import { styled } from "../../theme/stitches";

const GLASS_BLUR = "blur(20px) saturate(140%)";
const BOTTOM_NAV_HEIGHT = "72px";

export const Layout = styled("div", {
  minHeight: "100dvh",
  display: "grid",
  gridTemplateColumns: "1fr",
  '@md': {
    gridTemplateColumns: "260px 1fr",
  },
});

export const Sidebar = styled("aside", {
  display: "none",
  '@md': {
    display: "grid",
    backgroundColor: "$surface",
    backdropFilter: GLASS_BLUR,
    WebkitBackdropFilter: GLASS_BLUR,
    borderRight: "1px solid $border",
    padding: "$5",
    gap: "$4",
    gridTemplateRows: "auto 1fr auto",
    alignItems: "start",
    height: "100dvh",
    position: "sticky",
    top: 0,
    overflowY: "auto",
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
});

export const Nav = styled("nav", {
  display: "grid",
  gap: "$2",
});

export const NavItem = styled(NavLink, {
  textDecoration: "none",
  color: "$text",
  borderRadius: "$sm",
  padding: "$3 $4",
  fontSize: "$sm",
  fontWeight: "$medium",
  border: "1px solid transparent",
  transition: "background-color 140ms ease, border-color 140ms ease",
  '&:hover': {
    backgroundColor: "$surfaceStrong",
  },
  '&.active': {
    backgroundColor: "$brandSoft",
    borderColor: "$brand",
    color: "$text",
    fontWeight: "$bold",
  },
});

export const BottomActions = styled("div", {
  marginTop: "$4",
  display: "grid",
  gap: "$2",
});

export const ActionButton = styled("button", {
  border: "1px solid $border",
  borderRadius: "$sm",
  backgroundColor: "$surface",
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
  padding: "$4",
  paddingBottom: `calc(${BOTTOM_NAV_HEIGHT} + 20px)`,
  '@md': {
    padding: "$8",
  },
});

export const TopBar = styled("header", {
  position: "sticky",
  top: 0,
  zIndex: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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

export const TopBarBrand = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
});

export const TopBarIcon = styled("img", {
  width: "24px",
  height: "24px",
});

export const TopBarTitle = styled("span", {
  fontFamily: "$display",
  fontWeight: "$bold",
  fontSize: "$md",
});

export const TopBarLogout = styled("button", {
  display: "grid",
  placeItems: "center",
  width: "36px",
  height: "36px",
  borderRadius: "$sm",
  border: "1px solid $border",
  backgroundColor: "$surface",
  color: "$textMuted",
  '&:hover': {
    color: "$error",
    borderColor: "$error",
  },
});

export const BottomNav = styled("nav", {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 30,
  display: "flex",
  height: BOTTOM_NAV_HEIGHT,
  paddingBottom: "env(safe-area-inset-bottom, 0px)",
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  borderTop: "1px solid $border",
  '@md': {
    display: "none",
  },
});

export const BottomNavItem = styled(NavLink, {
  flex: 1,
  display: "grid",
  placeItems: "center",
  gap: "2px",
  textDecoration: "none",
  color: "$textMuted",
  fontSize: "10px",
  fontWeight: "$semibold",
  '& svg': {
    width: "20px",
    height: "20px",
  },
  '&.active': {
    color: "$brand",
  },
});
