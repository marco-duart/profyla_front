import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/logo-512.png";
import { unsubscribeFromEmails } from "../../services/account";
import type { EmailPreferences } from "../../services/account/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { Logo, Notice, Page, Panel, SubmitButton, SwitchRow } from "../Login/styles";

const CATEGORY_LABELS: Record<EmailPreferences.Category, string> = {
  opportunities: "e-mails de novas oportunidades",
  birthday: "e-mails de aniversário",
  digest: "e-mails de resumo",
};

function isCategory(value: string | null): value is EmailPreferences.Category {
  return value === "opportunities" || value === "birthday" || value === "digest";
}

// Reached from the footer link of non-transactional e-mails. Works without login.
// Asks for a click instead of unsubscribing on load, so link scanners cannot do it by accident.
export function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const category = searchParams.get("categoria");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleConfirm() {
    if (!token || !isCategory(category)) return;
    setSending(true);
    try {
      await unsubscribeFromEmails(token, category);
      setDone(true);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível concluir o descadastro."));
    } finally {
      setSending(false);
    }
  }

  return (
    <Page>
      <Panel>
        <Logo src={logo} alt="Profyla" />
        {!token || !isCategory(category) ? (
          <Notice>
            <strong>Link inválido.</strong> Use o link que veio no final do e-mail, ou ajuste suas preferências na área de conta.
          </Notice>
        ) : done ? (
          <Notice>
            <strong>Pronto!</strong> Você não receberá mais {CATEGORY_LABELS[category]}. Se mudar de ideia, reative em
            Conta &gt; Preferências de e-mail.
          </Notice>
        ) : (
          <>
            <Notice>
              Deseja deixar de receber <strong>{CATEGORY_LABELS[category]}</strong> do Profyla? E-mails importantes da sua
              conta (acesso, senha, andamento de processos) continuam sendo enviados.
            </Notice>
            <SubmitButton type="button" onClick={() => void handleConfirm()} disabled={sending}>
              {sending ? "Aguarde..." : "Confirmar descadastro"}
            </SubmitButton>
          </>
        )}
        <SwitchRow><Link to="/login">Ir para o login</Link></SwitchRow>
      </Panel>
    </Page>
  );
}
