import { styled } from "../../theme/stitches";

export const Wrapper = styled("section", {
  display: "grid",
  gap: "$6",
  maxWidth: "760px",
});

export const Hero = styled("article", {
  border: "1px solid $border",
  borderRadius: "$lg",
  background: "linear-gradient(135deg, $surface 0%, $canvasAlt 100%)",
  padding: "$5",
  display: "grid",
  gap: "$2",
});

export const Lead = styled("p", {
  color: "$textMuted",
  maxWidth: "64ch",
});

// ── Seção genérica
export const Section = styled("div", {
  display: "grid",
  gap: "$3",
});

export const SectionHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$3",
});

export const SectionTitle = styled("h3", {
  fontSize: "$md",
  fontWeight: "$semibold",
});

export const SectionHint = styled("p", {
  fontSize: "$sm",
  color: "$textMuted",
});

export const AddButton = styled("button", {
  display: "flex",
  alignItems: "center",
  gap: "$1",
  border: "1px solid $brand",
  borderRadius: "$pill",
  backgroundColor: "$brandSoft",
  color: "$brandStrong",
  fontWeight: "$semibold",
  fontSize: "$sm",
  padding: "$2 $3",
  flexShrink: 0,
  cursor: "pointer",
});

// ── Lista de itens existentes
export const ItemList = styled("ul", {
  display: "grid",
  gap: "$2",
});

export const ItemCard = styled("li", {
  border: "1px solid $border",
  borderRadius: "$md",
  backgroundColor: "$surface",
  padding: "$3 $4",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "$3",
});

export const ItemContent = styled("div", {
  display: "grid",
  gap: "$1",
  flex: 1,
});

export const ItemTitle = styled("strong", {
  fontSize: "$sm",
});

export const ItemMeta = styled("span", {
  fontSize: "$xs",
  color: "$textMuted",
});

export const RemoveButton = styled("button", {
  border: "none",
  backgroundColor: "transparent",
  color: "$error",
  fontSize: "$xs",
  cursor: "pointer",
  padding: "$1 $2",
  borderRadius: "$sm",
  '&:hover': {
    backgroundColor: "$errorSubtle",
  },
});

// ── Form inline expansível
export const InlineForm = styled("div", {
  border: "1px dashed $border",
  borderRadius: "$lg",
  backgroundColor: "$canvasAlt",
  padding: "$4",
  display: "grid",
  gap: "$3",
});

export const FormGrid = styled("div", {
  display: "grid",
  gap: "$3",
  '@md': {
    gridTemplateColumns: "1fr 1fr",
  },
});

export const Field = styled("label", {
  display: "grid",
  gap: "$1",
  fontSize: "$sm",
  fontWeight: "$semibold",
});

export const Input = styled("input", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$2 $3",
  fontSize: "$sm",
  backgroundColor: "$surface",
  '&:focus': {
    outline: "2px solid $brand",
    outlineOffset: "1px",
  },
});

export const Textarea = styled("textarea", {
  border: "1px solid $border",
  borderRadius: "$md",
  padding: "$2 $3",
  fontSize: "$sm",
  backgroundColor: "$surface",
  minHeight: "80px",
  resize: "vertical",
  '&:focus': {
    outline: "2px solid $brand",
    outlineOffset: "1px",
  },
});

export const FormActions = styled("div", {
  display: "flex",
  gap: "$2",
  flexWrap: "wrap",
});

export const SaveButton = styled("button", {
  border: "1px solid $brand",
  borderRadius: "$pill",
  backgroundColor: "$brand",
  color: "$surface",
  fontWeight: "$semibold",
  fontSize: "$sm",
  padding: "$2 $4",
  cursor: "pointer",
});

export const CancelButton = styled("button", {
  border: "1px solid $border",
  borderRadius: "$pill",
  backgroundColor: "$surface",
  color: "$text",
  fontSize: "$sm",
  padding: "$2 $4",
  cursor: "pointer",
});

// ── Perfil
export const ProfileCard = styled("div", {
  border: "1px solid $border",
  borderRadius: "$lg",
  backgroundColor: "$surface",
  padding: "$4",
  display: "grid",
  gap: "$3",
});

export const EditButton = styled("button", {
  border: "1px solid $border",
  borderRadius: "$pill",
  backgroundColor: "$surface",
  color: "$text",
  fontSize: "$sm",
  padding: "$2 $3",
  cursor: "pointer",
  justifySelf: "start",
});

export const ProfileRow = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$5",
});

export const ProfileField = styled("div", {
  display: "grid",
  gap: "$1",
});

export const ProfileLabel = styled("span", {
  fontSize: "$xs",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "$textMuted",
});

export const ProfileValue = styled("span", {
  fontSize: "$sm",
});
