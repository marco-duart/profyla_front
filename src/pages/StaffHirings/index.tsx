import { type FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { listExams } from "../../services/admin/exams";
import type { AdminExam } from "../../services/admin/exams/dto";
import { createHiring, deleteHiring, listHirings, updateHiring } from "../../services/admin/hirings";
import type { AdminHiring } from "../../services/admin/hirings/dto";
import { listJobs } from "../../services/admin/jobs";
import type { AdminJob } from "../../services/admin/jobs/dto";
import { listForms } from "../../services/admin/forms";
import type { AdminForm } from "../../services/admin/forms/dto";
import { listRecruiters } from "../../services/admin/recruiters";
import type { AdminRecruiter } from "../../services/admin/recruiters/dto";
import { getApiErrorMessage } from "../../utils/api-error";
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
} from "../StaffKit/styles";

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
  status: "ativo",
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
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  async function loadData() {
    const [hiringsResponse, jobsResponse, formsResponse, examsResponse, recruitersResponse] = await Promise.all([
      listHirings(),
      listJobs(),
      listForms(),
      listExams(),
      listRecruiters(),
    ]);

    setItems(hiringsResponse);
    setJobs(jobsResponse);
    setForms(formsResponse);
    setExams(examsResponse);
    setRecruiters(recruitersResponse);
  }

  useEffect(() => {
    void loadData();
  }, []);

  const filteredItems = useMemo(() => {
    if (!selectedJobId) {
      return items;
    }

    return items.filter((item) => item.job_posting_id === Number(selectedJobId));
  }, [items, selectedJobId]);

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

  async function handleDelete(id: number) {
    if (!window.confirm("Confirma exclusao do processo seletivo?")) {
      return;
    }

    try {
      await deleteHiring(id);
      toast.success("Processo removido.");
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao remover processo."));
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Processos seletivos</h2>
        <Lead>
          Uma vaga pode gerar varios processos. Configure periodo, status e vincule formulario/prova para automatizar as etapas.
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
              <Input
                required
                value={form.status}
                onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              />
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
              Formulario para TRIAGEM
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
              Prova para TESTE TECNICO
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
          <Select value={selectedJobId} onChange={(event) => setSelectedJobId(event.target.value)}>
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
                    <Button type="button" onClick={() => beginEdit(item)}>
                      Editar
                    </Button>
                    <Button type="button" tone="danger" onClick={() => void handleDelete(item.id)}>
                      Excluir
                    </Button>
                  </Actions>
                </ItemTop>
                <Meta>
                  Status: {item.status} · Recrutador: {recruiterNameById.get(item.recruiter_id) ?? `#${item.recruiter_id}`}
                </Meta>
                <Meta>
                  Inicio: {item.start_date?.slice(0, 10) || "-"} · Fim: {item.end_date?.slice(0, 10) || "-"}
                </Meta>
              </Item>
            ))}
          </List>
        )}
      </Panel>
    </Page>
  );
}
