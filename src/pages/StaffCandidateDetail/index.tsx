import { Annotations } from "./Annotations";
import { PageSkeleton } from "../../components/PageSkeleton";
import { Avatar } from "../../components/Avatar";
import { maskPhone } from "../../utils/masks";
import { formatDate, formatDateTime } from "../../utils/format";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { downloadCandidateCurriculum, downloadCandidateDocument, getCandidate } from "../../services/admin/candidates";
import type { AdminCandidate } from "../../services/admin/candidates/dto";
import type { DiscResult } from "../../services/assessments/disc/dto";
import type { EneagramaResult } from "../../services/assessments/eneagrama/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Actions,
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



function yesNo(value?: boolean): string {
  if (value === undefined) return "-";
  return value ? "Sim" : "Não";
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

          {latest.interpretation ? (
            <>
              {latest.interpretation.dimensions.map((dimension) => (
                <div key={dimension.key}>
                  <strong>{dimension.name}: {dimension.band_label}</strong>
                  <Meta>{dimension.text}</Meta>
                </div>
              ))}
              <Meta>{latest.interpretation.disclaimer}</Meta>
            </>
          ) : null}
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

          {latest.interpretation ? (
            <>
              {[latest.interpretation.primary, latest.interpretation.secondary].map((type, index) =>
                type ? (
                  <div key={type.key}>
                    <strong>{index === 0 ? "Predominante" : "Secundário"}: {type.name}</strong>
                    <Meta>{type.summary}</Meta>
                    <Meta>Atenção: {type.attention}</Meta>
                  </div>
                ) : null,
              )}
              <Meta>{latest.interpretation.wing}</Meta>
              <Meta>{latest.interpretation.disclaimer}</Meta>
            </>
          ) : null}
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

  async function handleDownload(download: () => Promise<void>) {
    try {
      await download();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível baixar o arquivo."));
    }
  }

  if (!candidate) {
    return <PageSkeleton kit="staff" rows={4} />;
  }

  const links = [...candidate.professional_links, ...candidate.social_links];

  return (
    <Page>
      <Button as={Link} to="/staff/candidates"><FiArrowLeft /> Voltar para candidatos</Button>

      <Hero>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Avatar src={candidate.photo_url} name={candidate.name} size={64} />
          <div>
            <PanelTitle>{candidate.name}</PanelTitle>
            <Lead>{candidate.email}</Lead>
          </div>
        </div>
        <Button type="button" onClick={() => window.print()}>Imprimir / salvar PDF</Button>
        {candidate.curriculum_attached ? (
          <Button type="button" tone="brand" onClick={() => void handleDownload(() => downloadCandidateCurriculum(candidate.id))}>
            Baixar currículo
          </Button>
        ) : null}
      </Hero>

      <Grid>
        <Annotations userId={candidate.id} initialTags={candidate.tags ?? []} />
        {candidate.resume ? (
          <Panel>
            <PanelTitle>Resumo profissional</PanelTitle>
            <p>{candidate.resume}</p>
          </Panel>
        ) : null}

        <Panel>
          <PanelTitle>Dados pessoais</PanelTitle>
          <TagRow>
            <Tag>Tel: {candidate.phone_number1 ? maskPhone(candidate.phone_number1) : "-"}</Tag>
            <Tag>Cidade: {candidate.address_city || "-"}</Tag>
            <Tag>Nasc.: {formatDate(candidate.birthdate)}</Tag>
            {/* Sensitive answers are optional: only shown when the candidate filled them in. */}
            {candidate.marital_status ? <Tag>Est. civil: {candidate.marital_status}</Tag> : null}
            {candidate.pcd ? <Tag>PCD: {candidate.pcd}</Tag> : null}
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
                    {item.file_attached ? <Badge tone="positive">Anexado</Badge> : null}
                  </ItemTop>
                  <Meta>{item.document_number}</Meta>
                  {item.file_attached ? (
                    <Actions>
                      <Button type="button" onClick={() => void handleDownload(() => downloadCandidateDocument(candidate.id, item.id))}>
                        Baixar arquivo
                      </Button>
                    </Actions>
                  ) : null}
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
                  {item.match_score != null ? <Meta>Aderência à vaga: <strong>{item.match_score}%</strong></Meta> : null}
                  {item.scorecard?.average != null ? <Meta>Entrevistas: <strong>{item.scorecard.average.toLocaleString("pt-BR")}</strong>/5 ({item.scorecard.evaluations} avaliação(ões))</Meta> : null}
                </Item>
              ))}
            </List>
          )}
        </Panel>

        {candidate.disc_assessment || candidate.eneagrama_assessment ? (
          <Panel>
            <PanelTitle>Testes comportamentais</PanelTitle>
            <Meta>
              DISC e Eneagrama são questionários de autoconhecimento, não instrumentos psicométricos validados nem diagnóstico.
              <strong> Não use como critério único de eliminação.</strong>
            </Meta>
          </Panel>
        ) : null}
        {candidate.disc_assessment ? <DiscPanel assessment={candidate.disc_assessment} /> : null}
        {candidate.eneagrama_assessment ? <EneagramaPanel assessment={candidate.eneagrama_assessment} /> : null}
        {!candidate.disc_assessment && !candidate.eneagrama_assessment ? (
          <Panel>
            <PanelTitle>Testes comportamentais</PanelTitle>
            <Empty>Sem resultados disponíveis (não realizados ou consentimento revogado pelo candidato).</Empty>
          </Panel>
        ) : null}
      </Grid>
    </Page>
  );
}
