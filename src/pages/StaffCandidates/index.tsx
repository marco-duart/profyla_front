import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { listCandidates } from "../../services/admin/candidates";
import type { AdminCandidate } from "../../services/admin/candidates/dto";
import {
  Badge,
  CardGrid,
  Empty,
  Field,
  Hero,
  Input,
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

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      void listCandidates(search || undefined)
        .then(setCandidates)
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timeout);
  }, [search]);

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
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Nome ou e-mail"
        />
      </Field>

      {loading ? (
        <p>Carregando...</p>
      ) : candidates.length === 0 ? (
        <Empty>Nenhum candidato encontrado.</Empty>
      ) : (
        <CardGrid>
          {candidates.map((candidate) => (
            <Link key={candidate.id} to={`/staff/candidates/${candidate.id}`} style={{ textDecoration: "none", color: "inherit" }}>
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

                <TagRow>
                  <Badge tone="neutral">{candidate.applications_count} candidatura(s)</Badge>
                  {candidate.disc_label ? <Badge tone="positive">DISC: {candidate.disc_label}</Badge> : null}
                  {candidate.eneagrama_label ? <Badge tone="positive">Eneagrama: {candidate.eneagrama_label}</Badge> : null}
                </TagRow>
              </Panel>
            </Link>
          ))}
        </CardGrid>
      )}
    </section>
  );
}
