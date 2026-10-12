import type { Pagination as PaginationData } from "../../services/pagination";
import { Pagination } from "../StaffKit/Pagination";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { listExams } from "../../services/admin/exams";
import type { AdminExam } from "../../services/admin/exams/dto";
import { getCriteria, saveCriteria } from "../../services/admin/scorecards";
import { alertCompatibleCandidates, exportHiringApplicationsCsv, createHiring, deleteHiring, listHiringsPage, updateHiring } from "../../services/admin/hirings";
import type { AdminHiring } from "../../services/admin/hirings/dto";
import { listJobs } from "../../services/admin/jobs";
import type { AdminJob } from "../../services/admin/jobs/dto";
import { listForms } from "../../services/admin/forms";
import type { AdminForm } from "../../services/admin/forms/dto";
import { listRecruiters } from "../../services/admin/recruiters";
import type { AdminRecruiter } from "../../services/admin/recruiters/dto";
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
  Badge,
} from "../StaffKit/styles";

const STATUS_OPTIONS = [
  { value: "draft", label: "Rascunho", tone: "neutral" },
  { value: "open", label: "Aberto", tone: "positive" },
  { value: "paused", label: "Pausado", tone: "warning" },
  { value: "closed", label: "Encerrado", tone: "negative" },
] as const;

function statusOption(value: string) {
  return STATUS_OPTIONS.find((option) => option.value === value);
}

type FormState = {
  job_id: string;
  start_date: string;
  end_date: string;
  status: string;
  dynamic_form_id: string;
  dynamic_exam_id: string;
};

const emptyForm: FormState = {
  job_id: "",
  start_date: "",
  end_date: "",
  status: "open",
  dynamic_form_id: "",
  dynamic_exam_id: "",
};

export function StaffHiringsPage() {
  const [items, setItems] = useState<AdminHiring.Item[]>([]);
  const [jobs, setJobs] = useState<AdminJob.Item[]>([]);
  const [forms, setForms] = useState<AdminForm.Item[]>([]);
  const [exams, setExams] = useState<AdminExam.Item[]>([]);
  const [recruiters, setRecruiters] = useState<AdminRecruiter.Item[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [pendingAlertId, setPendingAlertId] = useState<number | null>(null);
  const [criteriaFor, setCriteriaFor] = useState<number | null>(null);
  const [criteriaText, setCriteriaText] = useState("");
  const [savingCriteria, setSavingCriteria] = useState(false);
  const [alerting, setAlerting] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  async function loadData(targetPage = page) {
    const [hiringsResponse, jobsResponse, formsResponse, examsResponse, recruitersResponse] = await Promise.all([
      listHiringsPage(targetPage, selectedJobId ? Number(selectedJobId) : undefined),
      listJobs(),
      listForms(),
      listExams(),
      listRecruiters(),
    ]);

    if (hiringsResponse.records.length === 0 && targetPage > 1) {
      setPage(targetPage - 1);
      return;
    }
    setItems(hiringsResponse.records);
    setPagination(hiringsResponse.pagination);
    setJobs(jobsResponse);
    setForms(formsResponse);
    setExams(examsResponse);
    setRecruiters(recruitersResponse);
  }

  useEffect(() => {
    void loadData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedJobId]);

  const filteredItems = items;

  const jobTitleById = useMemo(() => {
    const map = new Map<number, string>();
    for (const job of jobs) map.set(job.id, job.title);
    return map;
  }, [jobs]);

  const recruiterNameById = useMemo(() => {
    const map = new Map<number, string>();
    for (const recruiter of recruiters) map.set(recruiter.recruiter_id, recruiter.name);
    return map;
  }, [recruiters]);

  function beginEdit(item: AdminHiring.Item) {
    setEditingId(item.id);
    setForm((prev) => ({
      ...prev,
      job_id: String(item.job_posting_id),
      start_date: item.start_date?.slice(0, 10) ?? "",
      end_date: item.end_date?.slice(0, 10) ?? "",
      status: item.status,
    }));
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (editingId) {
        await updateHiring(editingId, {
          start_date: form.start_date,
          end_date: form.end_date,
          status: form.status,
        });
        toast.success("Processo atualizado.");
      } else {
        await createHiring({
          job_id: Number(form.job_id),
          start_date: form.start_date,
          end_date: form.end_date,
          status: form.status,
          dynamic_form_id: form.dynamic_form_id ? Number(form.dynamic_form_id) : undefined,
          dynamic_exam_id: form.dynamic_exam_id ? Number(form.dynamic_exam_id) : undefined,
        });
        toast.success("Processo seletivo criado.");
      }

      resetForm();
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao salvar processo seletivo."));
    }
  }

  async function openCriteria(id: number) {
    try {
      const current = await getCriteria(id);
      setCriteriaText(current.length > 0 ? current.map((criterion) => criterion.name).join("\n") : "Comunicação\nConhecimento técnico\nAlinhamento cultural");
      setCriteriaFor(id);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao carregar os critérios."));
    }
  }

  async function confirmCriteria() {
    if (!criteriaFor) return;
    setSavingCriteria(true);
    try {
      await saveCriteria(criteriaFor, criteriaText.split("\n"));
      toast.success("Critérios salvos.");
      setCriteriaFor(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível salvar os critérios."));
    } finally {
      setSavingCriteria(false);
    }
  }

  async function confirmAlert() {
    if (!pendingAlertId) return;
    setAlerting(true);
    try {
      const result = await alertCompatibleCandidates(pendingAlertId);
      toast.success(`${result.sent} candidato(s) avisado(s). ${result.below_threshold} abaixo do mínimo de aderência (${result.threshold}%), ${result.already_applied} já candidatado(s).`);
      setPendingAlertId(null);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível enviar o alerta."));
    } finally {
      setAlerting(false);
    }
  }

  async function changeStatus(item: AdminHiring.Item, status: string) {
    try {
      await updateHiring(item.id, { status });
      toast.success(status === "closed" ? "Processo encerrado." : "Processo aberto.");
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível alterar o status."));
    }
  }

  async function confirmDelete() {
    if (!pendingDeleteId) return;
    setDeleting(true);

    try {
      await deleteHiring(pendingDeleteId);
      toast.success("Processo removido.");
      setPendingDeleteId(null);
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao remover processo."));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Processos seletivos</h2>
        <Lead>
          Uma vaga pode gerar vários processos. Configure período, status e vincule formulário/prova para automatizar as etapas.
        </Lead>
      </Hero>

      <Panel>
        <PanelTitle>{editingId ? "Editar processo" : "Novo processo"}</PanelTitle>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Field>
              Vaga
              <Select
                required
                disabled={Boolean(editingId)}
                value={form.job_id}
                onChange={(event) => setForm((prev) => ({ ...prev, job_id: event.target.value }))}
              >
                <option value="">Selecione</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              Status
              <Select
                value={form.status}
                onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              Data inicial
              <Input
                required
                type="date"
                value={form.start_date}
                onChange={(event) => setForm((prev) => ({ ...prev, start_date: event.target.value }))}
              />
            </Field>
            <Field>
              Data final
              <Input
                required
                type="date"
                value={form.end_date}
                onChange={(event) => setForm((prev) => ({ ...prev, end_date: event.target.value }))}
              />
            </Field>
            <Field>
              Formulário para TRIAGEM
              <Select
                disabled={Boolean(editingId)}
                value={form.dynamic_form_id}
                onChange={(event) => setForm((prev) => ({ ...prev, dynamic_form_id: event.target.value }))}
              >
                <option value="">Nenhum</option>
                {forms.map((dynamicForm) => (
                  <option key={dynamicForm.id} value={dynamicForm.id}>
                    {dynamicForm.title}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              Prova para TESTE TÉCNICO
              <Select
                disabled={Boolean(editingId)}
                value={form.dynamic_exam_id}
                onChange={(event) => setForm((prev) => ({ ...prev, dynamic_exam_id: event.target.value }))}
              >
                <option value="">Nenhuma</option>
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.title}
                  </option>
                ))}
              </Select>
            </Field>
          </Grid>

          <Actions>
            <Button tone="brand" type="submit">
              {editingId ? "Salvar" : "Criar processo"}
            </Button>
            <Button type="button" tone="ghost" onClick={resetForm}>
              Limpar
            </Button>
          </Actions>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Processos cadastrados</PanelTitle>
        <Field>
          Filtrar por vaga
          <Select value={selectedJobId} onChange={(event) => { setSelectedJobId(event.target.value); setPage(1); }}>
            <option value="">Todos</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </Select>
        </Field>

        {filteredItems.length === 0 ? (
          <Empty>Nenhum processo encontrado para os filtros aplicados.</Empty>
        ) : (
          <List>
            {filteredItems.map((item) => (
              <Item key={item.id}>
                <ItemTop>
                  <strong>{jobTitleById.get(item.job_posting_id) ?? `Processo #${item.id}`}</strong>
                  <Actions>
                    {item.status === "open" ? (
                      <Button type="button" onClick={() => void changeStatus(item, "closed")}>
                        Encerrar
                      </Button>
                    ) : (
                      <Button type="button" onClick={() => void changeStatus(item, "open")}>
                        {item.status === "closed" ? "Reabrir" : "Abrir"}
                      </Button>
                    )}
                    {item.status === "open" ? (
                      <Button type="button" onClick={() => setPendingAlertId(item.id)}>Alertar compatíveis</Button>
                    ) : null}
                    <Button type="button" onClick={() => void openCriteria(item.id)}>Critérios</Button>
                    <Button
                      type="button"
                      onClick={() => void exportHiringApplicationsCsv(item.id).catch((error) => toast.error(getApiErrorMessage(error, "Não foi possível exportar.")))}
                    >
                      Exportar CSV
                    </Button>
                    <Button type="button" onClick={() => beginEdit(item)}>
                      Editar
                    </Button>
                    <Button type="button" tone="danger" onClick={() => setPendingDeleteId(item.id)}>
                      Excluir
                    </Button>
                  </Actions>
                </ItemTop>
                <Meta>
                  <Badge tone={statusOption(item.status)?.tone ?? "neutral"}>
                    {statusOption(item.status)?.label ?? item.status}
                  </Badge>{" "}
                  · Recrutador: {recruiterNameById.get(item.recruiter_id) ?? `#${item.recruiter_id}`}
                </Meta>
                <Meta>
                  Inicio: {item.start_date?.slice(0, 10) || "-"} · Fim: {item.end_date?.slice(0, 10) || "-"}
                </Meta>
              </Item>
            ))}
          </List>
        )}
      <Pagination pagination={pagination} onChange={setPage} />
      </Panel>

      <ConfirmDialog
        open={criteriaFor !== null}
        title="Critérios de avaliação das entrevistas"
        message="Um critério por linha (de 1 a 10). Cada entrevistador dará nota de 1 a 5 em cada um. Remover um critério apaga as notas dele."
        confirmLabel="Salvar critérios"
        tone="brand"
        confirming={savingCriteria}
        onConfirm={() => void confirmCriteria()}
        onCancel={() => setCriteriaFor(null)}
      >
        <Textarea value={criteriaText} onChange={(event) => setCriteriaText(event.target.value)} rows={6} aria-label="Critérios, um por linha" />
      </ConfirmDialog>

      <ConfirmDialog
        open={pendingAlertId !== null}
        title="Alertar candidatos compatíveis"
        message="Envia um e-mail só para candidatos que têm as habilidades desejadas da vaga (aderência mínima configurada no servidor), aceitam e-mails de oportunidades e ainda não se candidataram. A vaga precisa ter habilidades ou conhecimentos cadastrados."
        confirmLabel="Enviar alerta"
        tone="brand"
        confirming={alerting}
        onConfirm={() => void confirmAlert()}
        onCancel={() => setPendingAlertId(null)}
      />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Excluir processo seletivo"
        message="Essa ação não pode ser desfeita. Candidaturas e etapas vinculadas podem ser afetadas."
        confirming={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setPendingDeleteId(null)}
      />
    </Page>
  );
}
