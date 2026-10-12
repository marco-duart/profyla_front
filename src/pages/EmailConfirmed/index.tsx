import { type FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/logo-512.png";
import { resendConfirmation } from "../../services/auth";
import { getApiErrorMessage } from "../../utils/api-error";
import { FieldGroup, Form, Input, Logo, Notice, Page, Panel, SubmitButton, SwitchRow } from "../Login/styles";

export function EmailConfirmedPage() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("account_confirmation_success") === "true";
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  async function handleResend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    try {
      await resendConfirmation(email.trim().toLowerCase());
      toast.success("Se o e-mail estiver cadastrado, enviamos um novo link de confirmação.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível reenviar o e-mail agora."));
    } finally {
      setSending(false);
    }
  }

  return (
    <Page>
      <Panel>
        <Logo src={logo} alt="TalentFlow" />
        {success ? (
          <>
            <Notice>
              <strong>E-mail confirmado!</strong> Sua conta está ativa. Agora você já pode entrar no TalentFlow.
            </Notice>
            <Link to="/login"><SubmitButton as="span" style={{ display: "block", textAlign: "center" }}>Entrar</SubmitButton></Link>
          </>
        ) : (
          <>
            <Notice>
              <strong>Link inválido ou expirado.</strong> Informe seu e-mail para receber um novo link de confirmação.
            </Notice>
            <Form onSubmit={handleResend}>
              <FieldGroup>
                E-mail
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
              </FieldGroup>
              <SubmitButton type="submit" disabled={sending}>{sending ? "Enviando..." : "Reenviar confirmação"}</SubmitButton>
            </Form>
            <SwitchRow><Link to="/login">Voltar ao login</Link></SwitchRow>
          </>
        )}
      </Panel>
    </Page>
  );
}
