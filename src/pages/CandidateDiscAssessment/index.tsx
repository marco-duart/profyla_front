import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { getDiscQuestions, getDiscResult, submitDiscAssessment } from "../../services/assessments/disc";
import type { DiscQuestions, DiscResult } from "../../services/assessments/disc/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Badge,
  Button,
  Empty,
  Meta,
  OptionButton,
  Page,
  Panel,
  PanelTitle,
  ScoreFill,
  ScoreLabelRow,
  ScoreRow,
  ScoreTrack,
  StepBody,
  StepCount,
  StepFill,
  StepNav,
  StepQuestion,
  StepTrack,
  WizardShell,
} from "../CandidateKit/styles";

const LIKERT_OPTIONS: { code: string; label: string }[] = [
  { code: "CT", label: "Concordo totalmente" },
  { code: "CP", label: "Concordo parcialmente" },
  { code: "N", label: "Neutro" },
  { code: "DP", label: "Discordo parcialmente" },
  { code: "DT", label: "Discordo totalmente" },
];

const DIMENSION_LABELS: Record<string, string> = {
  D: "Dominância",
  I: "Influência",
  S: "Estabilidade",
  C: "Conformidade",
};

function formatDate(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type Phase = "loading" | "landing" | "quiz";

export function CandidateDiscAssessmentPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [latest, setLatest] = useState<DiscResult.Attempt | null>(null);
  const [questions, setQuestions] = useState<DiscQuestions.Item[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void getDiscResult().then((response) => {
      setLatest(response.latest);
      setPhase("landing");
    });
  }, []);

  async function startQuiz() {
    try {
      const items = await getDiscQuestions();
      setQuestions(shuffle(items));
      setAnswers({});
      setStepIndex(0);
      setPhase("quiz");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao carregar as perguntas."));
    }
  }

  async function finish(finalAnswers: Record<string, string>) {
    setSubmitting(true);
    try {
      const response = await submitDiscAssessment({ answers: finalAnswers });
      setLatest(response.latest);
      setPhase("landing");
      toast.success("Avaliação concluída.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao enviar avaliação."));
    } finally {
      setSubmitting(false);
    }
  }

  function answerCurrent(code: string) {
    const question = questions[stepIndex];
    const nextAnswers = { ...answers, [question.id]: code };
    setAnswers(nextAnswers);

    if (stepIndex + 1 < questions.length) {
      setStepIndex((index) => index + 1);
    } else {
      void finish(nextAnswers);
    }
  }

  function goBack() {
    setStepIndex((index) => Math.max(0, index - 1));
  }

  if (phase === "loading") {
    return <p>Carregando...</p>;
  }

  if (phase === "quiz") {
    const question = questions[stepIndex];
    const progressPct = Math.round(((stepIndex + 1) / questions.length) * 100);

    return (
      <WizardShell>
        <div>
          <StepTrack>
            <StepFill style={{ width: `${progressPct}%` }} />
          </StepTrack>
          <StepCount>Pergunta {stepIndex + 1} de {questions.length}</StepCount>
        </div>

        <StepBody>
          <StepQuestion>{question.text}</StepQuestion>
          {LIKERT_OPTIONS.map((option) => (
            <OptionButton
              key={option.code}
              type="button"
              selected={answers[question.id] === option.code}
              onClick={() => answerCurrent(option.code)}
              disabled={submitting}
            >
              {option.label}
            </OptionButton>
          ))}
        </StepBody>

        <StepNav>
          <Button type="button" tone="ghost" onClick={goBack} disabled={stepIndex === 0}>
            <FiArrowLeft /> Voltar
          </Button>
        </StepNav>
      </WizardShell>
    );
  }

  return (
    <Page>
      <Link to="/candidate/assessments">
        <Button type="button" tone="ghost"><FiArrowLeft /> Voltar para avaliações</Button>
      </Link>

      <Panel>
        <PanelTitle>DISC comportamental</PanelTitle>
        {latest ? (
          <>
            <Badge tone="positive">Realizado em {formatDate(latest.completed_at)}</Badge>
            <Meta>Perfil predominante: {latest.profile.label}</Meta>

            {(Object.keys(DIMENSION_LABELS) as Array<keyof DiscResult.Dimensions>).map((dimension) => (
              <ScoreRow key={dimension}>
                <ScoreLabelRow>
                  <span>{DIMENSION_LABELS[dimension]} ({dimension})</span>
                  <span>{Math.round(latest.dimensions[dimension])}</span>
                </ScoreLabelRow>
                <ScoreTrack>
                  <ScoreFill style={{ width: `${latest.dimensions[dimension]}%` }} />
                </ScoreTrack>
              </ScoreRow>
            ))}

            <Button type="button" tone="brand" onClick={() => void startQuiz()}>Refazer avaliação</Button>
          </>
        ) : (
          <>
            <Empty>Você ainda não realizou essa avaliação.</Empty>
            <Meta>São 50 afirmações rápidas, respondidas em escala de concordância. Leva cerca de 10 minutos.</Meta>
            <Button type="button" tone="brand" onClick={() => void startQuiz()}>Iniciar avaliação</Button>
          </>
        )}
      </Panel>
    </Page>
  );
}
