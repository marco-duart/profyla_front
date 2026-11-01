import { Link } from "react-router-dom";
import { styled } from "../../theme/stitches";

const Row = styled("p", {
  display: "flex",
  gap: "$3",
  flexWrap: "wrap",
  fontSize: "$xs",
  color: "$textMuted",
  '& a': { color: "$textMuted", textDecoration: "underline" },
  '& a:hover': { color: "$text" },
});

export function LegalLinks() {
  return (
    <Row>
      <Link to="/termos">Termos de Uso</Link>
      <Link to="/privacidade">Política de Privacidade</Link>
      <Link to="/exclusao-de-conta">Exclusão de conta</Link>
    </Row>
  );
}
