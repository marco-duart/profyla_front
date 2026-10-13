import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-512.png";
import { requestPasswordReset } from "../../services/auth";
import { FieldGroup, Form, Input, Logo, Notice, Page, Panel, SubmitButton, Subtitle, SwitchRow } from "../Login/styles";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    try {
      await requestPasswordReset(email.trim().toLowerCase());
    } catch {
      // The API answers the same way for unknown e-mails; any other failure is shown the same
      // neutral way so the screen never reveals whether an account exists.
    } finally {
      setSending(false);
      setSent(true);
    }
  }

  return (
    <Page>
      <Panel>
        <Logo src={logo} alt="Profyla" />
        {sent ? (
          <>
            <Notice>
              <strong>Pronto.</strong> Se o e-mail informado estiver cadastrado, você receberá em instantes um link para
              redefinir a senha. O link vale por poucas horas.
            </Notice>
            <SwitchRow><Link to="/login">Voltar ao login</Link></SwitchRow>
          </>
        ) : (
          <>
            <Subtitle>Informe o e-mail da sua conta e enviaremos um link para criar uma nova senha.</Subtitle>
            <Form onSubmit={handleSubmit}>
              <FieldGroup>
                E-mail
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
              </FieldGroup>
              <SubmitButton type="submit" disabled={sending}>{sending ? "Enviando..." : "Enviar link"}</SubmitButton>
            </Form>
            <SwitchRow><Link to="/login">Voltar ao login</Link></SwitchRow>
          </>
        )}
      </Panel>
    </Page>
  );
}
