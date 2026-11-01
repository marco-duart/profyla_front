import { screen } from "@testing-library/react";
import { LegalDocumentPage } from "./index";
import { renderPage } from "../../test/render";

const getLegalDocument = vi.hoisted(() => vi.fn());
vi.mock("../../services/legal", () => ({ getLegalDocument }));

describe("LegalDocumentPage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows the privacy policy from the site itself, without calling the API", async () => {
    renderPage(<LegalDocumentPage kind="privacy" />, { path: "/privacidade" });

    expect(await screen.findByRole("heading", { name: "Política de Privacidade do Profyla" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2. Contato e encarregado de dados" })).toBeInTheDocument();
    expect(screen.getByText(/Versão 1\.0/)).toBeInTheDocument();
    expect(getLegalDocument).not.toHaveBeenCalled();
  });

  it("still loads the terms from the API", async () => {
    getLegalDocument.mockResolvedValue({ kind: "terms", version: "9.9", content: "# Termos de teste", published_at: "2026-01-01T00:00:00Z" });
    renderPage(<LegalDocumentPage kind="terms" />, { path: "/termos" });

    expect(await screen.findByRole("heading", { name: "Termos de teste" })).toBeInTheDocument();
    expect(getLegalDocument).toHaveBeenCalledWith("terms");
  });
});
