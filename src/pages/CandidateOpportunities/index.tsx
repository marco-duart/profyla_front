import { PageSkeleton } from "../../components/PageSkeleton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { createApplication } from "../../services/applications";
import { listOpportunities } from "../../services/opportunities";
import type { OpportunityList } from "../../services/opportunities/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { formatCurrency } from "../../utils/masks";
import { ConfirmDialog } from "../CandidateKit/ConfirmDialog";
import { Badge, Button, CardGrid, Empty, Field, Hero, Input, Lead, Meta, Page, Panel, PanelTitle, TagRow } from "../CandidateKit/styles";

export function CandidateOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OpportunityList.Item[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [pendingApply, setPendingApply] = useState<OpportunityList.Item | null>(null);
  const [applying, setApplying] = useState(false);

  async function load() {
    setOpportunities(await listOpportunities(search));
    setLoading(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => void load(), 250);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function confirmApply() {
    if (!pendingApply) return;
    if (!pendingApply.initial_stage_id) {
      toast.error("Essa oportunidade ainda não possui etapa inicial configurada.");
      setPendingApply(null);
      return;
    }

    setApplying(true);
    try {
      await createApplication({ hiring_process_stage_id: pendingApply.initial_stage_id });
      toast.success("Candidatura enviada com sucesso.");
      setPendingApply(null);
      await load();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao se candidatar."));
    } finally {
      setApplying(false);
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Oportunidades</h2>
        <Lead>Explore vagas abertas, compare modalidade e localidade, e envie sua candidatura sem sair do painel.</Lead>
        <Field>
          Buscar vaga
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Título da vaga" />
        </Field>
      </Hero>

      {loading ? <PageSkeleton kit="candidate" rows={3} /> : null}
      {!loading && opportunities.length === 0 ? <Empty>Nenhuma vaga aberta encontrada.</Empty> : null}

      <CardGrid>
        {opportunities.map((opportunity) => (
          <Panel key={opportunity.hiring_process_id}>
            <PanelTitle>{opportunity.job.title}</PanelTitle>
            <Meta>{opportunity.job.company_name}</Meta>
            <TagRow>
              {opportunity.job.modality ? <Badge>{opportunity.job.modality}</Badge> : null}
              {opportunity.job.job_location ? <Badge>{opportunity.job.job_location}</Badge> : null}
            </TagRow>
            <Meta>Faixa salarial: {formatCurrency(opportunity.job.salary) || "A combinar"}</Meta>
            <Meta css={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {opportunity.job.description}
            </Meta>
            <TagRow>
              <Button as={Link} to={`/candidate/opportunities/${opportunity.hiring_process_id}`}>Ver detalhes</Button>
              <Button type="button" tone="brand" onClick={() => setPendingApply(opportunity)} disabled={opportunity.already_applied}>
                {opportunity.already_applied ? "Já candidatado" : "Candidatar-se"}
              </Button>
            </TagRow>
          </Panel>
        ))}
      </CardGrid>

      <ConfirmDialog
        open={pendingApply !== null}
        title="Confirmar candidatura"
        message={`Enviar sua candidatura para "${pendingApply?.job.title ?? ""}"? Seu currículo atual será compartilhado com a equipe de recrutamento.`}
        confirmLabel="Candidatar-me"
        tone="brand"
        confirming={applying}
        onConfirm={() => void confirmApply()}
        onCancel={() => setPendingApply(null)}
      />
    </Page>
  );
}
