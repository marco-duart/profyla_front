import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import {
  ActionButton,
  Brand,
  BrandSubtitle,
  BrandTitle,
  Content,
  Layout,
  Nav,
  NavItem,
  Sidebar,
} from "./styles";

export function StaffShell() {
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
          <BrandSubtitle>{user?.name} | equipe</BrandSubtitle>
        </Brand>

        <Nav>
          <NavItem to="/staff/home">Painel da equipe</NavItem>
        </Nav>

        <ActionButton type="button" onClick={handleSignOut}>
          Sair
        </ActionButton>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
