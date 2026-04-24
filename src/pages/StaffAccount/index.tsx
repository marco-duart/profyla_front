import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { Actions, Button, Hero, Lead, Meta, Page, Panel, PanelTitle } from "../StaffKit/styles";

export function StaffAccountPage() {
  const { user, signOutSession } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOutSession();
    toast.success("Sessao encerrada.");
    navigate("/login", { replace: true });
  }

  return (
    <Page>
      <Hero>
        <h2>Conta da equipe RH</h2>
        <Lead>Dados da conta autenticada e acoes operacionais da sessao atual.</Lead>
      </Hero>

      <Panel>
        <PanelTitle>Dados de acesso</PanelTitle>
        <Meta>Nome: {user?.name}</Meta>
        <Meta>Email: {user?.email}</Meta>
        <Meta>Papel: {user?.role}</Meta>
        <Actions>
          <Button tone="danger" type="button" onClick={() => void handleSignOut()}>
            Encerrar sessao
          </Button>
        </Actions>
      </Panel>
    </Page>
  );
}
