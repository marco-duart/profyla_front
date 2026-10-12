import { PageSkeleton } from "../../components/PageSkeleton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { createApplication } from "../../services/applications";
import { getOpportunityDetails } from "../../services/opportunities";
import type { OpportunityDetail } from "../../services/opportunities/dto";
import { getApiErrorCode, getApiErrorMessage } from "../../utils/api-error";
import { formatCurrency } from "../../utils/masks";
import { ConfirmDialog } from "../CandidateKit/ConfirmDialog";
import { Badge, Button, Empty, Hero, ReviewRow, ReviewLabel, ReviewValue, Lead, Page, Panel, PanelTitle, TagRow } from "../CandidateKit/styles";

export function CandidateOpportunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState<OpportunityDetail.Response | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!id) return;
    getOpportunityDetails(Number(id))
      .then(setOpportunity)
      .catch((error) => {
        if (getApiErrorCode(error) === "not_found") setNotFound(true);
        else toast.error(getApiErrorMessage(error, "Erro ao carregar a vaga."));
      });
  }, [id]);

  async function apply() {
    if (!opportunity?.initial_stage_id) {
      toast.error("Essa oportunidade ainda não possui etapa inicial configurada.");
      setConfirming(false);
      return;
    }

    setApplying(true);
    try {
      await createApplication({ hiring_process_stage_id: opportunity.initial_stage_id });
      toast.success("Candidatura enviada com sucesso.");
      navigate("/candidate/applications");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao se candidatar."));
      setApplying(false);
    }
  }

  const back = (
    <Button as={Link} to="/candidate/opportunities"><FiArrowLeft /> Voltar para oportunidades</Button>
  );

  if (notFound) {
    return (
      <Page>
        {back}
        <Empty>Esta vaga não foi encontrada ou não está mais aberta.</Empty>
      </Page>
    );
  }

  if (!opportunity) return <PageSkeleton kit="candidate" rows={4} />;

  const { job } = opportunity;

  return (
    <Page>
      {back}
      <Hero>
        <h2>{job.title}</h2>
        <Lead>{job.company_name}</Lead>
        <TagRow>
          {job.modality ? <Badge>{job.modality}</Badge> : null}
          {job.regime ? <Badge>{job.regime}</Badge> : null}
          {opportunity.already_applied ? <Badge tone="positive">Você já se candidatou</Badge> : null}
        </TagRow>
      </Hero>

      <Panel>
        <PanelTitle>Sobre a vaga</PanelTitle>
        <ReviewRow><ReviewLabel>Local</ReviewLabel><ReviewValue>{job.job_location || "-"}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Modalidade</ReviewLabel><ReviewValue>{job.modality || "-"}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Regime</ReviewLabel><ReviewValue>{job.regime || "-"}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Faixa salarial</ReviewLabel><ReviewValue>{formatCurrency(job.salary) || "A combinar"}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Jornada</ReviewLabel><ReviewValue>{job.work_schedule || "-"}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Etapas do processo</ReviewLabel><ReviewValue>{opportunity.stages_count}</ReviewValue></ReviewRow>
      </Panel>

      <Panel>
        <PanelTitle>Descrição</PanelTitle>
        <p style={{ whiteSpace: "pre-line" }}>{job.description || "Sem descrição informada."}</p>
      </Panel>

      <Panel>
        <PanelTitle>Requisitos</PanelTitle>
        <p style={{ whiteSpace: "pre-line" }}>{job.requirements || "Sem requisitos informados."}</p>
      </Panel>

      <Button type="button" tone="brand" disabled={opportunity.already_applied} onClick={() => setConfirming(true)}>
        {opportunity.already_applied ? "Já candidatado" : "Candidatar-se a esta vaga"}
      </Button>

      <ConfirmDialog
        open={confirming}
        title="Confirmar candidatura"
        message={`Enviar sua candidatura para "${job.title}"? Seu currículo atual será compartilhado com a equipe de recrutamento.`}
        confirmLabel="Candidatar-me"
        tone="brand"
        confirming={applying}
        onConfirm={() => void apply()}
        onCancel={() => setConfirming(false)}
      />
    </Page>
  );
}
