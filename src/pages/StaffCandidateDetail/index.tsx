import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { getCandidate } from "../../services/admin/candidates";
import type { AdminCandidate } from "../../services/admin/candidates/dto";
import type { DiscResult } from "../../services/assessments/disc/dto";
import type { EneagramaResult } from "../../services/assessments/eneagrama/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Badge,
  Button,
  Empty,
  FunnelFill,
  FunnelLabelRow,
  FunnelRow,
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
  Tag,
  TagRow,
} from "../StaffKit/styles";

const DISC_LABELS: Record<string, string> = { D: "Dominância", I: "Influência", S: "Estabilidade", C: "Conformidade" };
const ENEAGRAMA_LABELS: Record<string, string> = {
  E1: "Reformador", E2: "Prestativo", E3: "Realizador", E4: "Individualista", E5: "Investigador",
  E6: "Leal", E7: "Entusiasta", E8: "Desafiador", E9: "Pacificador",
};

function formatDate(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

function formatDateTime(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("pt-BR");
}

function yesNo(value?: boolean): string {
  if (value === undefined) return "-";
  return value ? "Sim" : "Nao";
}

function DiscPanel({ assessment }: { assessment: DiscResult.Response }) {
  const { latest, history } = assessment;

  return (
    <Panel>
      <PanelTitle>DISC comportamental</PanelTitle>

      {latest ? (
        <>
          <Badge tone="positive">Perfil {latest.profile.label} — realizado em {formatDate(latest.completed_at)}</Badge>

          {(Object.keys(DISC_LABELS) as Array<keyof DiscResult.Dimensions>).map((dimension) => (
            <FunnelRow key={dimension}>
              <div>
                <FunnelLabelRow>
                  <span>{DISC_LABELS[dimension]}</span>
                  <span>{Math.round(latest.dimensions[dimension])}</span>
                </FunnelLabelRow>
                <FunnelTrack>
                  <FunnelFill style={{ width: `${latest.dimensions[dimension]}%` }} />
                </FunnelTrack>
              </div>
            </FunnelRow>
          ))}

          {history.length > 1 ? (
            <>
              <Meta>Histórico de tentativas</Meta>
              <List>
                {history.map((attempt) => (
                  <Item key={attempt.id}>
                    <ItemTop>
                      <strong>{attempt.profile.label}</strong>
                      <Meta>{formatDateTime(attempt.completed_at)}</Meta>
                    </ItemTop>
                  </Item>
                ))}
              </List>
            </>
          ) : null}
        </>
      ) : (
        <Badge tone="neutral">Ainda não realizado</Badge>
      )}
    </Panel>
  );
}

function EneagramaPanel({ assessment }: { assessment: EneagramaResult.Response }) {
  const { latest, history } = assessment;

  return (
    <Panel>
      <PanelTitle>Eneagrama</PanelTitle>

      {latest ? (
        <>
          <Badge tone="positive">
            {ENEAGRAMA_LABELS[latest.profile.primary]} ({latest.profile.label}) — realizado em {formatDate(latest.completed_at)}
          </Badge>

          {(Object.keys(ENEAGRAMA_LABELS) as Array<keyof EneagramaResult.Types>).map((type) => (
            <FunnelRow key={type}>
              <div>
                <FunnelLabelRow>
                  <span>{ENEAGRAMA_LABELS[type]}</span>
                  <span>{Math.round(latest.types[type])}</span>
                </FunnelLabelRow>
                <FunnelTrack>
                  <FunnelFill style={{ width: `${latest.types[type]}%` }} />
                </FunnelTrack>
              </div>
            </FunnelRow>
          ))}

          {history.length > 1 ? (
            <>
              <Meta>Histórico de tentativas</Meta>
              <List>
                {history.map((attempt) => (
                  <Item key={attempt.id}>
                    <ItemTop>
                      <strong>{attempt.profile.label}</strong>
                      <Meta>{formatDateTime(attempt.completed_at)}</Meta>
                    </ItemTop>
                  </Item>
                ))}
              </List>
            </>
          ) : null}
        </>
      ) : (
        <Badge tone="neutral">Ainda não realizado</Badge>
      )}
    </Panel>
  );
}

export function StaffCandidateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<AdminCandidate.Detail | null>(null);

  useEffect(() => {
    if (!id) return;

    getCandidate(Number(id))
      .then(setCandidate)
      .catch((error) => toast.error(getApiErrorMessage(error, "Erro ao carregar candidato.")));
  }, [id]);

  if (!candidate) {
    return <p>Carregando...</p>;
  }

  const links = [...candidate.professional_links, ...candidate.social_links];

  return (
    <Page>
      <Link to="/staff/candidates">
        <Button type="button"><FiArrowLeft /> Voltar para candidatos</Button>
      </Link>

      <Hero>
        <div>
          <PanelTitle>{candidate.name}</PanelTitle>
          <Lead>{candidate.email}</Lead>
        </div>
        {candidate.curriculum_url ? (
          <a href={candidate.curriculum_url} target="_blank" rel="noreferrer">
            <Button type="button" tone="brand">Baixar curriculo</Button>
          </a>
        ) : null}
      </Hero>

      <Grid>
        {candidate.resume ? (
          <Panel>
            <PanelTitle>Resumo profissional</PanelTitle>
            <p>{candidate.resume}</p>
          </Panel>
        ) : null}

        <Panel>
          <PanelTitle>Dados pessoais</PanelTitle>
          <TagRow>
            <Tag>Tel: {candidate.phone_number1 || "-"}</Tag>
            <Tag>Cidade: {candidate.address_city || "-"}</Tag>
            <Tag>Nasc.: {formatDate(candidate.birthdate)}</Tag>
            <Tag>Est. civil: {candidate.marital_status || "-"}</Tag>
            <Tag>PCD: {candidate.pcd || "-"}</Tag>
            <Tag>Empregado: {yesNo(candidate.employee)}</Tag>
          </TagRow>
        </Panel>

        <Panel>
          <PanelTitle>Formação acadêmica</PanelTitle>
          {candidate.academic_histories.length === 0 ? (
            <Empty>Nenhuma formação cadastrada.</Empty>
          ) : (
            <List>
              {candidate.academic_histories.map((item) => (
                <Item key={item.id}>
                  <strong>{item.title}</strong>
                  <Meta>{item.institution}{item.degree ? ` - ${item.degree}` : ""}</Meta>
                  <Meta>{formatDate(item.start_date)} - {item.end_date ? formatDate(item.end_date) : "atual"}</Meta>
                </Item>
              ))}
            </List>
          )}
        </Panel>

        <Panel>
          <PanelTitle>Experiência profissional</PanelTitle>
          {candidate.employment_histories.length === 0 ? (
            <Empty>Nenhuma experiência cadastrada.</Empty>
          ) : (
            <List>
              {candidate.employment_histories.map((item) => (
                <Item key={item.id}>
                  <strong>{item.position}</strong>
                  <Meta>{item.company_name}{item.salary ? ` - R$ ${item.salary}` : ""}</Meta>
                  <Meta>{formatDate(item.start_date)} - {item.end_date ? formatDate(item.end_date) : "atual"}</Meta>
                </Item>
              ))}
            </List>
          )}
        </Panel>

        <Panel>
          <PanelTitle>Habilidades e conhecimentos</PanelTitle>
          <TagRow>
            {candidate.skills.map((item) => <Tag key={`skill-${item.id}`}>{item.title}</Tag>)}
            {candidate.knowledges.map((item) => <Tag key={`knowledge-${item.id}`}>{item.title}</Tag>)}
            {candidate.skills.length === 0 && candidate.knowledges.length === 0 ? (
              <Empty>Nenhuma habilidade ou conhecimento marcado.</Empty>
            ) : null}
          </TagRow>
        </Panel>

        <Panel>
          <PanelTitle>Links</PanelTitle>
          {links.length === 0 ? (
            <Empty>Nenhum link cadastrado.</Empty>
          ) : (
            <List>
              {links.map((item) => (
                <Item key={item.id}>
                  <strong>{item.title}</strong>
                  <a href={item.link} target="_blank" rel="noreferrer">{item.link}</a>
                </Item>
              ))}
            </List>
          )}
        </Panel>

        <Panel>
          <PanelTitle>Documentos</PanelTitle>
          {candidate.documents.length === 0 ? (
            <Empty>Nenhum documento anexado.</Empty>
          ) : (
            <List>
              {candidate.documents.map((item) => (
                <Item key={item.id}>
                  <ItemTop>
                    <strong>{item.document_name}</strong>
                    {item.image_url ? <Badge tone="positive">Anexado</Badge> : null}
                  </ItemTop>
                  <Meta>{item.document_number}</Meta>
                </Item>
              ))}
            </List>
          )}
        </Panel>

        <Panel>
          <PanelTitle>Candidaturas</PanelTitle>
          {candidate.applications.length === 0 ? (
            <Empty>Nenhuma candidatura registrada.</Empty>
          ) : (
            <List>
              {candidate.applications.map((item) => (
                <Item key={item.id}>
                  <ItemTop>
                    <strong>{item.job_name}</strong>
                    <Badge tone={item.status_tone}>{item.stage}</Badge>
                  </ItemTop>
                  <Meta>{item.company_name}</Meta>
                </Item>
              ))}
            </List>
          )}
        </Panel>

        <DiscPanel assessment={candidate.disc_assessment} />
        <EneagramaPanel assessment={candidate.eneagrama_assessment} />
      </Grid>
    </Page>
  );
}
