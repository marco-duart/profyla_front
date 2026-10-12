import { PhotoUploader } from "../../components/PhotoUploader";
import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { getAccount, updateAccount, updatePassword } from "../../services/account";
import { getApiErrorMessage } from "../../utils/api-error";
import { Actions, Button, Field, Grid, Hero, Input, Lead, Meta, Page, Panel, PanelTitle } from "../StaffKit/styles";

export function StaffAccountPage() {
  const { user, signOutSession } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    async function load() {
      const account = await getAccount();
      setName(account.name);
      setEmail(account.email);
      setPhotoUrl(account.photo_url ?? null);
    }
    void load();
  }, []);

  async function handleSignOut() {
    await signOutSession();
    toast.success("Sessão encerrada.");
    navigate("/login", { replace: true });
  }

  async function handleUpdateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await updateAccount({ name, email });
      toast.success("Conta atualizada.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao atualizar conta."));
    }
  }

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password || password !== passwordConfirmation) {
      toast.error("As senhas precisam ser iguais.");
      return;
    }
    try {
      await updatePassword({ password, password_confirmation: passwordConfirmation });
      setPassword("");
      setPasswordConfirmation("");
      toast.success("Senha atualizada.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao atualizar senha."));
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Conta da equipe RH</h2>
        <Lead>Atualize seus dados de acesso e a senha da sua conta.</Lead>
      </Hero>

      <Panel>
        <PanelTitle>Foto de perfil</PanelTitle>
        <PhotoUploader name={name} currentUrl={photoUrl} />
      </Panel>

      <Panel>
        <PanelTitle>Dados de acesso</PanelTitle>
        <Meta>Papel: {user?.role}</Meta>
        <form onSubmit={handleUpdateAccount}>
          <Grid>
            <Field>
              Nome
              <Input value={name} onChange={(event) => setName(event.target.value)} />
            </Field>
            <Field>
              E-mail
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </Field>
          </Grid>
          <Actions>
            <Button type="submit" tone="brand">Salvar dados</Button>
          </Actions>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Segurança</PanelTitle>
        <form onSubmit={handleUpdatePassword}>
          <Grid>
            <Field>
              Nova senha
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </Field>
            <Field>
              Confirmar senha
              <Input type="password" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} />
            </Field>
          </Grid>
          <Actions>
            <Button type="submit" tone="brand">Atualizar senha</Button>
          </Actions>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Sessão</PanelTitle>
        <Actions>
          <Button tone="danger" type="button" onClick={() => void handleSignOut()}>
            Encerrar sessão
          </Button>
        </Actions>
      </Panel>
    </Page>
  );
}
