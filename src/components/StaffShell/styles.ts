import { NavLink } from "react-router-dom";
import { styled } from "../../theme/stitches";

export const Layout = styled("div", {
  minHeight: "100dvh",
  display: "grid",
  gridTemplateColumns: "1fr",
  '@md': {
    gridTemplateColumns: "260px 1fr",
  },
});

export const Sidebar = styled("aside", {
  backgroundColor: "$surface",
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
  display: "grid",
  gap: "$1",
});

export const BrandTitle = styled("h1", {
  fontSize: "$lg",
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
  borderRadius: "$md",
  padding: "$3 $4",
  border: "1px solid transparent",
  transition: "all 160ms ease",
  '&[data-featured=true]': {
    background: "linear-gradient(135deg, $colors$brand 0%, $colors$brandStrong 100%)",
    color: "white",
    borderColor: "$brandStrong",
    boxShadow: "0 10px 22px rgba(14, 132, 119, 0.35)",
    fontWeight: "$bold",
    '&:hover': {
      filter: "brightness(1.03)",
      transform: "translateY(-1px)",
    },
    '&.active': {
      color: "white",
      borderColor: "$warning",
      boxShadow: "0 0 0 2px $colors$warningSubtle, 0 12px 24px rgba(14, 132, 119, 0.45)",
      background: "linear-gradient(135deg, $colors$brandStrong 0%, $colors$brand 100%)",
    },
  },
  '&.active': {
    backgroundColor: "$brandSoft",
    borderColor: "$brand",
    color: "$brandStrong",
    fontWeight: "$semibold",
  },
});

export const ActionButton = styled("button", {
  border: "1px solid $border",
  borderRadius: "$pill",
  backgroundColor: "$surface",
  color: "$text",
  padding: "$3 $4",
  fontWeight: "$semibold",
});

export const Content = styled("main", {
  padding: "$5",
  '@md': {
    padding: "$8",
  },
});
