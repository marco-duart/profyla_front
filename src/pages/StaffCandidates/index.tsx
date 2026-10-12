import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../utils/api-error";
import { PageSkeleton } from "../../components/PageSkeleton";
import type { Pagination as PaginationData } from "../../services/pagination";
import { Pagination } from "../StaffKit/Pagination";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { listAllTags } from "../../services/admin/annotations";
import type { CandidateAnnotation } from "../../services/admin/annotations/dto";
import { exportCandidatesCsv, listCandidatesPage } from "../../services/admin/candidates";
import type { AdminCandidate } from "../../services/admin/candidates/dto";
import {
  Actions,
  Badge,
  Button,
  CardGrid,
  Empty,
  Field,
  Hero,
  Input,
  Select,
  Lead,
  Meta,
  Panel,
  PanelTitle,
  Tag,
  TagRow,
} from "../StaffKit/styles";

export function StaffCandidatesPage() {
  const [candidates, setCandidates] = useState<AdminCandidate.ListItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();
  const [allTags, setAllTags] = useState<CandidateAnnotation.TagCount[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      void listCandidatesPage(page, search || undefined, tag || undefined)
        .then((response) => {
          setCandidates(response.records);
          setPagination(response.pagination);
        })
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timeout);
  }, [search, page, tag]);

  useEffect(() => {
    void listAllTags().then(setAllTags).catch(() => undefined);
  }, []);

  function toggleSelected(id: number) {
    setSelected((current) => (current.includes(id) ? current.filter((value) => value !== id) : current.length < 4 ? [...current, id] : current));
  }

  return (
    <section style={{ display: "grid", gap: "20px" }}>
      <Hero>
        <div>
          <PanelTitle>Candidatos</PanelTitle>
          <Lead>
            Currículos, habilidades e perfis comportamentais em um só lugar. Busque por nome ou e-mail
            para abrir o perfil completo de um candidato.
          </Lead>
        </div>
      </Hero>

      <Field>
        <FiSearch style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
        Buscar candidato
        <Input
          value={search}
          onChange={(event) => { setSearch(event.target.value); setPage(1); }}
          placeholder="Nome ou e-mail"
        />
      </Field>

      <Field>
        Filtrar por tag
        <Select value={tag} onChange={(event) => { setTag(event.target.value); setPage(1); }}>
          <option value="">Todas</option>
          {allTags.map((entry) => (
            <option key={entry.name} value={entry.name}>{entry.name} ({entry.count})</option>
          ))}
        </Select>
      </Field>

      {loading ? (
        <PageSkeleton kit="staff" rows={3} />
      ) : candidates.length === 0 ? (
        <Empty>Nenhum candidato encontrado.</Empty>
      ) : (
        <CardGrid>
          {candidates.map((candidate) => (
            <div key={candidate.id} style={{ position: "relative" }}>
            <label style={{ position: "absolute", top: 12, right: 12, zIndex: 1, display: "flex", gap: "6px", alignItems: "center", fontSize: "13px" }}>
              <input
                type="checkbox"
                checked={selected.includes(candidate.id)}
                disabled={!selected.includes(candidate.id) && selected.length >= 4}
                onChange={() => toggleSelected(candidate.id)}
              />
              Comparar
            </label>
            <Link to={`/staff/candidates/${candidate.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Panel style={{ cursor: "pointer", height: "100%" }}>
                <div>
                  <strong>{candidate.name}</strong>
                  <Meta>{candidate.email}</Meta>
                </div>

                {candidate.resume ? (
                  <Meta
                    css={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {candidate.resume}
                  </Meta>
                ) : null}

                {candidate.skills.length > 0 ? (
                  <TagRow>
                    {candidate.skills.slice(0, 4).map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                    {candidate.skills.length > 4 ? <Tag>+{candidate.skills.length - 4}</Tag> : null}
                  </TagRow>
                ) : null}

                {candidate.tags.length > 0 ? (
                  <TagRow>
                    {candidate.tags.map((entry) => <Badge key={entry} tone="warning">#{entry}</Badge>)}
                  </TagRow>
                ) : null}

                <TagRow>
                  <Badge tone="neutral">{candidate.applications_count} candidatura(s)</Badge>
                  {candidate.disc_label ? <Badge tone="positive">DISC: {candidate.disc_label}</Badge> : null}
                  {candidate.eneagrama_label ? <Badge tone="positive">Eneagrama: {candidate.eneagrama_label}</Badge> : null}
                </TagRow>
              </Panel>
            </Link>
            </div>
          ))}
        </CardGrid>
      )}
      <Pagination pagination={pagination} loading={loading} onChange={setPage} />
      <Actions>
        <Button type="button" onClick={() => void exportCandidatesCsv(search, tag).catch((error) => toast.error(getApiErrorMessage(error, "Não foi possível exportar.")))}>
          Exportar CSV (filtros atuais)
        </Button>
      </Actions>

      {selected.length > 0 ? (
        <Actions
          role="region"
          aria-label="Comparação"
          css={{ position: "sticky", bottom: "16px", padding: "$3", border: "1px solid $border", backgroundColor: "$canvasAlt", alignItems: "center" }}
        >
          <Meta>{selected.length} selecionado(s) (máx. 4)</Meta>
          <Button type="button" tone="brand" disabled={selected.length < 2} onClick={() => navigate(`/staff/candidates/compare?ids=${selected.join(",")}`)}>
            Comparar
          </Button>
          <Button type="button" tone="ghost" onClick={() => setSelected([])}>Limpar seleção</Button>
        </Actions>
      ) : null}
    </section>
  );
}
