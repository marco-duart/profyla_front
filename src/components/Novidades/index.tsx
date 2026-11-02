import { Link } from "react-router-dom";
import { novidadesService, type NovidadesPlacement } from "../../services/novidades";
import type { Novidade } from "../../utils/novidades";
import { NovidadeCard } from "./NovidadeCard";
import { Grid, Section, SectionHead, SectionTitle } from "./styles";
import { useNovidades } from "./useNovidades";

export function NovidadesGrid({ placement, items }: { placement: NovidadesPlacement; items: Novidade[] }) {
  return (
    <Grid>
      {items.map((novidade) => (
        <NovidadeCard
          key={novidade.id}
          novidade={novidade}
          onImpression={() => novidadesService.impression(novidade.id, placement)}
          onClick={() => novidadesService.click(novidade.id, placement)}
        />
      ))}
    </Grid>
  );
}

/** Bloco do início: sem novidade (ou com erro) não renderiza nada, nem título nem espaço. */
/** `spaced`: margem de cima para páginas que não espaçam os filhos (o início do candidato); só existe quando o bloco aparece. */
export function NovidadesBlock({ seeAllTo, spaced = false }: { seeAllTo: string; spaced?: boolean }) {
  const { data } = useNovidades("web.dashboard");
  if (!data || data.length === 0) return null;

  return (
    <Section aria-label="Novidades da Maaxis" css={spaced ? { marginTop: "$5" } : undefined}>
      <SectionHead>
        <SectionTitle>Novidades</SectionTitle>
        <Link to={seeAllTo}>Ver todas</Link>
      </SectionHead>
      <NovidadesGrid placement="web.dashboard" items={data} />
    </Section>
  );
}
