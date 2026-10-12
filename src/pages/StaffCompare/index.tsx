import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { PageSkeleton } from "../../components/PageSkeleton";
import { getCandidate } from "../../services/admin/candidates";
import type { AdminCandidate } from "../../services/admin/candidates/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { formatDate } from "../../utils/format";
import { Badge, Button, Empty, Hero, Lead, Meta, Page, Panel, PanelTitle, TagRow } from "../StaffKit/styles";

const MAX = 4;

type Row = { label: string; cell: (candidate: AdminCandidate.Detail, all: AdminCandidate.Detail[]) => React.ReactNode };

const latestEmployment = (c: AdminCandidate.Detail) =>
  [...c.employment_histories].sort((a, b) => (b.start_date ?? "").localeCompare(a.start_date ?? ""))[0];

// Skills shared by everyone are shown plain; the ones that set a candidate apart are highlighted.
function skillsCell(candidate: AdminCandidate.Detail, all: AdminCandidate.Detail[]) {
  const names = candidate.skills.map((skill) => skill.title);
  if (names.length === 0) return <Meta>-</Meta>;
  return (
    <TagRow>
      {names.map((name) => {
        const everyone = all.every((other) => other.skills.some((skill) => skill.title === name));
        return <Badge key={name} tone={everyone ? "neutral" : "positive"}>{name}</Badge>;
      })}
    </TagRow>
  );
}

const ROWS: Row[] = [
  { label: "Cidade", cell: (c) => c.address_city || "-" },
  { label: "Resumo", cell: (c) => <span style={{ whiteSpace: "pre-line" }}>{c.resume || "-"}</span> },
  { label: "Habilidades", cell: skillsCell },
  { label: "Conhecimentos", cell: (c) => (c.knowledges.length ? c.knowledges.map((k) => k.title).join(", ") : "-") },
  {
    label: "Formação",
    cell: (c) => (c.academic_histories.length ? c.academic_histories.map((a) => [a.degree, a.title].filter(Boolean).join(" ")).join(" · ") : "-"),
  },
  {
    label: "Experiência",
    cell: (c) => {
      const last = latestEmployment(c);
      return c.employment_histories.length ? `${c.employment_histories.length} experiência(s); última: ${last?.position ?? "-"} em ${last?.company_name ?? "-"}` : "-";
    },
  },
  {
    label: "DISC",
    cell: (c) => (c.disc_assessment?.latest ? `${c.disc_assessment.latest.profile.label} (${formatDate(c.disc_assessment.latest.completed_at)})` : "-"),
  },
  {
    label: "Eneagrama",
    cell: (c) => (c.eneagrama_assessment?.latest ? `${c.eneagrama_assessment.latest.profile.label} (${formatDate(c.eneagrama_assessment.latest.completed_at)})` : "-"),
  },
  {
    label: "Candidaturas",
    cell: (c) =>
      c.applications.length ? (
        <TagRow css={{ flexDirection: "column", alignItems: "flex-start" }}>
          {c.applications.map((a) => (
            <span key={a.id}>
              {a.job_name} <Badge tone={a.status_tone}>{a.stage}</Badge>
              {a.match_score != null ? <Meta>Aderência {a.match_score}%</Meta> : null}
              {a.scorecard?.average != null ? <Meta>Entrevistas: {a.scorecard.average.toLocaleString("pt-BR")}/5</Meta> : null}
            </span>
          ))}
        </TagRow>
      ) : (
        "-"
      ),
  },
  { label: "Tags", cell: (c) => (c.tags?.length ? c.tags.map((t) => `#${t}`).join(" ") : "-") },
];

export function StaffComparePage() {
  const [searchParams] = useSearchParams();
  const ids = useMemo(
    () => (searchParams.get("ids") ?? "").split(",").map(Number).filter((id) => Number.isInteger(id) && id > 0).slice(0, MAX),
    [searchParams],
  );
  const [candidates, setCandidates] = useState<AdminCandidate.Detail[] | null>(null);

  useEffect(() => {
    if (ids.length < 2) return;
    Promise.all(ids.map((id) => getCandidate(id)))
      .then(setCandidates)
      .catch((error) => toast.error(getApiErrorMessage(error, "Erro ao carregar os candidatos.")));
  }, [ids]);

  return (
    <Page>
      <Button as={Link} to="/staff/candidates"><FiArrowLeft /> Voltar para candidatos</Button>
      <Hero>
        <h2>Comparar candidatos</h2>
        <Lead>Lado a lado: currículo resumido, habilidades (destacadas as que diferenciam), perfis comportamentais e etapa. Testes comportamentais não devem ser critério único de eliminação.</Lead>
      </Hero>

      {ids.length < 2 ? <Empty>Selecione de 2 a {MAX} candidatos na lista para compará-los.</Empty> : null}
      {ids.length >= 2 && !candidates ? <PageSkeleton kit="staff" rows={3} /> : null}

      {candidates ? (
        <Panel css={{ overflowX: "auto", padding: 0 }}>
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: `${180 + candidates.length * 240}px`, tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th scope="col" style={{ width: 150, textAlign: "left", padding: 12 }}><Meta>Critério</Meta></th>
                {candidates.map((candidate) => (
                  <th key={candidate.id} scope="col" style={{ textAlign: "left", padding: 12, verticalAlign: "top" }}>
                    <PanelTitle>{candidate.name}</PanelTitle>
                    <Meta>{candidate.email}</Meta>
                    <Button as={Link} tone="ghost" to={`/staff/candidates/${candidate.id}`}>Abrir perfil</Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} style={{ borderTop: "1px solid var(--colors-border, rgba(255,255,255,0.12))" }}>
                  <th scope="row" style={{ textAlign: "left", padding: 12, verticalAlign: "top" }}><Meta>{row.label}</Meta></th>
                  {candidates.map((candidate) => (
                    <td key={candidate.id} style={{ padding: 12, verticalAlign: "top" }}>{row.cell(candidate, candidates)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      ) : null}
    </Page>
  );
}
