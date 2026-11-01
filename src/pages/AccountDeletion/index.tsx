import { useEffect } from "react";
import { Link } from "react-router-dom";
import { accountDeletionContent } from "../../content/legal/accountDeletion";
import { Markdown } from "../../components/Markdown";
import { Article, Page, TopRow } from "../LegalDocument/styles";

/** Página pública (sem login): como pedir a exclusão da conta pelo app, pelo site ou por e-mail. */
export function AccountDeletionPage() {
  useEffect(() => {
    window.document.title = "Exclusão de conta - Profyla";
  }, []);

  return (
    <Page>
      <TopRow>
        <Link to="/login">← Voltar</Link>
        <Link to="/privacidade">Política de Privacidade</Link>
      </TopRow>

      <Article>
        <Markdown source={accountDeletionContent} />
      </Article>
    </Page>
  );
}
