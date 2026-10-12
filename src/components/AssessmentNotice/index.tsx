import { type ReactNode, useRef, useState } from "react";
import toast from "react-hot-toast";
import { acceptConsents, CONSENTS_CHANGED_EVENT, getConsents, getLegalDocument } from "../../services/legal";
import type { Legal } from "../../services/legal/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { ConfirmDialog } from "../../pages/CandidateKit/ConfirmDialog";
import { Meta } from "../../pages/CandidateKit/styles";
import { Markdown } from "../Markdown";

// The behavioral tests are not validated psychometric instruments: before the first one, the
// candidate reads and accepts a notice (the backend refuses the test without it).
export function useAssessmentNotice(): { ensureAccepted: () => Promise<boolean>; dialog: ReactNode } {
  const [document, setDocument] = useState<Legal.Document | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [saving, setSaving] = useState(false);
  const resolver = useRef<((accepted: boolean) => void) | null>(null);

  function settle(accepted: boolean) {
    resolver.current?.(accepted);
    resolver.current = null;
    setDocument(null);
    setAgreed(false);
  }

  async function ensureAccepted(): Promise<boolean> {
    try {
      const consents = await getConsents();
      const item = consents.documents.find((entry) => entry.kind === "assessment_notice");
      if (!item) {
        toast.error("O aviso dos testes ainda não foi publicado. Fale com o suporte.");
        return false;
      }
      if (item.accepted) return true;

      setDocument(await getLegalDocument("assessment_notice"));
      return await new Promise<boolean>((resolve) => {
        resolver.current = resolve;
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível verificar o aviso dos testes."));
      return false;
    }
  }

  async function handleAccept() {
    setSaving(true);
    try {
      await acceptConsents(["assessment_notice"]);
      window.dispatchEvent(new Event(CONSENTS_CHANGED_EVENT));
      settle(true);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível registrar o aceite."));
    } finally {
      setSaving(false);
    }
  }

  const dialog = (
    <ConfirmDialog
      open={document !== null}
      title="Antes de começar"
      confirmLabel="Aceitar e iniciar"
      tone="brand"
      confirming={saving}
      confirmDisabled={!agreed}
      onConfirm={() => void handleAccept()}
      onCancel={() => settle(false)}
    >
      <div style={{ maxHeight: "50vh", overflowY: "auto", display: "grid", gap: "8px" }}>
        {document ? <Markdown source={document.content} /> : null}
      </div>
      <label style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} style={{ marginTop: "4px" }} />
        <Meta>Li o aviso e quero fazer o teste.</Meta>
      </label>
    </ConfirmDialog>
  );

  return { ensureAccepted, dialog };
}
