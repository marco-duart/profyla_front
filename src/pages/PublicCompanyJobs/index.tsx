import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { PageSkeleton } from "../../components/PageSkeleton";
import { PublicLayout } from "../../components/PublicLayout";
import { usePageMeta } from "../../hooks/usePageMeta";
import { getPublicCompanyJobs } from "../../services/public";
import type { PublicJobs } from "../../services/public/dto";
import { Badge, Button, CardGrid, Empty, Hero, Lead, Meta, Page, Panel, PanelTitle, TagRow } from "../CandidateKit/styles";

export function PublicCompanyJobsPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PublicJobs.CompanyPage | null>(null);
  const [failed, setFailed] = useState(false);
  usePageMeta(data ? `Vagas na ${data.company.name}` : undefined);

  useEffect(() => {
    if (!id) return;
    getPublicCompanyJobs(Number(id)).then(setData).catch(() => setFailed(true));
  }, [id]);

  const back = <Button as={Link} to="/vagas"><FiArrowLeft /> Todas as vagas</Button>;
  if (failed) return <PublicLayout><Page>{back}<Empty>Empresa não encontrada.</Empty></Page></PublicLayout>;
  if (!data) return <PublicLayout><PageSkeleton kit="candidate" rows={3} /></PublicLayout>;

  return (
    <PublicLayout>
      <Page>
        {back}
        <Hero>
          <h1>{data.company.name}</h1>
          <Lead>{[data.company.sector, data.company.location].filter(Boolean).join(" · ")}</Lead>
        </Hero>
        {data.jobs.length === 0 ? <Empty>Nenhuma vaga aberta no momento.</Empty> : null}
        <CardGrid>
          {data.jobs.map((job) => (
            <Panel key={job.id}>
              <PanelTitle>{job.title}</PanelTitle>
              <TagRow>{[job.modality, job.location, job.regime].filter(Boolean).map((text) => <Badge key={text}>{text}</Badge>)}</TagRow>
              <Meta>{job.excerpt}</Meta>
              <div><Button as={Link} tone="brand" to={`/vagas/${job.id}`}>Ver vaga</Button></div>
            </Panel>
          ))}
        </CardGrid>
      </Page>
    </PublicLayout>
  );
}
