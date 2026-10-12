import { type FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/logo-512.png";
import { resetPassword } from "../../services/auth";
import { getApiErrorMessage } from "../../utils/api-error";
import { MIN_PASSWORD_LENGTH, passwordStrength } from "../../utils/password";
import {
  ErrorMessage,
  FieldGroup,
  FieldHint,
  Form,
  Input,
  Logo,
  Notice,
  Page,
  Panel,
  StrengthFill,
  StrengthTrack,
  SubmitButton,
  Subtitle,
  SwitchRow,
} from "../Login/styles";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("reset_password_token");

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const strength = passwordStrength(password);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`A senha precisa ter ao menos ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }
    if (password !== confirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword({ reset_password_token: token ?? "", password, password_confirmation: confirmation });
      toast.success("Senha alterada. Entre com a nova senha.");
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Link inválido ou expirado. Solicite um novo."));
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <Page>
        <Panel>
          <Logo src={logo} alt="TalentFlow" />
          <Notice><strong>Link inválido.</strong> Solicite um novo link de redefinição de senha.</Notice>
          <SwitchRow><Link to="/esqueci-senha">Esqueci minha senha</Link></SwitchRow>
        </Panel>
      </Page>
    );
  }

  return (
    <Page>
      <Panel>
        <Logo src={logo} alt="TalentFlow" />
        <Subtitle>Crie uma nova senha para a sua conta.</Subtitle>
        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            Nova senha
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
            <StrengthTrack><StrengthFill score={strength.score} /></StrengthTrack>
            <FieldHint>
              {strength.label ? `Força: ${strength.label}. ` : ""}Mínimo de {MIN_PASSWORD_LENGTH} caracteres.
            </FieldHint>
          </FieldGroup>
          <FieldGroup>
            Confirmar nova senha
            <Input type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} autoComplete="new-password" required />
          </FieldGroup>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          <SubmitButton type="submit" disabled={submitting}>{submitting ? "Salvando..." : "Salvar nova senha"}</SubmitButton>
        </Form>
        <SwitchRow><Link to="/login">Voltar ao login</Link></SwitchRow>
      </Panel>
    </Page>
  );
}
