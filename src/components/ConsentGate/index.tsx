import { useEffect, useState, type PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { acceptConsents, CONSENTS_CHANGED_EVENT, getConsents } from "../../services/legal";
import type { Legal } from "../../services/legal/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { Actions, Button, Checkbox, Modal, Overlay } from "./styles";

const LABELS: Record<Legal.Kind, { name: string; path: string }> = {
  terms: { name: "Termos de Uso", path: "/termos" },
  privacy: { name: "Política de Privacidade", path: "/privacidade" },
  assessment_notice: { name: "Aviso dos testes comportamentais", path: "/aviso-testes" },
};

// Blocks the app behind a modal while the logged-in user has not accepted the
// current version of every legal document (first access or a newly published version).
export function ConsentGate({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { signOutSession } = useAuth();
  const [pending, setPending] = useState<Legal.Kind[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const check = () => getConsents().then((consents) => setPending(consents.pending)).catch(() => undefined);
    void check();
    window.addEventListener(CONSENTS_CHANGED_EVENT, check);
    return () => window.removeEventListener(CONSENTS_CHANGED_EVENT, check);
  }, []);

  async function handleAccept() {
    setSaving(true);
    try {
      const result = await acceptConsents(pending);
      setPending(result.pending);
      setAgreed(false);
      window.dispatchEvent(new Event(CONSENTS_CHANGED_EVENT));
      toast.success("Aceite registrado. Obrigado!");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível registrar o aceite."));
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    await signOutSession();
    navigate("/login", { replace: true });
  }

  return (
    <>
      {children}
      {pending.length > 0 ? (
        <Overlay>
          <Modal role="dialog" aria-modal="true" aria-labelledby="consent-title">
            <h2 id="consent-title">Antes de continuar</h2>
            <p>
              Para usar o Profyla, você precisa ler e aceitar:{" "}
              {pending.map((kind, index) => (
                <span key={kind}>
                  {index > 0 ? " e " : ""}
                  <a href={LABELS[kind].path} target="_blank" rel="noreferrer">{LABELS[kind].name}</a>
                </span>
              ))}
              .
            </p>
            <Checkbox>
              <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
              <span>Li e aceito {pending.length > 1 ? "os documentos acima" : "o documento acima"}.</span>
            </Checkbox>
            <Actions>
              <Button type="button" tone="brand" disabled={!agreed || saving} onClick={() => void handleAccept()}>
                {saving ? "Salvando..." : "Aceitar e continuar"}
              </Button>
              <Button type="button" tone="ghost" onClick={() => void handleSignOut()}>Sair</Button>
            </Actions>
          </Modal>
        </Overlay>
      ) : null}
    </>
  );
}
