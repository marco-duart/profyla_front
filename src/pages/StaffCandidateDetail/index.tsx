import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getCandidate } from "../../services/admin/candidates";
import type { AdminCandidate } from "../../services/admin/candidates/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import toast from "react-hot-toast";
import {
  Badge,
  Button,
  Grid,
  Hero,
  InfoLabel,
  InfoRow,
  InfoValue,
  Lead,
  Page,
  Panel,
  PanelTitle,
} from "../StaffKit/styles";

const TYPE_LABELS: Record<string, string> = {
  D: "Dominância", I: "Influência", S: "Estabilidade", C: "Conformidade",
  E1: "Reformador", E2: "Prestativo", E3: "Realizador", E4: "Individualista",
  E5: "Investigador", E6: "Leal", E7: "Entusiasta", E8: "Desafiador", E9: "Pacificador",
};

function formatDate(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

function yesNo(value?: boolean): string {
  if (value === undefined) return "-";
  return value ? "Sim" : "Nao";
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

  return (
    <Page>
      <Link to="/staff/kanban">
        <Button type="button"><FiArrowLeft /> Voltar</Button>
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
        <Panel>
          <PanelTitle>Dados pessoais</PanelTitle>
          <InfoRow><InfoLabel>Telefone</InfoLabel><InfoValue>{candidate.phone_number1 || "-"}</InfoValue></InfoRow>
          <InfoRow><InfoLabel>Cidade</InfoLabel><InfoValue>{candidate.address_city || "-"}</InfoValue></InfoRow>
          <InfoRow><InfoLabel>Data de nascimento</InfoLabel><InfoValue>{formatDate(candidate.birthdate)}</InfoValue></InfoRow>
          <InfoRow><InfoLabel>Estado civil</InfoLabel><InfoValue>{candidate.marital_status || "-"}</InfoValue></InfoRow>
          <InfoRow><InfoLabel>PCD</InfoLabel><InfoValue>{candidate.pcd || "-"}</InfoValue></InfoRow>
          <InfoRow><InfoLabel>Empregado atualmente</InfoLabel><InfoValue>{yesNo(candidate.employee)}</InfoValue></InfoRow>
          <InfoRow><InfoLabel>Resumo</InfoLabel><InfoValue>{candidate.resume || "-"}</InfoValue></InfoRow>
        </Panel>

        <Panel>
          <PanelTitle>Avaliações comportamentais</PanelTitle>

          <InfoRow>
            <InfoLabel>DISC comportamental</InfoLabel>
            <InfoValue>
              {candidate.disc_assessment ? (
                <Badge tone="positive">
                  {TYPE_LABELS[candidate.disc_assessment.primary] ?? candidate.disc_assessment.primary}
                  {" "}({candidate.disc_assessment.profile_label}) — {formatDate(candidate.disc_assessment.completed_at)}
                </Badge>
              ) : (
                <Badge tone="neutral">Nao realizado</Badge>
              )}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Eneagrama</InfoLabel>
            <InfoValue>
              {candidate.eneagrama_assessment ? (
                <Badge tone="positive">
                  {TYPE_LABELS[candidate.eneagrama_assessment.primary] ?? candidate.eneagrama_assessment.primary}
                  {" "}({candidate.eneagrama_assessment.profile_label}) — {formatDate(candidate.eneagrama_assessment.completed_at)}
                </Badge>
              ) : (
                <Badge tone="neutral">Nao realizado</Badge>
              )}
            </InfoValue>
          </InfoRow>
        </Panel>
      </Grid>
    </Page>
  );
}
