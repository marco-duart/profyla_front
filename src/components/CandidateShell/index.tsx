import { NotificationBell } from "../NotificationBell";
import { Avatar } from "../Avatar";
import { useAccountPhoto } from "../../hooks/useAccountPhoto";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiClipboard,
  FiCompass,
  FiFileText,
  FiHome,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import icon from "../../assets/icon-192.png";
import { LegalLinks } from "../LegalLinks";
import { useAuth } from "../../hooks/useAuth";
import {
  ActionButton,
  BottomActions,
  BottomNav,
  BottomNavItem,
  Brand,
  BrandIcon,
  BrandSubtitle,
  BrandText,
  BrandTitle,
  Content,
  Layout,
  Nav,
  NavItem,
  Sidebar,
  TopBar,
  TopBarBrand,
  TopBarIcon,
  TopBarLogout,
  TopBarTitle,
} from "./styles";

export function CandidateShell() {
  const navigate = useNavigate();
  const { user, signOutSession } = useAuth();
  const photoUrl = useAccountPhoto();

  async function handleSignOut(): Promise<void> {
    await signOutSession();
    toast.success("Sessão encerrada.");
    navigate("/login", { replace: true });
  }

  return (
    <Layout>
      <TopBar>
        <TopBarBrand>
          <TopBarIcon src={icon} alt="" />
          <TopBarTitle>TalentFlow</TopBarTitle>
        </TopBarBrand>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <NotificationBell />
          <TopBarLogout type="button" onClick={handleSignOut} aria-label="Sair">
            <FiLogOut size={18} />
          </TopBarLogout>
        </div>
      </TopBar>

      <Sidebar>
        <Brand>
          {photoUrl ? <Avatar src={photoUrl} name={user?.name} size={36} /> : <BrandIcon src={icon} alt="" />}
          <BrandText>
            <BrandTitle>TalentFlow</BrandTitle>
            <BrandSubtitle>{user?.name}</BrandSubtitle>
          </BrandText>
          <span style={{ marginLeft: "auto" }}><NotificationBell side="left" /></span>
        </Brand>

        <Nav>
          <NavItem to="/candidate/home">Home</NavItem>
          <NavItem to="/candidate/opportunities">Oportunidades</NavItem>
          <NavItem to="/candidate/applications">Candidaturas</NavItem>
          <NavItem to="/candidate/curriculum">Currículo</NavItem>
          <NavItem to="/candidate/assessments">Avaliações comportamentais</NavItem>
          <NavItem to="/candidate/account">Conta</NavItem>
        </Nav>

        <BottomActions>
          <ActionButton type="button" onClick={handleSignOut}>
            Sair
          </ActionButton>
          <LegalLinks />
        </BottomActions>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>

      <BottomNav>
        <BottomNavItem to="/candidate/home" end>
          <FiHome />
          Home
        </BottomNavItem>
        <BottomNavItem to="/candidate/opportunities">
          <FiCompass />
          Vagas
        </BottomNavItem>
        <BottomNavItem to="/candidate/applications">
          <FiFileText />
          Candidaturas
        </BottomNavItem>
        <BottomNavItem to="/candidate/curriculum">
          <FiClipboard />
          Currículo
        </BottomNavItem>
        <BottomNavItem to="/candidate/account">
          <FiUser />
          Conta
        </BottomNavItem>
      </BottomNav>
    </Layout>
  );
}
