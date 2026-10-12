import { styled } from "../../theme/stitches";

export const Screen = styled("main", {
  minHeight: "100dvh",
  display: "grid",
  placeItems: "center",
  padding: "$6",
});

export const Card = styled("section", {
  width: "100%",
  maxWidth: "480px",
  display: "grid",
  gap: "$4",
  padding: "$8",
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$surface",
  backdropFilter: "blur(20px) saturate(140%)",
  boxShadow: "$medium",
});

export const Title = styled("h1", {
  fontFamily: "$display",
  fontSize: "$xl",
});

export const Text = styled("p", {
  color: "$textMuted",
});

export const Actions = styled("div", {
  display: "flex",
  gap: "$2",
  flexWrap: "wrap",
});

export const ActionButton = styled("button", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$3 $5",
  fontWeight: "$bold",
  fontSize: "$sm",
  backgroundColor: "$surface",
  color: "$text",
  '&:hover': { borderColor: "$borderStrong", backgroundColor: "$surfaceStrong" },
  variants: {
    tone: {
      brand: {
        backgroundColor: "$brand",
        borderColor: "$brandStrong",
        boxShadow: "$glowBrand",
        '&:hover': { backgroundColor: "$brandStrong" },
      },
    },
  },
});
