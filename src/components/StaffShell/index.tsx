import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import icon from "../../assets/icon-192.png";
import { useAuth } from "../../hooks/useAuth";
import {
  ActionButton,
  Brand,
  BrandIcon,
  BrandSubtitle,
  BrandText,
  BrandTitle,
  Content,
  Layout,
  Nav,
  NavItem,
  NavSectionLabel,
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
          <BrandIcon src={icon} alt="" />
          <BrandText>
            <BrandTitle>TalentFlow</BrandTitle>
            <BrandSubtitle>{user?.name} | equipe</BrandSubtitle>
          </BrandText>
        </Brand>

        <Nav>
          <NavSectionLabel>Visão geral</NavSectionLabel>
          <NavItem to="/staff/home">Painel da equipe</NavItem>

          <NavSectionLabel>Recrutamento</NavSectionLabel>
          <NavItem to="/staff/kanban" data-featured="true">Kanban do processo</NavItem>
          <NavItem to="/staff/candidates">Candidatos</NavItem>
          <NavItem to="/staff/hirings">Processos</NavItem>
          <NavItem to="/staff/interviews">Entrevistas</NavItem>

          <NavSectionLabel>Catálogo</NavSectionLabel>
          <NavItem to="/staff/companies">Empresas</NavItem>
          <NavItem to="/staff/jobs">Vagas</NavItem>

          <NavSectionLabel>Avaliações</NavSectionLabel>
          <NavItem to="/staff/exams">Testes dinâmicos</NavItem>
          <NavItem to="/staff/forms">Formulários dinâmicos</NavItem>

          <NavSectionLabel>Administração</NavSectionLabel>
          <NavItem to="/staff/users">Usuários</NavItem>
          <NavItem to="/staff/account">Conta</NavItem>
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
