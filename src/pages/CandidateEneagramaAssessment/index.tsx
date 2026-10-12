import { PageSkeleton } from "../../components/PageSkeleton";
import { formatDate } from "../../utils/format";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { getEneagramaQuestions, getEneagramaResult, submitEneagramaAssessment } from "../../services/assessments/eneagrama";
import type { EneagramaQuestions, EneagramaResult } from "../../services/assessments/eneagrama/dto";
import { useAssessmentNotice } from "../../components/AssessmentNotice";
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

const TYPE_LABELS: Record<string, string> = {
  E1: "Reformador",
  E2: "Prestativo",
  E3: "Realizador",
  E4: "Individualista",
  E5: "Investigador",
  E6: "Leal",
  E7: "Entusiasta",
  E8: "Desafiador",
  E9: "Pacificador",
};

const CENTER_LABELS: Record<string, string> = {
  instinctive: "Instintivo",
  emotional: "Emocional",
  mental: "Mental",
};


function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type Phase = "loading" | "landing" | "quiz";

export function CandidateEneagramaAssessmentPage() {
  const { ensureAccepted, dialog: noticeDialog } = useAssessmentNotice();
  const [phase, setPhase] = useState<Phase>("loading");
  const [latest, setLatest] = useState<EneagramaResult.Attempt | null>(null);
  const [questions, setQuestions] = useState<EneagramaQuestions.Item[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void getEneagramaResult().then((response) => {
      setLatest(response.latest);
      setPhase("landing");
    });
  }, []);

  async function startQuiz() {
    if (!(await ensureAccepted())) return;
    try {
      const items = await getEneagramaQuestions();
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
      const response = await submitEneagramaAssessment({ answers: finalAnswers });
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
    return <PageSkeleton kit="candidate" />;
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
      <Button as={Link} to="/candidate/assessments" tone="ghost"><FiArrowLeft /> Voltar para avaliações</Button>

      <Panel>
        <PanelTitle>Eneagrama</PanelTitle>
        {latest ? (
          <>
            <Badge tone="positive">Realizado em {formatDate(latest.completed_at)}</Badge>
            <Meta>
              Perfil predominante: {TYPE_LABELS[latest.profile.primary]} ({latest.profile.label})
            </Meta>

            {(Object.keys(TYPE_LABELS) as Array<keyof EneagramaResult.Types>).map((type) => (
              <ScoreRow key={type}>
                <ScoreLabelRow>
                  <span>{TYPE_LABELS[type]} ({type})</span>
                  <span>{Math.round(latest.types[type])}</span>
                </ScoreLabelRow>
                <ScoreTrack>
                  <ScoreFill style={{ width: `${latest.types[type]}%` }} />
                </ScoreTrack>
              </ScoreRow>
            ))}

            <PanelTitle>Centros</PanelTitle>
            {(Object.keys(CENTER_LABELS) as Array<keyof EneagramaResult.Centers>).map((center) => (
              <ScoreRow key={center}>
                <ScoreLabelRow>
                  <span>{CENTER_LABELS[center]}</span>
                  <span>{Math.round(latest.centers[center])}</span>
                </ScoreLabelRow>
                <ScoreTrack>
                  <ScoreFill tone="accent" style={{ width: `${latest.centers[center]}%` }} />
                </ScoreTrack>
              </ScoreRow>
            ))}

            {latest.interpretation ? (
              <>
                <h3>O que isso sugere</h3>
                {[latest.interpretation.primary, latest.interpretation.secondary].map((type, index) =>
                  type ? (
                    <div key={type.key}>
                      <strong>{index === 0 ? "Tipo predominante" : "Segundo tipo"}: {type.name}</strong>
                      <Meta>{type.summary}</Meta>
                      <Meta>Ponto de atenção: {type.attention}</Meta>
                    </div>
                  ) : null,
                )}
                <Meta>{latest.interpretation.wing}</Meta>
                <Meta>{latest.interpretation.disclaimer}</Meta>
              </>
            ) : null}

            <Button type="button" tone="brand" onClick={() => void startQuiz()}>Refazer avaliação</Button>
          </>
        ) : (
          <>
            <Empty>Você ainda não realizou essa avaliação.</Empty>
            <Meta>São 54 afirmações rápidas, respondidas em escala de concordância. Leva cerca de 12 minutos.</Meta>
            <Button type="button" tone="brand" onClick={() => void startQuiz()}>Iniciar avaliação</Button>
          </>
        )}
      </Panel>
      {noticeDialog}
    </Page>
  );
}
