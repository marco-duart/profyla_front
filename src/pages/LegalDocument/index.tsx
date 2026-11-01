import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { privacyDocument } from "../../content/legal/privacy";
import { getLegalDocument } from "../../services/legal";
import type { Legal } from "../../services/legal/dto";
import { Markdown } from "../../components/Markdown";
import { Article, Meta, Page, TopRow } from "./styles";

// Textos que moram no site (não dependem da API): o link público precisa abrir sempre, inclusive para a loja de apps.
const LOCAL_DOCUMENTS: Partial<Record<Legal.Kind, Legal.Document>> = { privacy: privacyDocument };

const TITLES: Record<Legal.Kind, string> = {
  terms: "Termos de Uso",
  privacy: "Política de Privacidade",
  assessment_notice: "Aviso dos testes comportamentais",
};

export function LegalDocumentPage({ kind }: { kind: Legal.Kind }) {
  useEffect(() => {
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
        {LOCAL_DOCUMENTS[kind] ? <DocumentBody document={LOCAL_DOCUMENTS[kind]} /> : <RemoteDocument key={kind} kind={kind} />}
      </Article>
    </Page>
  );
}

// `key={kind}` no pai: trocar de documento remonta este componente e recomeça o carregamento.
function RemoteDocument({ kind }: { kind: Legal.Kind }) {
  const [document, setDocument] = useState<Legal.Document | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getLegalDocument(kind).then(setDocument).catch(() => setFailed(true));
  }, [kind]);

  if (failed) return <p>Não foi possível carregar este documento agora. Tente novamente em instantes.</p>;
  if (!document) return <p>Carregando...</p>;
  return <DocumentBody document={document} />;
}

function DocumentBody({ document }: { document: Legal.Document }) {
  return (
    <>
      <Meta>Versão {document.version}</Meta>
      <Markdown source={document.content} />
    </>
  );
}
