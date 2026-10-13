import { type PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icon-192.png";
import { useAuth } from "../../hooks/useAuth";
import { styled } from "../../theme/stitches";
import { LegalLinks } from "../LegalLinks";

const Shell = styled("div", { minHeight: "100dvh", display: "grid", gridTemplateRows: "auto 1fr auto" });
const Bar = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$3",
  padding: "$3 $5",
  borderBottom: "1px solid $border",
  backgroundColor: "$surface",
});
const Brand = styled(Link, { display: "flex", alignItems: "center", gap: "$2", color: "$text", textDecoration: "none", fontFamily: "$display", fontWeight: "$bold" });
const Main = styled("main", { width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "$5" });
const Foot = styled("footer", { padding: "$5", textAlign: "center" });
const Actions = styled("nav", { display: "flex", gap: "$2" });
const NavLink = styled(Link, {
  padding: "$2 $4",
  border: "1px solid $border",
  borderRadius: "$md",
  color: "$text",
  textDecoration: "none",
  fontWeight: "$bold",
  fontSize: "$sm",
  variants: { brand: { true: { backgroundColor: "$brand", borderColor: "$brandStrong" } } },
});

// Frame of the public (logged-out) pages: careers list, job and company pages.
export function PublicLayout({ children }: PropsWithChildren) {
  const { user } = useAuth();

  return (
    <Shell>
      <Bar>
        <Brand to="/vagas">
          <img src={logo} alt="" width={32} height={32} /> Profyla Vagas
        </Brand>
        <Actions aria-label="Conta">
          {user ? (
            <NavLink to={user.role === "user" ? "/candidate/home" : "/staff/home"} brand>Minha área</NavLink>
          ) : (
            <>
              <NavLink to="/login">Entrar</NavLink>
              <NavLink to="/cadastro" brand>Criar conta</NavLink>
            </>
          )}
        </Actions>
      </Bar>
      <Main>{children}</Main>
      <Foot><LegalLinks /></Foot>
    </Shell>
  );
}
