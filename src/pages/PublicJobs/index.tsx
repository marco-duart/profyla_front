import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { PageSkeleton } from "../../components/PageSkeleton";
import { PublicLayout } from "../../components/PublicLayout";
import { usePageMeta } from "../../hooks/usePageMeta";
import { listPublicJobs } from "../../services/public";
import type { PublicJobs } from "../../services/public/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { formatCurrency } from "../../utils/masks";
import { Badge, Button, CardGrid, Empty, Field, Hero, Input, Lead, Meta, Page, Panel, PanelTitle, TagRow } from "../CandidateKit/styles";

export function PublicJobsPage() {
  usePageMeta("Vagas abertas", "Encontre vagas abertas e candidate-se pelo Profyla.");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PublicJobs.List | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      listPublicJobs({ search, page })
        .then(setData)
        .catch((error) => toast.error(getApiErrorMessage(error, "Não foi possível carregar as vagas.")));
    }, 250);
    return () => clearTimeout(timeout);
  }, [search, page]);

  return (
    <PublicLayout>
      <Page>
        <Hero>
          <h1>Vagas abertas</h1>
          <Lead>Veja as oportunidades e candidate-se. Para enviar sua candidatura é preciso entrar ou criar uma conta gratuita.</Lead>
          <Field>
            Buscar vaga
            <Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Título da vaga" />
          </Field>
        </Hero>

        {!data ? <PageSkeleton kit="candidate" rows={3} /> : null}
        {data && data.records.length === 0 ? <Empty>Nenhuma vaga aberta encontrada.</Empty> : null}

        <CardGrid>
          {data?.records.map((job) => (
            <Panel key={job.id}>
              <PanelTitle>{job.title}</PanelTitle>
              <Meta><Link to={`/empresas/${job.company.id}/vagas`}>{job.company.name}</Link></Meta>
              <TagRow>
                {job.modality ? <Badge>{job.modality}</Badge> : null}
                {job.location ? <Badge>{job.location}</Badge> : null}
                {job.regime ? <Badge>{job.regime}</Badge> : null}
              </TagRow>
              {job.salary ? <Meta>Faixa salarial: {formatCurrency(job.salary)}</Meta> : null}
              <Meta>{job.excerpt}</Meta>
              <div><Button as={Link} tone="brand" to={`/vagas/${job.id}`}>Ver vaga</Button></div>
            </Panel>
          ))}
        </CardGrid>

        {data && data.pagination.total_pages > 1 ? (
          <TagRow role="navigation" aria-label="Paginação">
            <Button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</Button>
            <Meta>Página {data.pagination.page} de {data.pagination.total_pages}</Meta>
            <Button type="button" disabled={page >= data.pagination.total_pages} onClick={() => setPage(page + 1)}>Próxima</Button>
          </TagRow>
        ) : null}
      </Page>
    </PublicLayout>
  );
}
