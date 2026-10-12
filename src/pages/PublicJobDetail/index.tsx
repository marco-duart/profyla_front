import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { PageSkeleton } from "../../components/PageSkeleton";
import { PublicLayout } from "../../components/PublicLayout";
import { useAuth } from "../../hooks/useAuth";
import { usePageMeta } from "../../hooks/usePageMeta";
import { getPublicJob } from "../../services/public";
import type { PublicJobs } from "../../services/public/dto";
import { getApiErrorCode } from "../../utils/api-error";
import { formatDate } from "../../utils/format";
import { formatCurrency } from "../../utils/masks";
import { Badge, Button, Empty, Hero, Lead, Meta, Page, Panel, PanelTitle, ReviewLabel, ReviewRow, ReviewValue, TagRow } from "../CandidateKit/styles";

export function PublicJobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<PublicJobs.Detail | null>(null);
  const [notFound, setNotFound] = useState(false);
  usePageMeta(job ? `${job.title} - ${job.company.name}` : undefined, job?.excerpt);

  useEffect(() => {
    if (!id) return;
    getPublicJob(Number(id)).then(setJob).catch((error) => {
      if (getApiErrorCode(error) === "not_found") setNotFound(true);
    });
  }, [id]);

  function apply() {
    const target = `/candidate/opportunities/${id}`;
    // Logged-out visitors go through login/sign up and come back to this vacancy.
    navigate(user?.role === "user" ? target : `/login?redirect=${encodeURIComponent(target)}`);
  }

  const back = <Button as={Link} to="/vagas"><FiArrowLeft /> Todas as vagas</Button>;

  if (notFound) return <PublicLayout><Page>{back}<Empty>Esta vaga não foi encontrada ou não está mais aberta.</Empty></Page></PublicLayout>;
  if (!job) return <PublicLayout><PageSkeleton kit="candidate" rows={4} /></PublicLayout>;

  return (
    <PublicLayout>
      <Page>
        {back}
        <Hero>
          <h1>{job.title}</h1>
          <Lead><Link to={`/empresas/${job.company.id}/vagas`}>{job.company.name}</Link></Lead>
          <TagRow>
            {job.modality ? <Badge>{job.modality}</Badge> : null}
            {job.regime ? <Badge>{job.regime}</Badge> : null}
            {job.location ? <Badge>{job.location}</Badge> : null}
          </TagRow>
        </Hero>

        <Panel>
          <PanelTitle>Sobre a vaga</PanelTitle>
          <ReviewRow><ReviewLabel>Faixa salarial</ReviewLabel><ReviewValue>{formatCurrency(job.salary) || "A combinar"}</ReviewValue></ReviewRow>
          <ReviewRow><ReviewLabel>Jornada</ReviewLabel><ReviewValue>{job.work_schedule || "-"}</ReviewValue></ReviewRow>
          {job.closes_on ? <ReviewRow><ReviewLabel>Inscrições até</ReviewLabel><ReviewValue>{formatDate(job.closes_on)}</ReviewValue></ReviewRow> : null}
        </Panel>
        <Panel><PanelTitle>Descrição</PanelTitle><p style={{ whiteSpace: "pre-line" }}>{job.description}</p></Panel>
        <Panel><PanelTitle>Requisitos</PanelTitle><p style={{ whiteSpace: "pre-line" }}>{job.requirements}</p></Panel>
        {job.skills.length + job.knowledges.length > 0 ? (
          <Panel>
            <PanelTitle>Habilidades desejadas</PanelTitle>
            <TagRow>{[...job.skills, ...job.knowledges].map((name) => <Badge key={name}>{name}</Badge>)}</TagRow>
          </Panel>
        ) : null}

        <Button type="button" tone="brand" onClick={apply}>Candidatar-se a esta vaga</Button>
        {!user ? <Meta>Você será levado(a) para entrar ou criar sua conta e depois volta para esta vaga.</Meta> : null}
      </Page>
    </PublicLayout>
  );
}
