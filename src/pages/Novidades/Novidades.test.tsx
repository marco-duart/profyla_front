import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { NovidadesPage } from "./index";
import { renderPage } from "../../test/render";

const novidadesService = vi.hoisted(() => ({ list: vi.fn(), impression: vi.fn(), click: vi.fn() }));
vi.mock("../../services/novidades", () => ({ novidadesService }));

const promo = {
  id: "0192f0a1-7c1e-7b8a-9a51-3f1f0f6a2b10",
  slug: "promo-dita",
  kind: "SYSTEM_PROMO",
  title: "Atenda no WhatsApp com o Dita",
  subtitle: "IA de atendimento",
  bodyMd: "Responde clientes e **chama você** quando precisa. <script>alert(1)</script>",
  cta: { label: "Conhecer o Dita", url: "https://dita.app.br" },
};

describe("NovidadesPage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("mostra as novidades do placement web.novidades, com selo, texto e botão", async () => {
    novidadesService.list.mockResolvedValue([promo]);

    renderPage(<NovidadesPage kit="candidate" />, { path: "/candidate/novidades" });

    expect(await screen.findByRole("heading", { name: "Atenda no WhatsApp com o Dita" })).toBeInTheDocument();
    expect(novidadesService.list).toHaveBeenCalledWith("web.novidades");
    expect(screen.getByText("Da Maaxis")).toBeInTheDocument();
    expect(screen.getByText("chama você").tagName).toBe("STRONG");
    // HTML do anúncio nunca é interpretado: aparece como texto.
    expect(screen.getByText(/<script>alert\(1\)<\/script>/)).toBeInTheDocument();
    expect(document.querySelector("script[src], script:not([type])")).toBeNull();
  });

  it("o clique no botão abre o link em outra aba e registra a métrica", async () => {
    novidadesService.list.mockResolvedValue([promo]);
    renderPage(<NovidadesPage kit="staff" />, { path: "/staff/novidades" });

    const link = await screen.findByRole("link", { name: "Conhecer o Dita" });
    expect(link).toHaveAttribute("href", "https://dita.app.br");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    await userEvent.setup().click(link);

    expect(novidadesService.click).toHaveBeenCalledWith(promo.id, "web.novidades");
  });

  it("sem novidade, estado vazio curto (e nunca erro)", async () => {
    novidadesService.list.mockResolvedValue([]);

    renderPage(<NovidadesPage kit="candidate" />, { path: "/candidate/novidades" });

    expect(await screen.findByText("Nenhuma novidade por enquanto.")).toBeInTheDocument();
  });
});
