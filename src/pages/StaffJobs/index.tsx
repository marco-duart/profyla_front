import { type FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { listCompanies } from "../../services/admin/companies";
import type { AdminCompany } from "../../services/admin/companies/dto";
import { createJob, deleteJob, listJobs, updateJob } from "../../services/admin/jobs";
import type { AdminJob } from "../../services/admin/jobs/dto";
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
  Textarea,
} from "../StaffKit/styles";

type JobFormState = {
  company_id: string;
  title: string;
  description: string;
  requirements: string;
  job_location: string;
  regime: string;
  modality: string;
  salary: string;
  work_schedule: string;
  start_date: string;
  end_date: string;
};

const emptyForm: JobFormState = {
  company_id: "",
  title: "",
  description: "",
  requirements: "",
  job_location: "",
  regime: "",
  modality: "",
  salary: "",
  work_schedule: "",
  start_date: "",
  end_date: "",
};

export function StaffJobsPage() {
  const [jobs, setJobs] = useState<AdminJob.Item[]>([]);
  const [companies, setCompanies] = useState<AdminCompany.Item[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [form, setForm] = useState<JobFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadData() {
    const [jobsResponse, companiesResponse] = await Promise.all([listJobs(), listCompanies()]);
    setJobs(jobsResponse);
    setCompanies(companiesResponse);
  }

  useEffect(() => {
    void loadData();
  }, []);

  const filteredJobs = useMemo(() => {
    if (!selectedCompanyId) {
      return jobs;
    }

    return jobs.filter((job) => job.company_id === Number(selectedCompanyId));
  }, [jobs, selectedCompanyId]);

  function beginEdit(item: AdminJob.Item) {
    setEditingId(item.id);
    setForm({
      company_id: String(item.company_id),
      title: item.title,
      description: item.description ?? "",
      requirements: item.requirements ?? "",
      job_location: item.job_location ?? "",
      regime: item.regime ?? "",
      modality: item.modality ?? "",
      salary: item.salary ?? "",
      work_schedule: item.work_schedule ?? "",
      start_date: item.start_date?.slice(0, 10) ?? "",
      end_date: item.end_date?.slice(0, 10) ?? "",
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
        company_id: Number(form.company_id),
        title: form.title,
        description: form.description,
        requirements: form.requirements,
        job_location: form.job_location,
        regime: form.regime,
        modality: form.modality,
        salary: form.salary,
        work_schedule: form.work_schedule,
        start_date: form.start_date || undefined,
        end_date: form.end_date || undefined,
      };

      if (editingId) {
        await updateJob(editingId, payload);
        toast.success("Vaga atualizada.");
      } else {
        await createJob(payload);
        toast.success("Vaga criada.");
      }

      resetForm();
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao salvar vaga."));
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Confirma exclusao da vaga?")) {
      return;
    }

    try {
      await deleteJob(id);
      toast.success("Vaga removida.");
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao excluir vaga."));
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Vagas</h2>
        <Lead>Gerencie vagas pre-cadastradas e depois conecte cada uma a processos seletivos especificos.</Lead>
      </Hero>

      <Panel>
        <PanelTitle>{editingId ? "Editar vaga" : "Nova vaga"}</PanelTitle>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Field>
              Empresa
              <Select
                required
                value={form.company_id}
                onChange={(event) => setForm((prev) => ({ ...prev, company_id: event.target.value }))}
              >
                <option value="">Selecione</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.company_name} ({company.cnpj})
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              Titulo da vaga
              <Input
                required
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              />
            </Field>
            <Field>
              Local
              <Input
                value={form.job_location}
                onChange={(event) => setForm((prev) => ({ ...prev, job_location: event.target.value }))}
              />
            </Field>
            <Field>
              Modalidade
              <Input
                value={form.modality}
                onChange={(event) => setForm((prev) => ({ ...prev, modality: event.target.value }))}
              />
            </Field>
            <Field>
              Regime
              <Input
                value={form.regime}
                onChange={(event) => setForm((prev) => ({ ...prev, regime: event.target.value }))}
              />
            </Field>
            <Field>
              Faixa salarial
              <Input
                value={form.salary}
                onChange={(event) => setForm((prev) => ({ ...prev, salary: event.target.value }))}
              />
            </Field>
            <Field>
              Jornada
              <Input
                value={form.work_schedule}
                onChange={(event) => setForm((prev) => ({ ...prev, work_schedule: event.target.value }))}
              />
            </Field>
            <Field>
              Inicio
              <Input
                type="date"
                value={form.start_date}
                onChange={(event) => setForm((prev) => ({ ...prev, start_date: event.target.value }))}
              />
            </Field>
            <Field>
              Encerramento
              <Input
                type="date"
                value={form.end_date}
                onChange={(event) => setForm((prev) => ({ ...prev, end_date: event.target.value }))}
              />
            </Field>
          </Grid>

          <Field>
            Descricao
            <Textarea
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            />
          </Field>

          <Field>
            Requisitos
            <Textarea
              value={form.requirements}
              onChange={(event) => setForm((prev) => ({ ...prev, requirements: event.target.value }))}
            />
          </Field>

          <Actions>
            <Button tone="brand" type="submit">
              {editingId ? "Salvar edicao" : "Criar vaga"}
            </Button>
            <Button type="button" tone="ghost" onClick={resetForm}>
              Limpar
            </Button>
          </Actions>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Lista de vagas</PanelTitle>
        <Field>
          Filtrar por empresa
          <Select value={selectedCompanyId} onChange={(event) => setSelectedCompanyId(event.target.value)}>
            <option value="">Todas</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.company_name}
              </option>
            ))}
          </Select>
        </Field>

        {filteredJobs.length === 0 ? (
          <Empty>Nenhuma vaga encontrada para o filtro aplicado.</Empty>
        ) : (
          <List>
            {filteredJobs.map((job) => (
              <Item key={job.id}>
                <ItemTop>
                  <strong>{job.title}</strong>
                  <Actions>
                    <Button type="button" onClick={() => beginEdit(job)}>
                      Editar
                    </Button>
                    <Button type="button" tone="danger" onClick={() => void handleDelete(job.id)}>
                      Excluir
                    </Button>
                  </Actions>
                </ItemTop>
                <Meta>
                  Empresa ID: {job.company_id} · {job.modality || "Modalidade nao informada"} · {job.job_location || "Sem local"}
                </Meta>
                {job.salary ? <Meta>Faixa: {job.salary}</Meta> : null}
              </Item>
            ))}
          </List>
        )}
      </Panel>
    </Page>
  );
}
