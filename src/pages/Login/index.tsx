import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/logo-512.png";
import { useAuth } from "../../hooks/useAuth";
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
} from "./styles";

export function LoginPage() {
  const navigate = useNavigate();
  const { signInWithEmail } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const loggedUser = await signInWithEmail(email, password);
      toast.success("Sessao iniciada com sucesso.");

      if (loggedUser.role === "user") {
        navigate("/candidate/home");
      } else {
        navigate("/staff/home");
      }
    } catch (requestError) {
      const fallbackMessage = "Nao foi possivel autenticar. Verifique email e senha.";
      if (requestError instanceof Error) {
        setError(requestError.message || fallbackMessage);
      } else {
        setError(fallbackMessage);
      }
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
              placeholder="voce@empresa.com"
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

          <SubmitButton disabled={isSubmitting} type="submit">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </SubmitButton>
        </Form>
      </Panel>
    </Page>
  );
}
