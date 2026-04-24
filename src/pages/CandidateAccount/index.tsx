import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAccount, updateAccount, updatePassword } from "../../services/account";
import { getApiErrorMessage } from "../../utils/api-error";
import { Button, Card, Field, Hero, Input, Lead, Wrapper } from "./styles";

export function CandidateAccountPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  useEffect(() => {
    async function load() {
      const account = await getAccount();
      setName(account.name);
      setEmail(account.email);
      setCpf(account.cpf);
    }

    void load();
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

  return (
    <Wrapper>
      <Hero>
        <h2>Conta</h2>
        <Lead>Atualize seus dados de acesso e mantenha suas informacoes pessoais consistentes durante o processo seletivo.</Lead>
      </Hero>

      <Card>
        <h2>Dados da conta</h2>
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
          <Button type="submit">Salvar dados</Button>
        </form>
      </Card>

      <Card>
        <h2>Seguranca</h2>
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
          <Button type="submit">Atualizar senha</Button>
        </form>
      </Card>
    </Wrapper>
  );
}
