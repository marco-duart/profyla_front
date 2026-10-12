import { PageSkeleton } from "../../components/PageSkeleton";
import { formatDateTime } from "../../utils/format";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { listAuditLogs } from "../../services/admin/audit-logs";
import type { AuditLog } from "../../services/admin/audit-logs/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Actions,
  Badge,
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

const ACTION_LABELS: Record<string, { label: string; tone: "neutral" | "positive" | "negative" | "warning" }> = {
  "candidate.viewed": { label: "Perfil de candidato visto", tone: "neutral" },
  "application.stage_changed": { label: "Etapa alterada", tone: "warning" },
  "user.banned": { label: "Usuário banido", tone: "negative" },
  "user.unbanned": { label: "Usuário desbanido", tone: "positive" },
  "account.anonymized": { label: "Conta anonimizada", tone: "negative" },
  "account.exported": { label: "Dados exportados", tone: "neutral" },
  "document.downloaded": { label: "Arquivo baixado", tone: "warning" },
  "candidate.note_added": { label: "Nota interna adicionada", tone: "neutral" },
  "candidate.note_removed": { label: "Nota interna removida", tone: "warning" },
  "candidate.tags_changed": { label: "Tags alteradas", tone: "neutral" },
  "data.exported": { label: "Exportação (CSV)", tone: "warning" },
};

const ROLE_LABELS: Record<string, string> = { admin: "Recrutador", ti: "TI", user: "Candidato" };

const emptyFilters = { action_name: "", actor_user_id: "", subject_id: "", from: "", to: "" };


function describeMetadata(metadata: AuditLog.Item["metadata"]): string {
  if (!metadata) return "";
  return Object.entries(metadata)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(" · ");
}

export function StaffAuditLogsPage() {
  const [filters, setFilters] = useState(emptyFilters);
  const [applied, setApplied] = useState(emptyFilters);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<AuditLog.Response | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await listAuditLogs({ ...applied, page, per_page: 20 }));
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível carregar o log de auditoria."));
    } finally {
      setLoading(false);
    }
  }, [applied, page]);

  useEffect(() => {
    void load();
  }, [load]);

  function handleFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setApplied(filters);
  }

  function handleClear() {
    setFilters(emptyFilters);
    setApplied(emptyFilters);
    setPage(1);
  }

  const pagination = data?.pagination;

  return (
    <Page>
      <Hero>
        <h2>Auditoria</h2>
        <Lead>Quem viu ou alterou dados de candidatos, e quando. Os registros não podem ser editados.</Lead>
      </Hero>

      <Panel>
        <PanelTitle>Filtros</PanelTitle>
        <form onSubmit={handleFilter}>
          <Grid>
            <Field>
              Ação
              <Select value={filters.action_name} onChange={(e) => setFilters((f) => ({ ...f, action_name: e.target.value }))}>
                <option value="">Todas</option>
                {Object.entries(ACTION_LABELS).map(([value, { label }]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </Select>
            </Field>
            <Field>
              ID do usuário que agiu
              <Input inputMode="numeric" value={filters.actor_user_id} onChange={(e) => setFilters((f) => ({ ...f, actor_user_id: e.target.value }))} />
            </Field>
            <Field>
              ID do usuário afetado
              <Input inputMode="numeric" value={filters.subject_id} onChange={(e) => setFilters((f) => ({ ...f, subject_id: e.target.value }))} />
            </Field>
            <Field>
              De
              <Input type="date" value={filters.from} onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))} />
            </Field>
            <Field>
              Até
              <Input type="date" value={filters.to} onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))} />
            </Field>
          </Grid>
          <Actions>
            <Button type="submit" tone="brand">Filtrar</Button>
            <Button type="button" tone="ghost" onClick={handleClear}>Limpar</Button>
          </Actions>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Registros {pagination ? `(${pagination.total_count})` : ""}</PanelTitle>
        {loading && !data ? <PageSkeleton kit="staff" rows={3} /> : null}
        {data && data.records.length === 0 ? <Empty>Nenhum registro para esses filtros.</Empty> : null}
        <List>
          {data?.records.map((log) => {
            const action = ACTION_LABELS[log.action] ?? { label: log.action, tone: "neutral" as const };
            return (
              <Item key={log.id}>
                <ItemTop>
                  <Badge tone={action.tone}>{action.label}</Badge>
                  <Meta>{formatDateTime(log.created_at)}</Meta>
                </ItemTop>
                <Meta>
                  Por: {log.actor ? `${log.actor.name} (${ROLE_LABELS[log.actor.role] ?? log.actor.role}, #${log.actor.id})` : "sistema"}
                  {log.subject_type ? ` · Alvo: ${log.subject_type} #${log.subject_id}` : ""}
                  {log.ip ? ` · IP ${log.ip}` : ""}
                </Meta>
                {log.metadata ? <Meta>{describeMetadata(log.metadata)}</Meta> : null}
              </Item>
            );
          })}
        </List>
        {pagination && pagination.total_pages > 1 ? (
          <Actions>
            <Button type="button" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)}>Anterior</Button>
            <Meta>Página {pagination.page} de {pagination.total_pages}</Meta>
            <Button type="button" disabled={page >= pagination.total_pages || loading} onClick={() => setPage((p) => p + 1)}>Próxima</Button>
          </Actions>
        ) : null}
      </Panel>
    </Page>
  );
}
