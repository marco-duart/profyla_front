import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PageSkeleton } from "../../components/PageSkeleton";
import { listHirings } from "../../services/admin/hirings";
import type { AdminHiring } from "../../services/admin/hirings/dto";
import { listJobs } from "../../services/admin/jobs";
import { getMetrics } from "../../services/admin/metrics";
import type { Metrics } from "../../services/admin/metrics/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Actions,
  Button,
  Empty,
  Field,
  FunnelFill,
  FunnelLabelRow,
  FunnelTrack,
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
  StatGrid,
  StatLabel,
  StatTile,
  StatValue,
} from "../StaffKit/styles";

const emptyFilters: Metrics.Filters = { from: "", to: "", hiring_process_id: "" };

const formatDays = (value: number | null) => (value === null ? "-" : `${value.toLocaleString("pt-BR")} d`);

export function StaffMetricsPage() {
  const [filters, setFilters] = useState<Metrics.Filters>(emptyFilters);
  const [applied, setApplied] = useState<Metrics.Filters>(emptyFilters);
  const [data, setData] = useState<Metrics.Response | null>(null);
  const [processes, setProcesses] = useState<{ id: number; label: string }[]>([]);

  useEffect(() => {
    async function loadProcesses() {
      const [hirings, jobs] = await Promise.all([listHirings(), listJobs()]);
      const titleById = new Map(jobs.map((job) => [job.id, job.title]));
      setProcesses(hirings.map((hiring: AdminHiring.Item) => ({ id: hiring.id, label: `${titleById.get(hiring.job_posting_id) ?? "Vaga"} (#${hiring.id})` })));
    }
    void loadProcesses();
  }, []);

  useEffect(() => {
    getMetrics(applied)
      .then(setData)
      .catch((error) => toast.error(getApiErrorMessage(error, "Não foi possível carregar as métricas.")));
  }, [applied]);

  const maxVolume = Math.max(1, ...(data?.by_hiring_process.map((item) => item.applications) ?? [1]));
  const maxDays = Math.max(0.1, ...(data?.stages.map((stage) => stage.average_days ?? 0) ?? [0]));

  return (
    <Page>
      <Hero>
        <h2>Métricas</h2>
        <Lead>Funil de conversão, tempo em cada etapa e volume por vaga, calculados a partir do histórico das candidaturas.</Lead>
      </Hero>

      <Panel>
        <PanelTitle>Filtros</PanelTitle>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setApplied(filters);
          }}
        >
          <Grid>
            <Field>
              Candidaturas desde
              <Input type="date" value={filters.from} onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))} />
            </Field>
            <Field>
              Até
              <Input type="date" value={filters.to} onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))} />
            </Field>
            <Field>
              Processo seletivo
              <Select value={filters.hiring_process_id} onChange={(e) => setFilters((f) => ({ ...f, hiring_process_id: e.target.value }))}>
                <option value="">Todos</option>
                {processes.map((process) => (
                  <option key={process.id} value={process.id}>{process.label}</option>
                ))}
              </Select>
            </Field>
          </Grid>
          <Actions>
            <Button type="submit" tone="brand">Aplicar</Button>
            <Button type="button" tone="ghost" onClick={() => { setFilters(emptyFilters); setApplied(emptyFilters); }}>Limpar</Button>
          </Actions>
        </form>
      </Panel>

      {!data ? <PageSkeleton kit="staff" rows={3} /> : null}

      {data ? (
        <>
          <StatGrid>
            <StatTile><StatLabel>Candidaturas</StatLabel><StatValue>{data.totals.applications}</StatValue></StatTile>
            <StatTile><StatLabel>Contratações</StatLabel><StatValue>{data.totals.hired}</StatValue></StatTile>
            <StatTile featured><StatLabel>Tempo até contratar</StatLabel><StatValue>{formatDays(data.time_to_hire_days)}</StatValue></StatTile>
            <StatTile>
              <StatLabel>Taxa de contratação</StatLabel>
              <StatValue>{data.totals.applications ? `${Math.round((data.totals.hired * 100) / data.totals.applications)}%` : "-"}</StatValue>
            </StatTile>
          </StatGrid>

          <Panel>
            <PanelTitle>Funil de conversão</PanelTitle>
            {data.stages.length === 0 ? <Empty>Sem candidaturas no período.</Empty> : null}
            {data.stages.map((stage) => (
              <div key={stage.title}>
                <FunnelLabelRow>
                  <span>{stage.title}</span>
                  <span>{stage.reached} ({stage.conversion_percent.toLocaleString("pt-BR")}%)</span>
                </FunnelLabelRow>
                <FunnelTrack><FunnelFill style={{ width: `${stage.conversion_percent}%` }} /></FunnelTrack>
              </div>
            ))}
          </Panel>

          <Panel>
            <PanelTitle>Gargalos: tempo médio em cada etapa</PanelTitle>
            <Meta>Considera só permanências já concluídas (a candidatura saiu da etapa).</Meta>
            {data.stages.filter((stage) => stage.average_days !== null).map((stage) => (
              <div key={stage.title}>
                <FunnelLabelRow>
                  <span>{stage.title}</span>
                  <span>{formatDays(stage.average_days)}</span>
                </FunnelLabelRow>
                <FunnelTrack><FunnelFill tone="negative" style={{ width: `${((stage.average_days ?? 0) / maxDays) * 100}%` }} /></FunnelTrack>
              </div>
            ))}
            {data.stages.every((stage) => stage.average_days === null) ? <Empty>Ainda não há permanências concluídas.</Empty> : null}
          </Panel>

          <Panel>
            <PanelTitle>Volume por vaga</PanelTitle>
            <List>
              {data.by_hiring_process.map((item) => (
                <Item key={item.hiring_process_id}>
                  <ItemTop>
                    <strong>{item.job_title}</strong>
                    <Meta>{item.applications} candidatura(s)</Meta>
                  </ItemTop>
                  <FunnelTrack><FunnelFill style={{ width: `${(item.applications / maxVolume) * 100}%` }} /></FunnelTrack>
                </Item>
              ))}
            </List>
            {data.by_hiring_process.length === 0 ? <Empty>Sem candidaturas no período.</Empty> : null}
          </Panel>
        </>
      ) : null}
    </Page>
  );
}
