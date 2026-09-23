import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDiscResult } from "../../services/assessments/disc";
import type { DiscResult } from "../../services/assessments/disc/dto";
import { getEneagramaResult } from "../../services/assessments/eneagrama";
import type { EneagramaResult } from "../../services/assessments/eneagrama/dto";
import { Badge, Button, Grid, Hero, Lead, Meta, Page, Panel, PanelTitle } from "../CandidateKit/styles";

function formatDate(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

export function CandidateAssessmentsPage() {
  const [discLatest, setDiscLatest] = useState<DiscResult.Attempt | null | undefined>(undefined);
  const [eneagramaLatest, setEneagramaLatest] = useState<EneagramaResult.Attempt | null | undefined>(undefined);

  useEffect(() => {
    void getDiscResult().then((response) => setDiscLatest(response.latest));
    void getEneagramaResult().then((response) => setEneagramaLatest(response.latest));
  }, []);

  return (
    <Page>
      <Hero>
        <div>
          <PanelTitle>Avaliações comportamentais</PanelTitle>
          <Lead>
            Instrumentos de autoconhecimento inspirados em DISC e Eneagrama. Não são testes psicológicos
            validados — ajudam a equipe de recrutamento a te conhecer melhor.
          </Lead>
        </div>
      </Hero>

      <Grid>
        <Panel>
          <PanelTitle>DISC comportamental</PanelTitle>
          <Meta>50 afirmações sobre como você costuma agir e decidir no dia a dia.</Meta>
          {discLatest ? (
            <>
              <Badge tone="positive">Realizado em {formatDate(discLatest.completed_at)}</Badge>
              <Meta>Perfil predominante: {discLatest.profile.label}</Meta>
            </>
          ) : discLatest === null ? (
            <Badge tone="neutral">Ainda não realizado</Badge>
          ) : null}
          <Link to="/candidate/assessments/disc">
            <Button type="button" tone="brand">{discLatest ? "Refazer avaliação" : "Iniciar avaliação"}</Button>
          </Link>
        </Panel>

        <Panel>
          <PanelTitle>Eneagrama</PanelTitle>
          <Meta>54 afirmações sobre motivações e padrões recorrentes de comportamento.</Meta>
          {eneagramaLatest ? (
            <>
              <Badge tone="positive">Realizado em {formatDate(eneagramaLatest.completed_at)}</Badge>
              <Meta>Perfil predominante: {eneagramaLatest.profile.label}</Meta>
            </>
          ) : eneagramaLatest === null ? (
            <Badge tone="neutral">Ainda não realizado</Badge>
          ) : null}
          <Link to="/candidate/assessments/eneagrama">
            <Button type="button" tone="brand">{eneagramaLatest ? "Refazer avaliação" : "Iniciar avaliação"}</Button>
          </Link>
        </Panel>
      </Grid>
    </Page>
  );
}
