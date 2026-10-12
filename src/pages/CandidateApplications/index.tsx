import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listCandidateApplications } from "../../services/applications";
import type { ListApplications } from "../../services/applications/dto";
import { PageSkeleton } from "../../components/PageSkeleton";
import { getStatusLabel } from "../../utils/candidate-status";
import { getApiErrorMessage } from "../../utils/api-error";
import { Badge, Button, Empty, Field, Hero, Input, Item, ItemTop, Lead, List, Meta, Page } from "../CandidateKit/styles";

export function CandidateApplicationsPage() {
  const [applications, setApplications] = useState<ListApplications.Item[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setApplications(await listCandidateApplications(search));
        setError("");
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, "Erro ao listar candidaturas."));
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(() => void load(), 250);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Page>
      <Hero>
        <h2>Candidaturas</h2>
        <Lead>Veja onde cada processo está, quais candidaturas foram encerradas e quais ainda exigem sua atenção.</Lead>
        <Field>
          Buscar candidatura
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Vaga ou etapa" />
        </Field>
      </Hero>

      {error ? <p role="alert">{error}</p> : null}
      {loading ? <PageSkeleton kit="candidate" rows={3} /> : null}
      {!loading && !error && applications.length === 0 ? <Empty>Nenhuma candidatura encontrada.</Empty> : null}

      <List>
        {applications.map((application) => (
          <Item key={application.id}>
            <ItemTop>
              <strong>{application.job_name}</strong>
              <Badge tone={application.status_tone}>{getStatusLabel(application.stage)}</Badge>
            </ItemTop>
            <Meta>
              {[application.company_name, application.modality, application.job_location].filter(Boolean).join(" · ")}
            </Meta>
            <Meta>Etapa atual: {application.stage}</Meta>
            <div>
              <Button as={Link} to={`/candidate/applications/${application.id}`}>Abrir acompanhamento</Button>
            </div>
          </Item>
        ))}
      </List>
    </Page>
  );
}
