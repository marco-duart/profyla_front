import { screen } from "@testing-library/react";
import { NovidadesBlock } from "./index";
import { renderPage } from "../../test/render";

const novidadesService = vi.hoisted(() => ({ list: vi.fn(), impression: vi.fn(), click: vi.fn() }));
vi.mock("../../services/novidades", () => ({ novidadesService }));

describe("NovidadesBlock", () => {
  beforeEach(() => vi.clearAllMocks());

  it("no início mostra o título e o link 'Ver todas' quando há novidade", async () => {
    novidadesService.list.mockResolvedValue([{ id: "a1", slug: "x", kind: "GENERAL", title: "Manutenção no sábado" }]);

    renderPage(<NovidadesBlock seeAllTo="/candidate/novidades" />, { path: "/candidate/home" });

    expect(await screen.findByText("Manutenção no sábado")).toBeInTheDocument();
    expect(novidadesService.list).toHaveBeenCalledWith("web.dashboard");
    expect(screen.getByRole("link", { name: "Ver todas" })).toHaveAttribute("href", "/candidate/novidades");
  });

  it("sem novidade não renderiza nada, nem título nem espaço", async () => {
    novidadesService.list.mockResolvedValue([]);

    const { container } = renderPage(<NovidadesBlock seeAllTo="/staff/novidades" />, { path: "/staff/home" });

    await vi.waitFor(() => expect(novidadesService.list).toHaveBeenCalled());
    expect(screen.queryByText("Novidades")).toBeNull();
    expect(container).toBeEmptyDOMElement();
  });
});
