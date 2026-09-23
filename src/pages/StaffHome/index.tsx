import { useEffect, useMemo, useState } from "react";
import { listCompanies } from "../../services/admin/companies";
import type { AdminCompany } from "../../services/admin/companies/dto";
import { listJobs } from "../../services/admin/jobs";
import type { AdminJob } from "../../services/admin/jobs/dto";
import { listHirings } from "../../services/admin/hirings";
import type { AdminHiring } from "../../services/admin/hirings/dto";
import { listInterviews } from "../../services/admin/interviews";
import type { AdminInterview } from "../../services/admin/interviews/dto";
import { listExams } from "../../services/admin/exams";
import type { AdminExam } from "../../services/admin/exams/dto";
import { listAdminApplications } from "../../services/admin/applications";
import type { AdminApplication } from "../../services/admin/applications/dto";
import {
  Badge,
  Empty,
  FunnelFill,
  FunnelLabelRow,
  FunnelTrack,
  Grid,
  Hero,
  Item,
  ItemTop,
  Lead,
  List,
  Meta,
  Page,
  Panel,
  PanelTitle,
  StatGrid,
  StatLabel,
  StatTile,
  StatTrend,
  StatValue,
} from "../StaffKit/styles";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function StaffHomePage() {
  const [companies, setCompanies] = useState<AdminCompany.Item[]>([]);
  const [jobs, setJobs] = useState<AdminJob.Item[]>([]);
  const [hirings, setHirings] = useState<AdminHiring.Item[]>([]);
  const [interviews, setInterviews] = useState<AdminInterview.Item[]>([]);
  const [exams, setExams] = useState<AdminExam.Item[]>([]);
  const [applications, setApplications] = useState<AdminApplication.Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      const [companiesRes, jobsRes, hiringsRes, interviewsRes, examsRes, applicationsRes] = await Promise.all([
        listCompanies(),
        listJobs(),
        listHirings(),
        listInterviews(),
        listExams(),
        listAdminApplications(),
      ]);
      setCompanies(companiesRes);
      setJobs(jobsRes);
      setHirings(hiringsRes);
      setInterviews(interviewsRes);
      setExams(examsRes);
      setApplications(applicationsRes);
      setLoading(false);
    }
    void loadAll();
  }, []);

  const activeApplications = useMemo(() => applications.filter((app) => !app.terminal_state), [applications]);

  const upcomingInterviews = useMemo(() => {
    const now = Date.now();
    const horizon = now + SEVEN_DAYS_MS;
    return interviews
      .filter((interview) => {
        const time = new Date(interview.date_time).getTime();
        return !Number.isNaN(time) && time >= now && time <= horizon;
      })
      .sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime());
  }, [interviews]);

  const examsWithoutQuestions = useMemo(
    () => exams.filter((exam) => (exam.questions_count ?? exam.questions?.length ?? 0) === 0),
    [exams],
  );

  const funnelByStage = useMemo(() => {
    const counts = new Map<string, { count: number; tone: AdminApplication.Item["status_tone"] }>();
    for (const application of applications) {
      const current = counts.get(application.stage);
      counts.set(application.stage, { count: (current?.count ?? 0) + 1, tone: application.status_tone });
    }
    return [...counts.entries()]
      .map(([stage, value]) => ({ stage, ...value }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [applications]);

  const maxFunnelCount = Math.max(1, ...funnelByStage.map((row) => row.count));

  const recentCompanies = useMemo(
    () => [...companies].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? "")).slice(0, 5),
    [companies],
  );
  const recentJobs = useMemo(
    () => [...jobs].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? "")).slice(0, 5),
    [jobs],
  );

  if (loading) {
    return <p>Carregando painel...</p>;
  }

  return (
    <Page>
      <Hero>
        <h2>Painel RH</h2>
        <Lead>Visao geral do funcionamento operacional: vagas, processos, candidaturas e entrevistas em um so lugar.</Lead>
      </Hero>

      <StatGrid>
        <StatTile>
          <StatLabel>Vagas cadastradas</StatLabel>
          <StatValue>{jobs.length}</StatValue>
          <StatTrend tone="neutral">{companies.length} empresas parceiras</StatTrend>
        </StatTile>
        <StatTile>
          <StatLabel>Processos seletivos</StatLabel>
          <StatValue>{hirings.length}</StatValue>
          <StatTrend tone="neutral">{activeApplications.length} candidaturas em andamento</StatTrend>
        </StatTile>
        <StatTile featured={upcomingInterviews.length > 0}>
          <StatLabel>Entrevistas em 7 dias</StatLabel>
          <StatValue>{upcomingInterviews.length}</StatValue>
          <StatTrend tone={upcomingInterviews.length > 0 ? "warning" : "neutral"}>
            {upcomingInterviews.length > 0 ? "Confira a agenda abaixo" : "Nada agendado"}
          </StatTrend>
        </StatTile>
        <StatTile>
          <StatLabel>Provas sem perguntas</StatLabel>
          <StatValue>{examsWithoutQuestions.length}</StatValue>
          <StatTrend tone={examsWithoutQuestions.length > 0 ? "negative" : "positive"}>
            {examsWithoutQuestions.length > 0 ? "Pendente de configuracao" : "Tudo certo"}
          </StatTrend>
        </StatTile>
      </StatGrid>

      <Grid>
        <Panel>
          <PanelTitle>Funil de candidatos por etapa</PanelTitle>
          {funnelByStage.length === 0 ? (
            <Empty>Nenhuma candidatura registrada ainda.</Empty>
          ) : (
            <List>
              {funnelByStage.map((row) => (
                <div key={row.stage}>
                  <FunnelLabelRow>
                    <span>{row.stage}</span>
                    <strong>{row.count}</strong>
                  </FunnelLabelRow>
                  <FunnelTrack>
                    <FunnelFill tone={row.tone} style={{ width: `${(row.count / maxFunnelCount) * 100}%` }} />
                  </FunnelTrack>
                </div>
              ))}
            </List>
          )}
        </Panel>

        <Panel>
          <PanelTitle>Entrevistas nos proximos 7 dias</PanelTitle>
          {upcomingInterviews.length === 0 ? (
            <Empty>Nenhuma entrevista agendada para os proximos dias.</Empty>
          ) : (
            <List>
              {upcomingInterviews.map((interview) => (
                <Item key={interview.id}>
                  <ItemTop>
                    <strong>{interview.candidate_name || "Candidato nao definido"}</strong>
                    <Meta>{new Date(interview.date_time).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</Meta>
                  </ItemTop>
                  <Meta>{interview.stage_title ?? "Etapa"} - {interview.interview_type}</Meta>
                </Item>
              ))}
            </List>
          )}
        </Panel>
      </Grid>

      <Grid>
        <Panel>
          <PanelTitle>Alertas de qualidade</PanelTitle>
          {examsWithoutQuestions.length === 0 ? (
            <Empty>Nenhum alerta no momento.</Empty>
          ) : (
            <List>
              {examsWithoutQuestions.map((exam) => (
                <Item key={exam.id}>
                  <ItemTop>
                    <strong>{exam.title}</strong>
                    <Badge tone="warning">Sem perguntas</Badge>
                  </ItemTop>
                  <Meta>{exam.department}</Meta>
                </Item>
              ))}
            </List>
          )}
        </Panel>

        <Panel>
          <PanelTitle>Adicionados recentemente</PanelTitle>
          <List>
            {recentCompanies.map((company) => (
              <Item key={`company-${company.id}`}>
                <ItemTop>
                  <strong>{company.company_name}</strong>
                  <Badge tone="neutral">Empresa</Badge>
                </ItemTop>
                <Meta>{company.sector}</Meta>
              </Item>
            ))}
            {recentJobs.map((job) => (
              <Item key={`job-${job.id}`}>
                <ItemTop>
                  <strong>{job.title}</strong>
                  <Badge tone="neutral">Vaga</Badge>
                </ItemTop>
                <Meta>{job.modality || "Modalidade nao informada"}</Meta>
              </Item>
            ))}
            {recentCompanies.length === 0 && recentJobs.length === 0 ? (
              <Empty>Nenhum cadastro recente.</Empty>
            ) : null}
          </List>
        </Panel>
      </Grid>
    </Page>
  );
}
