import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getScorecard, saveScorecard } from "../../services/admin/scorecards";
import type { Scorecard } from "../../services/admin/scorecards/dto";
import { useAuth } from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../utils/api-error";
import { ConfirmDialog } from "../StaffKit/ConfirmDialog";
import { Actions, Badge, Chip, ChipRow, Field, Meta, Textarea } from "../StaffKit/styles";

type Props = { interviewId: number | null; candidateName?: string; onClose: () => void; onSaved: () => void };

// The interviewer grades each criterion from 1 to 5 after the interview; everyone's grades and the
// average are visible to the staff only.
export function ScorecardDialog({ interviewId, candidateName, onClose, onSaved }: Props) {
  const { user } = useAuth();
  const [detail, setDetail] = useState<Scorecard.Detail | null>(null);
  const [scores, setScores] = useState<Record<number, number>>({});
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!interviewId) return;
    let active = true;
    getScorecard(interviewId)
      .then((response) => {
        if (!active) return;
        setDetail(response);
        const mine = response.scorecards.find((entry) => entry.evaluator_user_id === user?.id);
        setScores(Object.fromEntries((mine?.scores ?? []).map((s) => [s.criterion_id, s.score])));
        setComment(mine?.comment ?? "");
      })
      .catch((error) => toast.error(getApiErrorMessage(error, "Erro ao carregar a avaliação.")));
    return () => {
      active = false;
      setDetail(null);
    };
  }, [interviewId, user?.id]);

  async function handleSave() {
    if (!interviewId) return;
    setSaving(true);
    try {
      await saveScorecard(interviewId, scores, comment);
      toast.success("Avaliação salva.");
      onSaved();
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível salvar a avaliação."));
    } finally {
      setSaving(false);
    }
  }

  const criteria = detail?.criteria ?? [];
  const complete = criteria.length > 0 && criteria.every((criterion) => scores[criterion.id]);

  return (
    <ConfirmDialog
      open={interviewId !== null}
      title={`Avaliar entrevista${candidateName ? `: ${candidateName}` : ""}`}
      message={criteria.length === 0 && detail ? "Defina os critérios de avaliação do processo (em Processos > Critérios) antes de avaliar." : "Dê uma nota de 1 (fraco) a 5 (excelente) para cada critério."}
      confirmLabel="Salvar avaliação"
      tone="brand"
      confirming={saving}
      confirmDisabled={!complete}
      onConfirm={() => void handleSave()}
      onCancel={onClose}
    >
      {criteria.map((criterion) => (
        <Field as="div" key={criterion.id}>
          {criterion.name}
          <ChipRow role="radiogroup" aria-label={criterion.name}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Chip
                key={value}
                type="button"
                role="radio"
                aria-checked={scores[criterion.id] === value}
                selected={scores[criterion.id] === value}
                onClick={() => setScores((current) => ({ ...current, [criterion.id]: value }))}
              >
                {value}
              </Chip>
            ))}
          </ChipRow>
        </Field>
      ))}
      {criteria.length > 0 ? (
        <Field>
          Comentário (opcional)
          <Textarea value={comment} maxLength={2000} onChange={(event) => setComment(event.target.value)} />
        </Field>
      ) : null}
      {detail && detail.scorecards.length > 0 ? (
        <Actions css={{ alignItems: "center" }}>
          <Badge tone="positive">Média da entrevista: {detail.average?.toLocaleString("pt-BR")}</Badge>
          <Meta>{detail.scorecards.map((entry) => `${entry.evaluator_name ?? "Avaliador"} ${entry.average?.toLocaleString("pt-BR")}`).join(" · ")}</Meta>
        </Actions>
      ) : null}
    </ConfirmDialog>
  );
}
