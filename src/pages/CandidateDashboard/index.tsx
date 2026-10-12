import { PageSkeleton } from "../../components/PageSkeleton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCandidateHomeData } from "../../services/portal";
import type { HomeData } from "../../services/portal/dto";
import { getStatusLabel } from "../../utils/candidate-status";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Card,
  Eyebrow,
  Grid,
  Hero,
  InlineLink,
  Item,
  ItemList,
  ItemMeta,
  MetricCard,
  MetricRow,
  MetricValue,
  Progress,
  ProgressFill,
  Title,
} from "./styles";

export function CandidateDashboardPage() {
  const [data, setData] = useState<HomeData.Response | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const response = await getCandidateHomeData();
        setData(response);
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, "Erro ao carregar dashboard."));
      }
    }

    void load();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <PageSkeleton kit="candidate" rows={4} />;
  }

  return (
    <>
      <Hero>
        <div>
          <Eyebrow>Painel do candidato</Eyebrow>
          <Title>Seu processo, sem excesso de ruído</Title>
          <p>Veja apenas o que precisa de atenção agora e acompanhe suas candidaturas mais recentes.</p>
        </div>

        <MetricRow>
          <MetricCard>
            <Eyebrow>Currículo</Eyebrow>
            <MetricValue>{data.profile_completion}%</MetricValue>
            <Progress>
              <ProgressFill style={{ width: `${data.profile_completion}%` }} />
            </Progress>
            <Link to="/candidate/curriculum">
              <InlineLink>
                {data.profile_completion === 100 ? "Revisar currículo" : "Continuar preenchimento"}
              </InlineLink>
            </Link>
          </MetricCard>

          <MetricCard>
            <Eyebrow>Ações pendentes</Eyebrow>
            <MetricValue>{data.outstanding_actions_count}</MetricValue>
            <span>Entrevistas ou etapas aguardando alguma resposta sua.</span>
          </MetricCard>
        </MetricRow>
      </Hero>

      <Grid>
        <Card>
          <Title>Últimas candidaturas</Title>
          <ItemList>
            {data.latest_applications.map((application) => (
              <Item key={application.id}>
                <strong>{application.job_title}</strong>
                <ItemMeta>
                  <span>{application.company_name}</span>
                  <span>{getStatusLabel(application.stage_title)}</span>
                </ItemMeta>
                <Link to={`/candidate/applications/${application.id}`}>
                  <InlineLink>Ver andamento</InlineLink>
                </Link>
              </Item>
            ))}
          </ItemList>
        </Card>

        <Card>
          <Title>Comunicados recentes</Title>
          <ItemList>
            {data.notifications.map((notification) => (
              <Item key={notification.id}>
                <strong>{notification.title}</strong>
                <span>{notification.message}</span>
              </Item>
            ))}
          </ItemList>
        </Card>

        <Card>
          <Title>Oportunidades em destaque</Title>
          <ItemList>
            {data.opportunities.map((opportunity) => (
              <Item key={opportunity.hiring_process_id}>
                <strong>{opportunity.job.title}</strong>
                <ItemMeta>
                  <span>{opportunity.job.company_name}</span>
                  <span>{opportunity.job.modality}</span>
                  <span>{opportunity.job.job_location}</span>
                </ItemMeta>
                <Link to="/candidate/opportunities">
                  <InlineLink>Explorar vagas</InlineLink>
                </Link>
              </Item>
            ))}
          </ItemList>
        </Card>

        <Card>
          <Title>Avaliações comportamentais</Title>
          <Item>
            <span>DISC e Eneagrama ajudam a equipe de recrutamento a te conhecer melhor.</span>
            <Link to="/candidate/assessments">
              <InlineLink>Ver avaliações</InlineLink>
            </Link>
          </Item>
        </Card>
      </Grid>
    </>
  );
}
