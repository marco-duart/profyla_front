import { type FormEvent, type ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getApplicationDetail,
  respondInterview,
  submitExamResponse,
  submitFormResponse,
  withdrawApplication,
} from "../../services/applications";
import type { ApplicationDetail, SubmitExamResponse, SubmitFormResponse } from "../../services/applications/dto";
import { getStatusLabel } from "../../utils/candidate-status";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  ActionRow,
  Button,
  Card,
  DangerButton,
  Hero,
  HeroMeta,
  InfoGrid,
  StatusPill,
  TextArea,
  ToolItem,
  ToolList,
  Wrapper,
} from "./styles";

export function CandidateApplicationDetailPage() {
  const params = useParams();
  const applicationId = Number(params.applicationId);

  const [data, setData] = useState<ApplicationDetail.Response | null>(null);
  const [withdrawFeedback, setWithdrawFeedback] = useState<string>("");

  // Form state: field_id → response string
  const [formResponses, setFormResponses] = useState<Record<number, string>>({});

  // Exam state: question_id → alternative_id
  const [examSelections, setExamSelections] = useState<Record<number, number>>({});

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
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao responder entrevista."));
    }
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!data?.tools.dynamic_form_id) {
      return;
    }

    const attributes: SubmitFormResponse.Params["form_responses_attributes"] = {};
    for (const [fieldId, response] of Object.entries(formResponses)) {
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

  async function handleExamSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!data?.tools.dynamic_exam_id) {
      return;
    }

    const attributes: SubmitExamResponse.Params["exam_responses_attributes"] = Object.entries(examSelections).map(
      ([questionId, alternativeId]) => ({
        question_id: Number(questionId),
        alternative_id: alternativeId,
      }),
    );

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

  function handleFormFieldChange(fieldId: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormResponses((current) => ({ ...current, [fieldId]: event.target.value }));
  }

  function handleExamSelection(questionId: number, alternativeId: number) {
    setExamSelections((current) => ({ ...current, [questionId]: alternativeId }));
  }

  if (!data) {
    return <p>Carregando candidatura...</p>;
  }

  return (
    <Wrapper>
      <Hero>
        <h2>{data.job_name}</h2>
        <HeroMeta>
          <span>{data.company_name}</span>
          {data.modality ? <span>{data.modality}</span> : null}
          {data.job_location ? <span>{data.job_location}</span> : null}
          {data.salary ? <span>{data.salary}</span> : null}
        </HeroMeta>
        <StatusPill>{getStatusLabel(data.stage)}</StatusPill>
        <p>{data.summary}</p>
      </Hero>

      {/* ── Questionário dinâmico ── */}
      {data.tools.has_form ? (
        <Card>
          {data.tools.form_already_submitted ? (
            <>
              <h3>Questionario respondido</h3>
              <p>Voce ja enviou suas respostas para o questionario desta etapa. O RH foi notificado.</p>
            </>
          ) : (
            <>
              <h3>Questionario da etapa</h3>
              <p>Responda as perguntas abaixo. Voce so pode enviar uma vez.</p>
              <form onSubmit={handleFormSubmit}>
                <ToolList>
                  {data.tools.form_fields.map((field) => (
                    <ToolItem key={field.id}>
                      <p>{field.question}</p>
                      {field.response_type === "text" ? (
                        <TextArea
                          placeholder="Sua resposta"
                          value={formResponses[field.id] ?? ""}
                          onChange={(event) => handleFormFieldChange(field.id, event)}
                        />
                      ) : (
                        <input
                          type={field.response_type === "number" ? "number" : field.response_type === "date" ? "date" : "text"}
                          placeholder="Sua resposta"
                          value={formResponses[field.id] ?? ""}
                          onChange={(event) => handleFormFieldChange(field.id, event)}
                          style={{ padding: "8px", border: "1px solid var(--border)", borderRadius: "6px", width: "100%" }}
                        />
                      )}
                    </ToolItem>
                  ))}
                </ToolList>
                <Button type="submit" style={{ marginTop: "12px" }}>Enviar questionario</Button>
              </form>
            </>
          )}
        </Card>
      ) : null}

      {/* ── Prova técnica ── */}
      {data.tools.has_exam ? (
        <Card>
          {data.tools.exam_already_submitted ? (
            <>
              <h3>Prova enviada</h3>
              <p>Voce ja enviou suas respostas para a prova tecnica desta etapa. O RH foi notificado.</p>
            </>
          ) : (
            <>
              <h3>Prova tecnica</h3>
              <p>Escolha uma alternativa para cada questao e envie ao final.</p>
              <form onSubmit={handleExamSubmit}>
                <ToolList>
                  {data.tools.exam_questions.map((question, index) => (
                    <ToolItem key={question.id}>
                      <p><strong>{index + 1}.</strong> {question.text}</p>
                      <ActionRow style={{ flexDirection: "column", alignItems: "flex-start" }}>
                        {question.alternatives.map((alt) => (
                          <label key={alt.id} style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }}>
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={alt.id}
                              checked={examSelections[question.id] === alt.id}
                              onChange={() => handleExamSelection(question.id, alt.id)}
                            />
                            {alt.text}
                          </label>
                        ))}
                      </ActionRow>
                    </ToolItem>
                  ))}
                </ToolList>
                <Button type="submit" style={{ marginTop: "12px" }}>Enviar prova</Button>
              </form>
            </>
          )}
        </Card>
      ) : null}

      {/* ── Entrevistas ── */}
      <InfoGrid>
        <Card>
          <h3>Entrevistas</h3>
          {data.interviews.length === 0 ? (
            <p>Sem entrevistas agendadas no momento.</p>
          ) : (
            <ToolList>
              {data.interviews.map((interview) => (
                <ToolItem key={interview.id}>
                  <p><strong>{interview.interview_type}</strong>{interview.interviewer ? ` com ${interview.interviewer}` : ""}</p>
                  <p>{interview.date_time}</p>
                  {interview.interview_method ? <p>Formato: {interview.interview_method}</p> : null}
                  {interview.resume ? <p>{interview.resume}</p> : null}
                  {data.tools.can_respond_interview ? (
                    <ActionRow>
                      <Button type="button" onClick={() => handleInterviewResponse(interview.id, "accept")}>Aceitar</Button>
                      <Button type="button" onClick={() => handleInterviewResponse(interview.id, "reschedule")}>Reagendar</Button>
                      <Button type="button" onClick={() => handleInterviewResponse(interview.id, "decline")}>Recusar</Button>
                    </ActionRow>
                  ) : null}
                </ToolItem>
              ))}
            </ToolList>
          )}
        </Card>

        {data.feedback ? (
          <Card>
            <h3>Ultimo feedback registrado</h3>
            <p>{data.feedback.specific_comment ?? "Sem comentario adicional."}</p>
            {data.feedback.improvements ? <p>Pontos de melhoria: {data.feedback.improvements}</p> : null}
          </Card>
        ) : null}
      </InfoGrid>

      {/* ── Desistência ── */}
      {data.tools.can_withdraw ? (
        <Card>
          <h3>Desistir da vaga</h3>
          <p>Se decidir encerrar sua participacao, o RH sera avisado automaticamente.</p>
          <TextArea
            value={withdrawFeedback}
            onChange={(event) => setWithdrawFeedback(event.target.value)}
            placeholder="Conte para o RH o motivo da desistencia"
          />
          <DangerButton type="button" onClick={handleWithdraw}>Confirmar desistencia</DangerButton>
        </Card>
      ) : null}

      {/* ── Estado terminal sem ações ── */}
      {data.terminal_state && !data.feedback ? (
        <Card>
          <h3>Processo encerrado</h3>
          <p>Esta candidatura foi encerrada. Nenhuma acao adicional esta disponivel.</p>
        </Card>
      ) : null}
    </Wrapper>
  );
}

