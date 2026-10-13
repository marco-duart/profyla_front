import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLegalDocument } from "../../services/legal";
import type { Legal } from "../../services/legal/dto";
import { Markdown } from "../../components/Markdown";
import { Article, Meta, Page, TopRow } from "./styles";

const TITLES: Record<Legal.Kind, string> = {
  terms: "Termos de Uso",
  privacy: "Política de Privacidade",
  assessment_notice: "Aviso dos testes comportamentais",
};

export function LegalDocumentPage({ kind }: { kind: Legal.Kind }) {
  const [document, setDocument] = useState<Legal.Document | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getLegalDocument(kind).then(setDocument).catch(() => setFailed(true));
    window.document.title = `${TITLES[kind]} - Profyla`;
  }, [kind]);

  return (
    <Page>
      <TopRow>
        <Link to="/login">← Voltar</Link>
        <Link to={kind === "terms" ? "/privacidade" : "/termos"}>
          {kind === "terms" ? "Política de Privacidade" : "Termos de Uso"}
        </Link>
      </TopRow>

      <Article>
        {failed ? <p>Não foi possível carregar este documento agora. Tente novamente em instantes.</p> : null}
        {!document && !failed ? <p>Carregando...</p> : null}
        {document ? (
          <>
            <Meta>Versão {document.version}</Meta>
            <Markdown source={document.content} />
          </>
        ) : null}
      </Article>
    </Page>
  );
}
