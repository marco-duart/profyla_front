import { type FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { listAdminApplications } from "../../services/admin/applications";
import type { AdminApplication } from "../../services/admin/applications/dto";
import { getHiring, listHirings } from "../../services/admin/hirings";
import type { AdminHiring } from "../../services/admin/hirings/dto";
import { listJobs } from "../../services/admin/jobs";
import type { AdminJob } from "../../services/admin/jobs/dto";
import {
  createInterview,
  deleteInterview,
  listInterviews,
  updateInterview,
} from "../../services/admin/interviews";
import type { AdminInterview } from "../../services/admin/interviews/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { ConfirmDialog } from "../StaffKit/ConfirmDialog";
import {
  Actions,
  Button,
  Empty,
  Field,
  Grid,
  Hero,
  Input,
  Item,
  ItemTop,
  Lead,
  List,
  Meta,
  Page,
  Panel,
  PanelTitle,
  Select,
  Textarea,
} from "../StaffKit/styles";

type FormState = {
  application_status_id: string;
  hiring_process_stage_id: string;
  date_time: string;
  interview_type: string;
  interviewer: string;
  interview_method: string;
  resume: string;
};

const emptyForm: FormState = {
  application_status_id: "",
  hiring_process_stage_id: "",
  date_time: "",
  interview_type: "online",
  interviewer: "RH",
  interview_method: "solo",
  resume: "",
};

export function StaffInterviewsPage() {
  const [items, setItems] = useState<AdminInterview.Item[]>([]);
  const [applications, setApplications] = useState<AdminApplication.Item[]>([]);
  const [hirings, setHirings] = useState<AdminHiring.Item[]>([]);
  const [jobs, setJobs] = useState<AdminJob.Item[]>([]);
  const [stages, setStages] = useState<AdminHiring.Stage[]>([]);
  const [selectedHiringId, setSelectedHiringId] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  async function loadData() {
    const [interviewsResponse, applicationsResponse, hiringsResponse, jobsResponse] = await Promise.all([
      listInterviews(),
      listAdminApplications(),
      listHirings(),
      listJobs(),
    ]);

    setItems(interviewsResponse);
    setApplications(applicationsResponse);
    setHirings(hiringsResponse);
    setJobs(jobsResponse);
  }

  useEffect(() => {
    void loadData();
  }, []);

  const jobTitleById = useMemo(() => {
    const map = new Map<number, string>();
    for (const job of jobs) map.set(job.id, job.title);
    return map;
  }, [jobs]);

  useEffect(() => {
    if (!selectedHiringId) {
      setStages([]);
      return;
    }

    async function loadStages() {
      const detail = await getHiring(Number(selectedHiringId));
      setStages(detail.stages ?? []);
    }

    void loadStages();
  }, [selectedHiringId]);

  function beginEdit(item: AdminInterview.Item) {
    setEditingId(item.id);
    setForm({
      application_status_id: String(item.application_status_id ?? ""),
      hiring_process_stage_id: String(item.stage_id),
      date_time: item.date_time?.slice(0, 16) ?? "",
      interview_type: item.interview_type,
      interviewer: item.interviewer,
      interview_method: item.interview_method,
      resume: item.resume ?? "",
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const payload = {
        application_status_id: form.application_status_id ? Number(form.application_status_id) : undefined,
        hiring_process_stage_id: Number(form.hiring_process_stage_id),
        date_time: form.date_time,
        interview_type: form.interview_type,
        interviewer: form.interviewer,
        interview_method: form.interview_method,
        resume: form.resume || undefined,
      };

      if (editingId) {
        await updateInterview(editingId, payload);
        toast.success("Entrevista atualizada.");
      } else {
        await createInterview(payload);
        toast.success("Entrevista criada.");
      }

      resetForm();
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao salvar entrevista."));
    }
  }

  async function confirmDelete() {
    if (!pendingDeleteId) return;
    setDeleting(true);

    try {
      await deleteInterview(pendingDeleteId);
      toast.success("Entrevista removida.");
      setPendingDeleteId(null);
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao remover entrevista."));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Entrevistas</h2>
        <Lead>Agende entrevistas por etapa, associando opcionalmente a uma candidatura especifica.</Lead>
      </Hero>

      <Panel>
        <PanelTitle>{editingId ? "Editar entrevista" : "Nova entrevista"}</PanelTitle>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Field>
              Processo (para carregar etapas)
              <Select value={selectedHiringId} onChange={(event) => setSelectedHiringId(event.target.value)}>
                <option value="">Selecione</option>
                {hirings.map((hiring) => (
                  <option key={hiring.id} value={hiring.id}>
                    {jobTitleById.get(hiring.job_posting_id) ?? `Processo #${hiring.id}`}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              Candidatura
              <Select
                value={form.application_status_id}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, application_status_id: event.target.value }))
                }
              >
                <option value="">Sem candidatura especifica</option>
                {applications.map((application) => (
                  <option key={application.id} value={application.id}>
                    #{application.id} - {application.candidate_name || "Candidato"} - {application.job_name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              Etapa
              <Select
                required
                value={form.hiring_process_stage_id}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, hiring_process_stage_id: event.target.value }))
                }
              >
                <option value="">Selecione</option>
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.title}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              Data e horario
              <Input
                required
                type="datetime-local"
                value={form.date_time}
                onChange={(event) => setForm((prev) => ({ ...prev, date_time: event.target.value }))}
              />
            </Field>
            <Field>
              Tipo
              <Input
                required
                value={form.interview_type}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, interview_type: event.target.value }))
                }
              />
            </Field>
            <Field>
              Entrevistador
              <Input
                required
                value={form.interviewer}
                onChange={(event) => setForm((prev) => ({ ...prev, interviewer: event.target.value }))}
              />
            </Field>
            <Field>
              Metodo
              <Input
                required
                value={form.interview_method}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, interview_method: event.target.value }))
                }
              />
            </Field>
          </Grid>

          <Field>
            Resumo/instrucoes
            <Textarea
              value={form.resume}
              onChange={(event) => setForm((prev) => ({ ...prev, resume: event.target.value }))}
            />
          </Field>

          <Actions>
            <Button tone="brand" type="submit">
              {editingId ? "Salvar" : "Criar entrevista"}
            </Button>
            <Button type="button" tone="ghost" onClick={resetForm}>
              Limpar
            </Button>
          </Actions>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Entrevistas agendadas</PanelTitle>
        {items.length === 0 ? (
          <Empty>Nenhuma entrevista cadastrada.</Empty>
        ) : (
          <List>
            {items.map((item) => (
              <Item key={item.id}>
                <ItemTop>
                  <strong>{item.candidate_name || "Sem candidato associado"}</strong>
                  <Actions>
                    <Button type="button" onClick={() => beginEdit(item)}>
                      Editar
                    </Button>
                    <Button type="button" tone="danger" onClick={() => setPendingDeleteId(item.id)}>
                      Excluir
                    </Button>
                  </Actions>
                </ItemTop>
                <Meta>
                  Etapa: {item.stage_title || item.stage_id} · {item.date_time?.slice(0, 16).replace("T", " ")}
                </Meta>
                <Meta>
                  Tipo: {item.interview_type} · Metodo: {item.interview_method} · Entrevistador: {item.interviewer}
                </Meta>
              </Item>
            ))}
          </List>
        )}
      </Panel>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Excluir entrevista"
        message="Essa acao nao pode ser desfeita."
        confirming={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setPendingDeleteId(null)}
      />
    </Page>
  );
}
