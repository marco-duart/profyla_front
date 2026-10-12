import { listKnowledgesCatalog, listSkillsCatalog, type CatalogEntry } from "../../services/admin/catalog";
import type { Pagination as PaginationData } from "../../services/pagination";
import { Pagination } from "../StaffKit/Pagination";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { listCompanies } from "../../services/admin/companies";
import type { AdminCompany } from "../../services/admin/companies/dto";
import { createJob, deleteJob, listJobsPage, updateJob } from "../../services/admin/jobs";
import type { AdminJob } from "../../services/admin/jobs/dto";
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
  Chip,
  ChipRow,
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

// Click a chip to want it; click again to make it required (*), once more to drop it.
function RequirementPicker({ label, catalog, wanted, onChange }: {
  label: string;
  catalog: CatalogEntry[];
  wanted: Map<number, boolean>;
  onChange: (next: Map<number, boolean>) => void;
}) {
  function cycle(id: number) {
    const next = new Map(wanted);
    if (!next.has(id)) next.set(id, false);
    else if (next.get(id) === false) next.set(id, true);
    else next.delete(id);
    onChange(next);
  }

  return (
    <Field as="div">
      {label}
      <Meta>Toque para desejar; toque de novo para tornar obrigatória (*, vale o dobro no cálculo de aderência).</Meta>
      <ChipRow>
        {catalog.map((entry) => (
          <Chip key={entry.id} type="button" selected={wanted.has(entry.id)} required={wanted.get(entry.id) === true} aria-pressed={wanted.has(entry.id)} onClick={() => cycle(entry.id)}>
            {entry.title}{wanted.get(entry.id) ? " *" : ""}
          </Chip>
        ))}
        {catalog.length === 0 ? <Meta>Nenhum item no catálogo.</Meta> : null}
      </ChipRow>
    </Field>
  );
}

export function StaffJobsPage() {
  const [jobs, setJobs] = useState<AdminJob.Item[]>([]);
  const [companies, setCompanies] = useState<AdminCompany.Item[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [form, setForm] = useState<JobFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [skillsCatalog, setSkillsCatalog] = useState<CatalogEntry[]>([]);
  const [knowledgesCatalog, setKnowledgesCatalog] = useState<CatalogEntry[]>([]);
  // id -> required?  (present = wanted by the job; true = hard requirement, counts double in the fit score)
  const [wantedSkills, setWantedSkills] = useState<Map<number, boolean>>(new Map());
  const [wantedKnowledges, setWantedKnowledges] = useState<Map<number, boolean>>(new Map());
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  // The company list is small and needed for names/selects; the jobs list is paged on the server
  // (and filtered there by company).
  async function loadData(targetPage = page) {
    const [jobsResponse, companiesResponse] = await Promise.all([
      listJobsPage(targetPage, selectedCompanyId ? Number(selectedCompanyId) : undefined),
      listCompanies(),
    ]);
    if (jobsResponse.records.length === 0 && targetPage > 1) {
      setPage(targetPage - 1);
      return;
    }
    setJobs(jobsResponse.records);
    setPagination(jobsResponse.pagination);
    setCompanies(companiesResponse);
  }

  useEffect(() => {
    void listSkillsCatalog().then(setSkillsCatalog);
    void listKnowledgesCatalog().then(setKnowledgesCatalog);
  }, []);

  useEffect(() => {
    void loadData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedCompanyId]);

  const filteredJobs = jobs;

  const companyNameById = useMemo(() => {
    const map = new Map<number, string>();
    for (const company of companies) map.set(company.id, company.company_name);
    return map;
  }, [companies]);

  function beginEdit(item: AdminJob.Item) {
    setEditingId(item.id);
    setWantedSkills(new Map((item.skills ?? []).map((entry) => [entry.id, entry.required])));
    setWantedKnowledges(new Map((item.knowledges ?? []).map((entry) => [entry.id, entry.required])));
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
    setWantedSkills(new Map());
    setWantedKnowledges(new Map());
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
        skill_ids: [...wantedSkills.keys()],
        required_skill_ids: [...wantedSkills].filter(([, required]) => required).map(([id]) => id),
        knowledge_ids: [...wantedKnowledges.keys()],
        required_knowledge_ids: [...wantedKnowledges].filter(([, required]) => required).map(([id]) => id),
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

  async function confirmDelete() {
    if (!pendingDeleteId) return;
    setDeleting(true);

    try {
      await deleteJob(pendingDeleteId);
      toast.success("Vaga removida.");
      setPendingDeleteId(null);
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao excluir vaga."));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Vagas</h2>
        <Lead>Gerencie vagas pré-cadastradas e depois conecte cada uma a processos seletivos específicos.</Lead>
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
              Título da vaga
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
                placeholder="Ex.: R$ 4.000 a R$ 6.000"
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
            Descrição
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

          <RequirementPicker
            label="Habilidades desejadas"
            catalog={skillsCatalog}
            wanted={wantedSkills}
            onChange={setWantedSkills}
          />
          <RequirementPicker
            label="Conhecimentos desejados"
            catalog={knowledgesCatalog}
            wanted={wantedKnowledges}
            onChange={setWantedKnowledges}
          />

          <Actions>
            <Button tone="brand" type="submit">
              {editingId ? "Salvar edição" : "Criar vaga"}
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
          <Select value={selectedCompanyId} onChange={(event) => { setSelectedCompanyId(event.target.value); setPage(1); }}>
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
                    <Button type="button" tone="danger" onClick={() => setPendingDeleteId(job.id)}>
                      Excluir
                    </Button>
                  </Actions>
                </ItemTop>
                <Meta>
                  {companyNameById.get(job.company_id) ?? "Empresa não encontrada"} · {job.modality || "Modalidade não informada"} · {job.job_location || "Sem local"}
                </Meta>
                {job.salary ? <Meta>Faixa: {job.salary}</Meta> : null}
                {(job.skills?.length ?? 0) + (job.knowledges?.length ?? 0) > 0 ? (
                  <Meta>
                    Procura: {[...(job.skills ?? []), ...(job.knowledges ?? [])].map((entry) => `${entry.title}${entry.required ? "*" : ""}`).join(", ")}
                  </Meta>
                ) : null}
              </Item>
            ))}
          </List>
        )}
        <Pagination pagination={pagination} onChange={setPage} />
      </Panel>

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Excluir vaga"
        message="Essa ação não pode ser desfeita. Processos seletivos vinculados podem ser afetados."
        confirming={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setPendingDeleteId(null)}
      />
    </Page>
  );
}
