import { styled } from "../../theme/stitches";

const Frame = styled("span", {
  display: "inline-grid",
  placeItems: "center",
  flexShrink: 0,
  overflow: "hidden",
  border: "1px solid $border",
  borderRadius: "$sm",
  backgroundColor: "$brandSoft",
  color: "$text",
  fontFamily: "$display",
  fontWeight: "$bold",
  '& img': { width: "100%", height: "100%", objectFit: "cover", display: "block" },
});

function initials(name?: string): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "?";
}

// Square profile picture; falls back to the person's initials.
export function Avatar({ src, name, size = 40 }: { src?: string | null; name?: string; size?: number }) {
  return (
    <Frame style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }} aria-hidden={src ? undefined : true}>
      {src ? <img src={src} alt={name ? `Foto de ${name}` : "Foto de perfil"} /> : initials(name)}
    </Frame>
  );
}
