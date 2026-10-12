import { type FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../../assets/logo-512.png";
import { LegalLinks } from "../../components/LegalLinks";
import { useAuth } from "../../hooks/useAuth";
import { resendConfirmation } from "../../services/auth";
import { rememberRedirect, takeRedirect } from "../../utils/redirect";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  ErrorMessage,
  FieldGroup,
  Form,
  Input,
  Logo,
  Page,
  Panel,
  SubmitButton,
  Subtitle,
  SwitchRow,
} from "./styles";

export function LoginPage() {
  const navigate = useNavigate();
  const { signInWithEmail } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const noticeShown = useRef(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [resending, setResending] = useState(false);

  // Coming from a public vacancy page: remember where to return after login (or after sign up).
  useEffect(() => {
    rememberRedirect(searchParams.get("redirect"));
  }, [searchParams]);

  useEffect(() => {
    const notices: Record<string, () => void> = {
      expired: () => toast.error("Sua sessão expirou. Entre novamente."),
      unlocked: () => toast.success("Conta desbloqueada. Entre com a sua senha."),
      unlock_error: () => toast.error("Link de desbloqueio inválido ou expirado."),
    };
    const key = Object.keys(notices).find((name) => searchParams.has(name));

    if (!key || noticeShown.current) return;

    noticeShown.current = true;
    notices[key]();
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  async function handleResend() {
    setResending(true);
    try {
      await resendConfirmation(email.trim().toLowerCase());
      toast.success("Enviamos um novo link de confirmação para o seu e-mail.");
    } catch (resendError) {
      toast.error(getApiErrorMessage(resendError, "Não foi possível reenviar o e-mail agora."));
    } finally {
      setResending(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNeedsConfirmation(false);
    setIsSubmitting(true);

    try {
      const loggedUser = await signInWithEmail(email, password);
      toast.success("Sessão iniciada com sucesso.");

      if (loggedUser.role === "user") {
        navigate(takeRedirect(searchParams.get("redirect")) ?? "/candidate/home");
      } else {
        navigate("/staff/home");
      }
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Não foi possível autenticar. Verifique e-mail e senha."));
      setNeedsConfirmation(axios.isAxiosError(requestError) && requestError.response?.data?.error_code === "email_not_confirmed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Page>
      <Panel>
        <Logo src={logo} alt="TalentFlow" />
        <Subtitle>Entre com sua conta para acompanhar seu processo seletivo.</Subtitle>

        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            E-mail
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="você@empresa.com"
              required
            />
          </FieldGroup>

          <FieldGroup>
            Senha
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
            />
          </FieldGroup>

          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          {needsConfirmation ? (
            <SubmitButton type="button" disabled={resending} onClick={() => void handleResend()}>
              {resending ? "Enviando..." : "Reenviar e-mail de confirmação"}
            </SubmitButton>
          ) : null}

          <SubmitButton disabled={isSubmitting} type="submit">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </SubmitButton>
        </Form>

        <SwitchRow>
          <Link to="/esqueci-senha">Esqueci minha senha</Link>
        </SwitchRow>
        <SwitchRow>
          Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
        </SwitchRow>

        <LegalLinks />
      </Panel>
    </Page>
  );
}
