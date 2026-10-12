import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-512.png";
import { LegalLinks } from "../../components/LegalLinks";
import { registerUser } from "../../services/auth";
import { getApiErrorMessage } from "../../utils/api-error";
import { isValidCpf, maskCpf, onlyDigits } from "../../utils/masks";
import { MIN_PASSWORD_LENGTH, passwordStrength } from "../../utils/password";
import {
  CheckboxLabel,
  ErrorMessage,
  FieldError,
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

type FieldErrors = Partial<Record<"name" | "cpf" | "email" | "password" | "confirmation" | "consent", string>>;

function validate(values: {
  name: string; cpf: string; email: string; password: string; confirmation: string; accepted: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 3) errors.name = "Informe seu nome completo.";
  if (!isValidCpf(values.cpf)) errors.cpf = "CPF inválido.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errors.email = "Informe um e-mail válido.";
  if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `A senha precisa ter ao menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  if (values.confirmation !== values.password) errors.confirmation = "As senhas não coincidem.";
  if (!values.accepted) errors.consent = "É necessário aceitar os Termos de Uso e a Política de Privacidade.";

  return errors;
}

export function RegisterPage() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const strength = passwordStrength(password);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    const found = validate({ name, cpf, email, password, confirmation, accepted });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await registerUser({
        name: name.trim(),
        cpf: onlyDigits(cpf),
        email: email.trim().toLowerCase(),
        password,
        password_confirmation: confirmation,
        accept_terms: true,
        accept_privacy: true,
        confirm_success_url: `${window.location.origin}/confirmado`,
      });
      setRegisteredEmail(email.trim().toLowerCase());
    } catch (error) {
      setServerError(getApiErrorMessage(error, "Não foi possível criar a conta. Tente novamente."));
    } finally {
      setSubmitting(false);
    }
  }

  if (registeredEmail) {
    return (
      <Page>
        <Panel>
          <Logo src={logo} alt="TalentFlow" />
          <Notice>
            <strong>Verifique seu e-mail.</strong> Enviamos um link de confirmação para{" "}
            <strong>{registeredEmail}</strong>. Acesse-o para ativar sua conta e depois entre no TalentFlow.
          </Notice>
          <Notice>Não encontrou? Veja a caixa de spam. O link expira em alguns dias.</Notice>
          <SwitchRow><Link to="/login">Ir para o login</Link></SwitchRow>
        </Panel>
      </Page>
    );
  }

  return (
    <Page>
      <Panel>
        <Logo src={logo} alt="TalentFlow" />
        <Subtitle>Crie sua conta para se candidatar às vagas.</Subtitle>

        <Form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            Nome completo
            <Input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            {errors.name ? <FieldError>{errors.name}</FieldError> : null}
          </FieldGroup>

          <FieldGroup>
            CPF
            <Input
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
              inputMode="numeric"
              autoComplete="off"
              placeholder="000.000.000-00"
              required
            />
            {errors.cpf ? <FieldError>{errors.cpf}</FieldError> : null}
          </FieldGroup>

          <FieldGroup>
            E-mail
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="você@exemplo.com"
              required
            />
            {errors.email ? <FieldError>{errors.email}</FieldError> : null}
          </FieldGroup>

          <FieldGroup>
            Senha
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <StrengthTrack><StrengthFill score={strength.score} /></StrengthTrack>
            <FieldHint>
              {strength.label ? `Força: ${strength.label}. ` : ""}Mínimo de {MIN_PASSWORD_LENGTH} caracteres; misture letras, números e símbolos.
            </FieldHint>
            {errors.password ? <FieldError>{errors.password}</FieldError> : null}
          </FieldGroup>

          <FieldGroup>
            Confirmar senha
            <Input
              type="password"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              autoComplete="new-password"
              required
            />
            {errors.confirmation ? <FieldError>{errors.confirmation}</FieldError> : null}
          </FieldGroup>

          <CheckboxLabel>
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <span>
              Li e aceito os <a href="/termos" target="_blank" rel="noreferrer">Termos de Uso</a> e a{" "}
              <a href="/privacidade" target="_blank" rel="noreferrer">Política de Privacidade</a>.
            </span>
          </CheckboxLabel>
          {errors.consent ? <FieldError>{errors.consent}</FieldError> : null}

          {serverError ? <ErrorMessage>{serverError}</ErrorMessage> : null}

          <SubmitButton disabled={submitting} type="submit">
            {submitting ? "Criando conta..." : "Criar conta"}
          </SubmitButton>
        </Form>

        <SwitchRow>
          Já tem conta? <Link to="/login">Entrar</Link>
        </SwitchRow>
        <LegalLinks />
      </Panel>
    </Page>
  );
}
