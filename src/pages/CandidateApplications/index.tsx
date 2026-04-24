import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listCandidateApplications } from "../../services/applications";
import type { ListApplications } from "../../services/applications/dto";
import { getStatusLabel } from "../../utils/candidate-status";
import { getApiErrorMessage } from "../../utils/api-error";
import { DetailLink, Header, Item, ItemTop, Lead, List, Meta, SearchInput, StatusPill } from "./styles";

export function CandidateApplicationsPage() {
  const [applications, setApplications] = useState<ListApplications.Item[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const response = await listCandidateApplications(search);
        setApplications(response);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, "Erro ao listar candidaturas."));
      }
    }

    void load();
  }, [search]);

  return (
    <section>
      <Header>
        <h2>Candidaturas</h2>
        <Lead>Veja onde cada processo esta, quais candidaturas foram encerradas e quais ainda exigem sua atencao.</Lead>
        <SearchInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por vaga ou etapa"
        />
      </Header>

      {error ? <p>{error}</p> : null}

      <List>
        {applications.map((application) => (
          <Item key={application.id}>
            <ItemTop>
              <strong>{application.job_name}</strong>
              <StatusPill>{getStatusLabel(application.stage)}</StatusPill>
            </ItemTop>
            <Meta>
              <span>{application.company_name}</span>
              {application.modality ? <span>{application.modality}</span> : null}
              {application.job_location ? <span>{application.job_location}</span> : null}
            </Meta>
            <div>
              <span>Etapa atual: {application.stage}</span>
            </div>
            <Link to={`/candidate/applications/${application.id}`}>
              <DetailLink>Abrir acompanhamento</DetailLink>
            </Link>
          </Item>
        ))}
      </List>
    </section>
  );
}
