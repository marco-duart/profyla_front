import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
  getApplicationDetail,
  respondInterview,
  submitExamResponse,
  submitFormResponse,
  withdrawApplication,
} from "../../services/applications";
import type { ApplicationDetail } from "../../services/applications/dto";
import { getStatusLabel } from "../../utils/candidate-status";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Actions,
  Badge,
  Button,
  Field,
  Hero,
  Item,
  ItemTop,
  List,
  Meta,
  OptionButton,
  Page,
  Panel,
  PanelTitle,
  StepBody,
  StepCount,
  StepFill,
  StepNav,
  StepQuestion,
  StepTrack,
  Textarea,
  Input as KitInput,
  WizardShell,
} from "../CandidateKit/styles";

function toneFor(status: ApplicationDetail.Response["status_tone"]): "positive" | "negative" | "neutral" {
  return status;
}

function DynamicFormWizard({
  fields,
  onSubmit,
}: {
  fields: ApplicationDetail.FormField[];
  onSubmit: (responses: Record<number, string>) => Promise<void>;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const field = fields[stepIndex];
  const isLast = stepIndex === fields.length - 1;
  const progressPct = Math.round(((stepIndex + 1) / fields.length) * 100);

  function updateResponse(value: string) {
    setResponses((current) => ({ ...current, [field.id]: value }));
  }

  async function handleNext() {
    if (!isLast) {
      setStepIndex((index) => index + 1);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(responses);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <WizardShell>
      <div>
        <StepTrack>
          <StepFill style={{ width: `${progressPct}%` }} />
        </StepTrack>
        <StepCount>Pergunta {stepIndex + 1} de {fields.length}</StepCount>
      </div>
      <StepBody>
        <StepQuestion>{field.question}</StepQuestion>
        {field.response_type === "text" ? (
          <Textarea
            value={responses[field.id] ?? ""}
            onChange={(event) => updateResponse(event.target.value)}
            placeholder="Sua resposta"
          />
        ) : (
          <KitInput
            type={field.response_type === "number" ? "number" : field.response_type === "date" ? "date" : "text"}
            value={responses[field.id] ?? ""}
            onChange={(event) => updateResponse(event.target.value)}
            placeholder="Sua resposta"
          />
        )}
      </StepBody>
      <StepNav>
        <Button type="button" tone="ghost" onClick={() => setStepIndex((index) => Math.max(0, index - 1))} disabled={stepIndex === 0}>
          <FiArrowLeft /> Voltar
        </Button>
        <Button type="button" tone="brand" onClick={() => void handleNext()} disabled={submitting}>
          {isLast ? (submitting ? "Enviando..." : "Enviar questionario") : <>Continuar <FiArrowRight /></>}
        </Button>
      </StepNav>
    </WizardShell>
  );
}

function DynamicExamWizard({
  questions,
  onSubmit,
}: {
  questions: ApplicationDetail.ExamQuestion[];
  onSubmit: (selections: Record<number, number>) => Promise<void>;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const question = questions[stepIndex];
  const isLast = stepIndex === questions.length - 1;
  const selected = selections[question.id];
  const progressPct = Math.round(((stepIndex + 1) / questions.length) * 100);

  async function handleNext() {
    if (!isLast) {
      setStepIndex((index) => index + 1);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(selections);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <WizardShell>
      <div>
        <StepTrack>
          <StepFill style={{ width: `${progressPct}%` }} />
        </StepTrack>
        <StepCount>Questao {stepIndex + 1} de {questions.length}</StepCount>
      </div>
      <StepBody>
        <StepQuestion>{question.text}</StepQuestion>
        <Actions style={{ flexDirection: "column", alignItems: "stretch" }}>
          {question.alternatives.map((alternative) => (
            <OptionButton
              key={alternative.id}
              type="button"
              selected={selected === alternative.id}
              onClick={() => setSelections((current) => ({ ...current, [question.id]: alternative.id }))}
            >
              {alternative.text}
            </OptionButton>
          ))}
        </Actions>
      </StepBody>
      <StepNav>
        <Button type="button" tone="ghost" onClick={() => setStepIndex((index) => Math.max(0, index - 1))} disabled={stepIndex === 0}>
          <FiArrowLeft /> Voltar
        </Button>
        <Button type="button" tone="brand" onClick={() => void handleNext()} disabled={selected === undefined || submitting}>
          {isLast ? (submitting ? "Enviando..." : "Enviar prova") : <>Continuar <FiArrowRight /></>}
        </Button>
      </StepNav>
    </WizardShell>
  );
}

export function CandidateApplicationDetailPage() {
  const params = useParams();
  const applicationId = Number(params.applicationId);

  const [data, setData] = useState<ApplicationDetail.Response | null>(null);
  const [withdrawFeedback, setWithdrawFeedback] = useState<string>("");

  async function loadData() {
    const response = await getApplicationDetail(applicationId);
    setData(response);
  }

  useEffect(() => {
    void loadData();
  }, [applicationId]);

  async function handleWithdraw() {
    try {
      await withdrawApplication(applicationId, { feedback: withdrawFeedback });
      toast.success("Desistencia registrada.");
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao desistir da vaga."));
    }
  }

  async function handleInterviewResponse(interviewId: number, response: "accept" | "reschedule" | "decline") {
    try {
      await respondInterview(applicationId, { interview_id: interviewId, response });
      toast.success("Resposta de entrevista enviada.");
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao responder entrevista."));
    }
  }

  async function handleFormSubmit(responses: Record<number, string>) {
    if (!data?.tools.dynamic_form_id) return;

    const attributes: Record<number, { response: string }> = {};
    for (const [fieldId, response] of Object.entries(responses)) {
      attributes[Number(fieldId)] = { response };
    }

    try {
      await submitFormResponse({
        application_status_id: applicationId,
        dynamic_form_id: data.tools.dynamic_form_id,
        form_responses_attributes: attributes,
      });
      toast.success("Questionario enviado com sucesso.");
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao enviar questionario."));
    }
  }

  async function handleExamSubmit(selections: Record<number, number>) {
    if (!data?.tools.dynamic_exam_id) return;

    const attributes = Object.entries(selections).map(([questionId, alternativeId]) => ({
      question_id: Number(questionId),
      alternative_id: alternativeId,
    }));

    try {
      await submitExamResponse({
        application_status_id: applicationId,
        dynamic_exam_id: data.tools.dynamic_exam_id,
        exam_responses_attributes: attributes,
      });
      toast.success("Prova enviada com sucesso.");
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao enviar prova."));
    }
  }

  if (!data) {
    return <p>Carregando candidatura...</p>;
  }

  return (
    <Page>
      <Hero>
        <h2>{data.job_name}</h2>
        <Meta>
          {data.company_name}
          {data.modality ? ` - ${data.modality}` : ""}
          {data.job_location ? ` - ${data.job_location}` : ""}
          {data.salary ? ` - ${data.salary}` : ""}
        </Meta>
        <Badge tone={toneFor(data.status_tone)}>{getStatusLabel(data.stage)}</Badge>
        <p>{data.summary}</p>
      </Hero>

      {data.tools.has_form ? (
        <Panel>
          {data.tools.form_already_submitted ? (
            <>
              <PanelTitle>Questionario respondido</PanelTitle>
              <Meta>Voce ja enviou suas respostas para o questionario desta etapa. O RH foi notificado.</Meta>
            </>
          ) : (
            <DynamicFormWizard fields={data.tools.form_fields} onSubmit={handleFormSubmit} />
          )}
        </Panel>
      ) : null}

      {data.tools.has_exam ? (
        <Panel>
          {data.tools.exam_already_submitted ? (
            <>
              <PanelTitle>Prova enviada</PanelTitle>
              <Meta>Voce ja enviou suas respostas para a prova tecnica desta etapa. O RH foi notificado.</Meta>
            </>
          ) : (
            <DynamicExamWizard questions={data.tools.exam_questions} onSubmit={handleExamSubmit} />
          )}
        </Panel>
      ) : null}

      <Panel>
        <PanelTitle>Entrevistas</PanelTitle>
        {data.interviews.length === 0 ? (
          <Meta>Sem entrevistas agendadas no momento.</Meta>
        ) : (
          <List>
            {data.interviews.map((interview) => (
              <Item key={interview.id}>
                <ItemTop>
                  <strong>{interview.interview_type}{interview.interviewer ? ` com ${interview.interviewer}` : ""}</strong>
                </ItemTop>
                <Meta>{interview.date_time}{interview.interview_method ? ` - ${interview.interview_method}` : ""}</Meta>
                {interview.resume ? <Meta>{interview.resume}</Meta> : null}
                {data.tools.can_respond_interview ? (
                  <Actions>
                    <Button type="button" tone="brand" onClick={() => void handleInterviewResponse(interview.id, "accept")}>Aceitar</Button>
                    <Button type="button" tone="ghost" onClick={() => void handleInterviewResponse(interview.id, "reschedule")}>Reagendar</Button>
                    <Button type="button" tone="danger" onClick={() => void handleInterviewResponse(interview.id, "decline")}>Recusar</Button>
                  </Actions>
                ) : null}
              </Item>
            ))}
          </List>
        )}
      </Panel>

      {data.feedback ? (
        <Panel>
          <PanelTitle>Ultimo feedback registrado</PanelTitle>
          <Meta>{data.feedback.specific_comment ?? "Sem comentario adicional."}</Meta>
          {data.feedback.improvements ? <Meta>Pontos de melhoria: {data.feedback.improvements}</Meta> : null}
        </Panel>
      ) : null}

      {data.tools.can_withdraw ? (
        <Panel>
          <PanelTitle>Desistir da vaga</PanelTitle>
          <Meta>Se decidir encerrar sua participacao, o RH sera avisado automaticamente.</Meta>
          <Field>
            Motivo (opcional)
            <Textarea
              value={withdrawFeedback}
              onChange={(event) => setWithdrawFeedback(event.target.value)}
              placeholder="Conte para o RH o motivo da desistencia"
            />
          </Field>
          <Actions>
            <Button type="button" tone="danger" onClick={() => void handleWithdraw()}>Confirmar desistencia</Button>
          </Actions>
        </Panel>
      ) : null}

      {data.terminal_state && !data.feedback ? (
        <Panel>
          <PanelTitle>Processo encerrado</PanelTitle>
          <Meta>Esta candidatura foi encerrada. Nenhuma acao adicional esta disponivel.</Meta>
        </Panel>
      ) : null}
    </Page>
  );
}
