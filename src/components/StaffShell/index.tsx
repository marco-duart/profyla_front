import { NotificationBell } from "../NotificationBell";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import icon from "../../assets/icon-192.png";
import { LegalLinks } from "../LegalLinks";
import { Avatar } from "../Avatar";
import { useAccountPhoto } from "../../hooks/useAccountPhoto";
import { useAuth } from "../../hooks/useAuth";
import {
  ActionButton,
  Backdrop,
  Brand,
  BrandIcon,
  BrandSubtitle,
  BrandText,
  BrandTitle,
  Content,
  DrawerClose,
  Layout,
  MenuButton,
  Nav,
  NavItem,
  NavSectionLabel,
  Sidebar,
  TopBar,
  TopBarTitle,
} from "./styles";

export function StaffShell() {
  const navigate = useNavigate();
  const { user, signOutSession } = useAuth();
  const photoUrl = useAccountPhoto();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  // Move focus into the drawer when it opens and back to the menu button when it closes.
  useEffect(() => {
    if (drawerOpen) {
      drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }
  }, [drawerOpen]);

  function closeDrawer() {
    setDrawerOpen(false);
    menuButtonRef.current?.focus();
  }

  // Esc closes; Tab stays inside the open drawer.
  function handleDrawerKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!drawerOpen) return;
    if (event.key === "Escape") {
      event.stopPropagation();
      closeDrawer();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function handleSignOut(): Promise<void> {
    await signOutSession();
    toast.success("Sessão encerrada.");
    navigate("/login", { replace: true });
  }

  return (
    <Layout>
      <TopBar>
        <MenuButton
          ref={menuButtonRef}
          type="button"
          aria-label="Abrir menu"
          aria-expanded={drawerOpen}
          aria-controls="staff-drawer"
          onClick={() => setDrawerOpen(true)}
        >
          <FiMenu size={20} />
        </MenuButton>
        <TopBarTitle>Profyla</TopBarTitle>
        <span style={{ marginLeft: "auto" }}><NotificationBell /></span>
      </TopBar>
      {drawerOpen ? <Backdrop onClick={closeDrawer} aria-hidden="true" /> : null}

      <Sidebar id="staff-drawer" ref={drawerRef} data-open={drawerOpen} onKeyDown={handleDrawerKeyDown} aria-label="Menu principal">
        <DrawerClose type="button" aria-label="Fechar menu" onClick={closeDrawer}>
          <FiX size={18} />
        </DrawerClose>
        <Brand>
          {photoUrl ? <Avatar src={photoUrl} name={user?.name} size={36} /> : <BrandIcon src={icon} alt="" />}
          <BrandText>
            <BrandTitle>Profyla</BrandTitle>
            <BrandSubtitle>{user?.name} | equipe</BrandSubtitle>
          </BrandText>
          <span style={{ marginLeft: "auto" }}><NotificationBell side="left" /></span>
        </Brand>

        {/* Any click on a nav link closes the drawer (below @md). */}
        <Nav onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setDrawerOpen(false); }}>
          <NavSectionLabel>Visão geral</NavSectionLabel>
          <NavItem to="/staff/home">Painel da equipe</NavItem>
          <NavItem to="/staff/metrics">Métricas</NavItem>

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
          {user?.role === "ti" ? <NavItem to="/staff/audit">Auditoria</NavItem> : null}
          <NavItem to="/staff/account">Conta</NavItem>
        </Nav>

        <div style={{ display: "grid", gap: "12px" }}>
          <ActionButton type="button" onClick={handleSignOut}>
            Sair
          </ActionButton>
          <LegalLinks />
        </div>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
