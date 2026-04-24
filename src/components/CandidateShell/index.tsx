import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import {
  ActionButton,
  BottomActions,
  Brand,
  BrandSubtitle,
  BrandTitle,
  Content,
  Layout,
  Nav,
  NavItem,
  Sidebar,
} from "./styles";

export function CandidateShell() {
  const navigate = useNavigate();
  const { user, signOutSession } = useAuth();

  async function handleSignOut(): Promise<void> {
    await signOutSession();
    toast.success("Sessao encerrada.");
    navigate("/login", { replace: true });
  }

  return (
    <Layout>
      <Sidebar>
        <Brand>
          <BrandTitle>TalentFlow</BrandTitle>
          <BrandSubtitle>{user?.name}</BrandSubtitle>
        </Brand>

        <Nav>
          <NavItem to="/candidate/home">Home</NavItem>
          <NavItem to="/candidate/opportunities">Oportunidades</NavItem>
          <NavItem to="/candidate/applications">Candidaturas</NavItem>
          <NavItem to="/candidate/curriculum">Curriculo</NavItem>
          <NavItem to="/candidate/account">Conta</NavItem>
        </Nav>

        <BottomActions>
          <ActionButton type="button" onClick={handleSignOut}>
            Sair
          </ActionButton>
        </BottomActions>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
