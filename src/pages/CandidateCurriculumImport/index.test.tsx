import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CandidateCurriculumImportPage } from "./index";
import { applyImport, getImportDraft } from "../../services/curriculum";
import type { CurriculumImport } from "../../services/curriculum/dto";

vi.mock("../../services/curriculum", () => ({ getImportDraft: vi.fn(), applyImport: vi.fn() }));
vi.mock("react-hot-toast", () => ({ default: { success: vi.fn(), error: vi.fn() } }));

const draft: CurriculumImport.Draft = {
  run_id: 7,
  source: { filename: "cv.pdf", pages_read: 1, truncated: false, columns_detected: false, headings_found: true, parser_version: "1", skipped_duplicates: 2, notes: [] },
  profile: [
    { field: "phone_number1", value: "19988776655", current: null, confidence: "high", selected: true },
    { field: "address_city", value: "Campinas", current: "Santos", confidence: "high", selected: false },
  ],
  employment_histories: [
    { key: "employment-0", confidence: "high", selected: true, missing: [], warnings: [], data: { company_name: "Acme Ltda", position: "Analista", start_date: "2019-03-01", end_date: null, achievements: "- Migração" } },
    { key: "employment-1", confidence: "low", selected: false, missing: ["start_date"], warnings: [], data: { company_name: "Beta", position: "Dev", start_date: null, end_date: null, achievements: null } },
  ],
  academic_histories: [
    { key: "academic-0", confidence: "high", selected: true, missing: [], warnings: [], data: { title: "Computação", institution: "UNICAMP", degree: "Bacharelado", start_date: "2012-01-01", end_date: "2015-01-01" } },
  ],
  professional_links: [{ key: "professional-0", confidence: "high", selected: true, missing: [], warnings: [], data: { title: "LinkedIn", link: "https://linkedin.com/in/x" } }],
  social_links: [],
  skills: [{ skill_id: 1, title: "Ruby", selected: true }, { skill_id: 2, title: "PHP", selected: true }],
  knowledges: [],
  unmatched_terms: ["Kubernetes"],
};

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/candidate/curriculum/import"]}>
      <Routes>
        <Route path="/candidate/curriculum/import" element={<CandidateCurriculumImportPage />} />
        <Route path="/candidate/curriculum" element={<p>Tela do currículo</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

function apiError(code: string, extra: object = {}) {
  return Object.assign(new Error("falhou"), { isAxiosError: true, response: { data: { error: { code, message: "falhou", ...extra } } } });
}

beforeEach(() => {
  vi.mocked(getImportDraft).mockReset().mockResolvedValue(draft);
  vi.mocked(applyImport).mockReset().mockResolvedValue({} as never);
});

describe("CandidateCurriculumImportPage", () => {
  it("resume o que encontrou, mostra duplicatas e termos fora do catálogo", async () => {
    renderPage();

    expect(await screen.findByText(/Encontramos 2 experiências, 1 formação, 1 link e 2 habilidades/)).toBeInTheDocument();
    expect(screen.getByText(/2 itens já estavam no seu currículo/)).toBeInTheDocument();
    expect(screen.getByText(/Não estão no nosso catálogo: Kubernetes/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Adicionar 6 itens ao currículo" })).toBeEnabled();
  });

  it("envia só o que está marcado, com edited correto, e sem pedir confirmação quando não há substituição", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByText(/Encontramos/);

    await user.clear(screen.getAllByLabelText("Cargo")[0]);
    await user.type(screen.getAllByLabelText("Cargo")[0], "Analista Pleno");
    await user.click(screen.getByRole("button", { name: "PHP" }));
    await user.click(screen.getByRole("button", { name: /Adicionar 5 itens/ }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(applyImport).toHaveBeenCalledTimes(1));
    const payload = vi.mocked(applyImport).mock.calls[0][0];
    expect(payload.run_id).toBe(7);
    expect(payload.profile).toEqual({ phone_number1: "19988776655" });
    expect(payload.employment_histories).toHaveLength(1);
    expect(payload.employment_histories[0]).toMatchObject({ edited: true, data: { company_name: "Acme Ltda", position: "Analista Pleno", end_date: null } });
    expect(payload.academic_histories[0].edited).toBe(false);
    expect(payload.skill_ids).toEqual([1]);
    expect(await screen.findByText("Tela do currículo")).toBeInTheDocument();
  });

  it("não deixa adicionar a experiência incompleta até preencher o início", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByText(/Encontramos/);

    const checkbox = screen.getByRole("checkbox", { name: "Adicionar Experiência: Dev na Beta" });
    expect(checkbox).toBeDisabled();

    await user.type(screen.getAllByLabelText("Início")[1], "2020-05-01");
    await user.click(checkbox);
    await user.click(screen.getByRole("button", { name: /Adicionar 7 itens/ }));

    await waitFor(() => expect(applyImport).toHaveBeenCalled());
    expect(vi.mocked(applyImport).mock.calls[0][0].employment_histories.map((item) => item.data.company_name)).toEqual(["Acme Ltda", "Beta"]);
  });

  it("pede confirmação antes de substituir um campo já preenchido", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByText(/Encontramos/);

    await user.click(screen.getByRole("checkbox", { name: "Substituir Cidade" }));
    await user.click(screen.getByRole("button", { name: /Adicionar 7 itens/ }));

    const dialog = await screen.findByRole("dialog", { name: "Substituir dados já preenchidos?" });
    expect(dialog).toHaveTextContent("Cidade: Santos → Campinas");
    await user.click(within(dialog).getByRole("button", { name: "Cancelar" }));
    expect(applyImport).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /Adicionar 7 itens/ }));
    await user.click(await screen.findByRole("button", { name: "Substituir e adicionar" }));

    await waitFor(() => expect(applyImport).toHaveBeenCalled());
    expect(vi.mocked(applyImport).mock.calls[0][0].profile).toEqual({ phone_number1: "19988776655", address_city: "Campinas" });
  });

  it("mostra o erro do servidor junto do campo certo, mesmo com itens desmarcados antes dele", async () => {
    const user = userEvent.setup();
    vi.mocked(applyImport).mockRejectedValue(apiError("validation_error", { details: { "employment_histories.0.company_name": ["é obrigatório"] } }));
    renderPage();
    await screen.findByText(/Encontramos/);

    await user.click(screen.getByRole("button", { name: /Adicionar 6 itens/ }));

    expect(await screen.findByText("é obrigatório")).toBeInTheDocument();
    expect(screen.queryByText("Tela do currículo")).not.toBeInTheDocument();
  });

  it("PDF ilegível: explica e oferece enviar outro ou preencher manualmente", async () => {
    vi.mocked(getImportDraft).mockRejectedValue(apiError("unreadable_pdf"));
    renderPage();

    expect(await screen.findByText(/Não conseguimos ler o texto deste PDF/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enviar outro PDF" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Preencher manualmente" })).toBeInTheDocument();
  });

  it("sem nada aproveitável: mensagem e botão de voltar", async () => {
    vi.mocked(getImportDraft).mockResolvedValue({ ...draft, profile: [], employment_histories: [], academic_histories: [], professional_links: [], skills: [], unmatched_terms: [] });
    renderPage();

    expect(await screen.findByText("Não encontramos informações que pudéssemos aproveitar neste PDF.")).toBeInTheDocument();
  });
});
