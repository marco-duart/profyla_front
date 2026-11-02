import api, { clearStoredAuthHeaders, setStoredAuthHeaders } from "../../configs/api";
import { novidadesService } from "./index";

const get = vi.spyOn(api, "get");
const post = vi.spyOn(api, "post");
const item = { id: "0192f0a1-7c1e-7b8a-9a51-3f1f0f6a2b10", slug: "promo-dita", kind: "SYSTEM_PROMO", title: "Atenda no WhatsApp com o Dita" };

const signIn = (uid: string) => setStoredAuthHeaders({ accessToken: "t", client: "c", uid, tokenType: "Bearer" });

describe("novidadesService", () => {
  beforeEach(() => {
    get.mockReset();
    post.mockReset();
    post.mockResolvedValue({ data: null });
    clearStoredAuthHeaders();
  });

  it("pede o placement ao backend do Profyla e guarda por 5 minutos", async () => {
    signIn("ana@exemplo.com");
    get.mockResolvedValue({ data: { data: [item], placement: "web.dashboard" } });

    const first = await novidadesService.list("web.dashboard");
    const second = await novidadesService.list("web.dashboard");

    expect(first.map((n) => n.title)).toEqual(["Atenda no WhatsApp com o Dita"]);
    expect(second).toEqual(first);
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/api/novidades", { params: { placement: "web.dashboard" } });
  });

  it("o cache não passa de um usuário para outro (candidato x equipe veem feeds diferentes)", async () => {
    get.mockResolvedValueOnce({ data: { data: [item] } }).mockResolvedValueOnce({ data: { data: [] } });

    signIn("candidata@profyla.com");
    expect(await novidadesService.list("web.novidades")).toHaveLength(1);
    signIn("recrutadora@profyla.com");
    expect(await novidadesService.list("web.novidades")).toHaveLength(0);

    expect(get).toHaveBeenCalledTimes(2);
  });

  it("erro do backend vira lista vazia, sem lançar", async () => {
    signIn("falha@exemplo.com");
    get.mockRejectedValue(new Error("500"));

    await expect(novidadesService.list("web.dashboard")).resolves.toEqual([]);
  });

  it("o clique é enviado na hora, em lote, para /api/novidades/events", () => {
    novidadesService.click(item.id, "web.novidades");

    expect(post).toHaveBeenCalledWith("/api/novidades/events", { events: [{ announcementId: item.id, placement: "web.novidades", type: "CLICK" }] });
  });
});
