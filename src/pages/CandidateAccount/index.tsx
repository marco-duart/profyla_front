import { PhotoUploader } from "../../components/PhotoUploader";
import { formatDate } from "../../utils/format";
import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  deleteAccount,
  exportAccountData,
  getAccount,
  getEmailPreferences,
  updateAccount,
  updateEmailPreferences,
  updatePassword,
} from "../../services/account";
import type { EmailPreferences } from "../../services/account/dto";
import { CONSENTS_CHANGED_EVENT, getConsents, revokeConsent } from "../../services/legal";
import type { Legal } from "../../services/legal/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { ConfirmDialog } from "../CandidateKit/ConfirmDialog";
import {
  Actions,
  Badge,
  Button,
  Empty,
  Field,
  FieldNote,
  Hero,
  Input,
  Item,
  ItemTop,
  Lead,
  List,
  Meta,
  Page,
  Panel,
  PanelTitle,
} from "../CandidateKit/styles";

const EMAIL_PREFERENCE_LABELS: Record<EmailPreferences.Category, { title: string; help: string }> = {
  opportunities: { title: "Novas oportunidades", help: "Aviso quando uma vaga for destacada pela equipe." },
  birthday: { title: "Aniversário", help: "Mensagem de parabéns no seu aniversário." },
  digest: { title: "Resumos e lembretes", help: "Lembretes sobre pendências e andamento das suas candidaturas." },
};

const DOCUMENT_NAMES: Record<Legal.Kind, string> = {
  terms: "Termos de Uso",
  privacy: "Política de Privacidade",
  assessment_notice: "Aviso dos testes comportamentais (DISC e Eneagrama)",
};


export function CandidateAccountPage() {
  const navigate = useNavigate();
  const { signOutSession } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [emailPrefs, setEmailPrefs] = useState<EmailPreferences.Preferences | null>(null);
  const [consents, setConsents] = useState<Legal.ConsentItem[]>([]);
  const [pendingRevoke, setPendingRevoke] = useState<Legal.Kind | null>(null);
  const [revoking, setRevoking] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      const account = await getAccount();
      setName(account.name);
      setEmail(account.email);
      setCpf(account.cpf);
      setPhotoUrl(account.photo_url ?? null);
      const result = await getConsents();
      setConsents(result.documents);
      setEmailPrefs((await getEmailPreferences()).preferences);
    }

    void load();

    // The ConsentGate can accept a document while this page is open: keep the list in sync.
    const refreshConsents = () => getConsents().then((result) => setConsents(result.documents)).catch(() => undefined);
    window.addEventListener(CONSENTS_CHANGED_EVENT, refreshConsents);
    return () => window.removeEventListener(CONSENTS_CHANGED_EVENT, refreshConsents);
  }, []);

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
    try {
      await updatePassword({ password, password_confirmation: passwordConfirmation });
      setPassword("");
      setPasswordConfirmation("");
      toast.success("Senha atualizada.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao atualizar senha."));
    }
  }

  async function toggleEmailPreference(category: EmailPreferences.Category, enabled: boolean) {
    const previous = emailPrefs;
    setEmailPrefs((current) => (current ? { ...current, [category]: enabled } : current));
    try {
      setEmailPrefs((await updateEmailPreferences({ [category]: enabled })).preferences);
    } catch (error) {
      setEmailPrefs(previous);
      toast.error(getApiErrorMessage(error, "Não foi possível salvar a preferência."));
    }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const blob = await exportAccountData();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `talentflow-meus-dados-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Arquivo gerado.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível exportar seus dados."));
    } finally {
      setExporting(false);
    }
  }

  async function confirmRevoke() {
    if (!pendingRevoke) return;
    setRevoking(true);
    try {
      const result = await revokeConsent(pendingRevoke);
      setConsents(result.documents);
      setPendingRevoke(null);
      toast.success("Consentimento revogado.");
      // The gate re-checks and asks for a new acceptance (or sign out) before anything else.
      window.dispatchEvent(new Event(CONSENTS_CHANGED_EVENT));
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível revogar o consentimento."));
    } finally {
      setRevoking(false);
    }
  }

  async function confirmDelete() {
    setDeleting(true);
    try {
      await deleteAccount(deletePassword);
      await signOutSession();
      toast.success("Conta excluída. Seus dados pessoais foram anonimizados.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível excluir a conta."));
      setDeleting(false);
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Conta</h2>
        <Lead>Atualize seus dados de acesso e gerencie sua privacidade.</Lead>
      </Hero>

      <Panel>
        <PanelTitle>Foto de perfil</PanelTitle>
        <PhotoUploader name={name} currentUrl={photoUrl} />
      </Panel>

      <Panel>
        <PanelTitle>Dados da conta</PanelTitle>
        <form onSubmit={handleUpdateAccount}>
          <Field>
            Nome
            <Input value={name} onChange={(event) => setName(event.target.value)} />
          </Field>
          <Field>
            E-mail
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </Field>
          <Field>
            CPF
            <Input value={cpf} disabled />
          </Field>
          <Button type="submit" tone="brand">Salvar dados</Button>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Segurança</PanelTitle>
        <form onSubmit={handleUpdatePassword}>
          <Field>
            Nova senha
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </Field>
          <Field>
            Confirmar senha
            <Input
              type="password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
          </Field>
          <Button type="submit" tone="brand">Atualizar senha</Button>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Preferências de e-mail</PanelTitle>
        <FieldNote>E-mails importantes da conta (acesso, senha, andamento de processos) sempre são enviados.</FieldNote>
        {emailPrefs
          ? (Object.keys(EMAIL_PREFERENCE_LABELS) as EmailPreferences.Category[]).map((category) => (
              <label key={category} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={emailPrefs[category]}
                  onChange={(event) => void toggleEmailPreference(category, event.target.checked)}
                  style={{ marginTop: "4px" }}
                />
                <span>
                  <strong>{EMAIL_PREFERENCE_LABELS[category].title}</strong>
                  <br />
                  <FieldNote>{EMAIL_PREFERENCE_LABELS[category].help}</FieldNote>
                </span>
              </label>
            ))
          : null}
      </Panel>

      <Panel>
        <PanelTitle>Privacidade e dados</PanelTitle>
        <Lead>Você é dono dos seus dados: pode baixar uma cópia, revogar consentimentos ou excluir a conta.</Lead>

        <h3>Meus consentimentos</h3>
        {consents.length === 0 ? (
          <Empty>Nenhum documento legal publicado.</Empty>
        ) : (
          <List>
            {consents.map((consent) => (
              <Item key={consent.kind}>
                <ItemTop>
                  <strong>{DOCUMENT_NAMES[consent.kind]}</strong>
                  <Badge tone={consent.accepted ? "positive" : "negative"}>
                    {consent.accepted ? "Aceito" : "Pendente"}
                  </Badge>
                </ItemTop>
                <Meta>Versão {consent.version} · Aceite em {formatDate(consent.accepted_at)}</Meta>
                {consent.accepted ? (
                  <Actions>
                    <Button type="button" tone="danger" onClick={() => setPendingRevoke(consent.kind)}>
                      Revogar consentimento
                    </Button>
                  </Actions>
                ) : null}
              </Item>
            ))}
          </List>
        )}

        <h3>Baixar meus dados</h3>
        <FieldNote>Um arquivo JSON com tudo o que o TalentFlow guarda sobre você: perfil, currículo, candidaturas, testes e consentimentos.</FieldNote>
        <Actions>
          <Button type="button" onClick={() => void handleExport()} disabled={exporting}>
            {exporting ? "Gerando..." : "Baixar meus dados"}
          </Button>
        </Actions>

        <h3>Excluir minha conta</h3>
        <FieldNote>
          Seus dados pessoais são anonimizados e você deixa de conseguir entrar. Candidaturas anteriores permanecem
          apenas como estatística, sem identificar você. Essa ação não pode ser desfeita.
        </FieldNote>
        <Actions>
          <Button type="button" tone="danger" onClick={() => setDeleteOpen(true)}>Excluir minha conta</Button>
        </Actions>
      </Panel>

      <ConfirmDialog
        open={pendingRevoke !== null}
        title="Revogar consentimento"
        message="Sem esse consentimento você não poderá continuar usando o TalentFlow. Na próxima tela, você poderá aceitar novamente ou sair."
        confirmLabel="Revogar"
        confirming={revoking}
        onConfirm={() => void confirmRevoke()}
        onCancel={() => setPendingRevoke(null)}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Excluir minha conta"
        message="Seus dados pessoais serão anonimizados de forma permanente. Digite sua senha para confirmar."
        confirmLabel="Excluir definitivamente"
        confirming={deleting}
        confirmDisabled={deletePassword.length === 0}
        onConfirm={() => void confirmDelete()}
        onCancel={() => {
          setDeleteOpen(false);
          setDeletePassword("");
        }}
      >
        <Field>
          Senha
          <Input
            type="password"
            autoComplete="current-password"
            value={deletePassword}
            onChange={(event) => setDeletePassword(event.target.value)}
          />
        </Field>
      </ConfirmDialog>
    </Page>
  );
}
