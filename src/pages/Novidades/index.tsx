import { NovidadesGrid } from "../../components/Novidades";
import { useNovidades } from "../../components/Novidades/useNovidades";
import { PageSkeleton } from "../../components/PageSkeleton";
import { usePageMeta } from "../../hooks/usePageMeta";
import { Empty as CandidateEmpty, Hero as CandidateHero, Lead as CandidateLead, Page as CandidatePage, PanelTitle as CandidateTitle } from "../CandidateKit/styles";
import { Empty as StaffEmpty, Hero as StaffHero, Lead as StaffLead, Page as StaffPage, PanelTitle as StaffTitle } from "../StaffKit/styles";

// Os dois kits de estilo ficam separados de propósito: a página escolhe o da área em que está.
const KITS = {
  candidate: { Page: CandidatePage, Hero: CandidateHero, Title: CandidateTitle, Lead: CandidateLead, Empty: CandidateEmpty },
  staff: { Page: StaffPage, Hero: StaffHero, Title: StaffTitle, Lead: StaffLead, Empty: StaffEmpty },
} as const;

/** Tela completa de Novidades (placement web.novidades), a mesma para o candidato e para a equipe. */
export function NovidadesPage({ kit }: { kit: keyof typeof KITS }) {
  usePageMeta("Novidades");
  const { Page, Hero, Title, Lead, Empty } = KITS[kit];
  const { data, loading } = useNovidades("web.novidades");

  return (
    <Page>
      <Hero>
        <div>
          <Title>Novidades</Title>
          <Lead>Produtos e serviços da Maaxis que podem ajudar você.</Lead>
        </div>
      </Hero>
      {loading ? <PageSkeleton kit={kit} rows={2} /> : null}
      {data && data.length === 0 ? <Empty>Nenhuma novidade por enquanto.</Empty> : null}
      {data && data.length > 0 ? <NovidadesGrid placement="web.novidades" items={data} /> : null}
    </Page>
  );
}
