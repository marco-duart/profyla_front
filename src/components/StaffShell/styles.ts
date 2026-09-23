import { NavLink } from "react-router-dom";
import { styled } from "../../theme/stitches";

const GLASS_BLUR = "blur(20px) saturate(140%)";

export const Layout = styled("div", {
  minHeight: "100dvh",
  display: "grid",
  gridTemplateColumns: "1fr",
  '@md': {
    gridTemplateColumns: "272px 1fr",
  },
});

export const Sidebar = styled("aside", {
  backgroundColor: "$surface",
  backdropFilter: GLASS_BLUR,
  WebkitBackdropFilter: GLASS_BLUR,
  borderBottom: "1px solid $border",
  padding: "$5",
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  gap: "$4",
  '@md': {
    borderRight: "1px solid $border",
    borderBottom: "none",
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
