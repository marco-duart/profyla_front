import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createApplication } from "../../services/applications";
import { listOpportunities } from "../../services/opportunities";
import type { OpportunityList } from "../../services/opportunities/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { Button, Card, Grid, Header, Lead, Meta, SearchInput } from "./styles";

export function CandidateOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OpportunityList.Item[]>([]);
  const [search, setSearch] = useState<string>("");

  async function load() {
    const response = await listOpportunities(search);
    setOpportunities(response);
  }

  useEffect(() => {
    void load();
  }, [search]);

  async function handleApply(opportunity: OpportunityList.Item): Promise<void> {
    if (!opportunity.initial_stage_id) {
      toast.error("Essa oportunidade ainda nao possui etapa inicial configurada.");
      return;
    }

    try {
      await createApplication({ hiring_process_stage_id: opportunity.initial_stage_id });
      toast.success("Candidatura enviada com sucesso.");
      await load();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao se candidatar."));
    }
  }

  return (
    <section>
      <Header>
        <h2>Oportunidades</h2>
        <Lead>Explore vagas abertas, compare modalidade e localidade, e envie sua candidatura sem sair do painel.</Lead>
        <SearchInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por vaga, modalidade ou descricao"
        />
      </Header>

      <Grid>
        {opportunities.map((opportunity) => (
          <Card key={opportunity.hiring_process_id}>
            <strong>{opportunity.job.title}</strong>
            <Meta>
              <span>{opportunity.job.company_name}</span>
              <span>{opportunity.job.modality}</span>
              <span>{opportunity.job.job_location}</span>
            </Meta>
            <span>Faixa salarial: {opportunity.job.salary || "A combinar"}</span>
            <p>{opportunity.job.description}</p>

            <Button
              type="button"
              onClick={() => handleApply(opportunity)}
              disabled={opportunity.already_applied}
            >
              {opportunity.already_applied ? "Ja candidatado" : "Candidatar-se"}
            </Button>
          </Card>
        ))}
      </Grid>
    </section>
  );
}
