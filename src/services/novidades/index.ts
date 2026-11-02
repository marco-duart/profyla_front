import api, { getStoredAuthHeaders } from "../../configs/api";
import {
  createNovidadesTracker,
  NOVIDADES_STALE_TIME_MS,
  novidadesFrom,
  type Novidade,
  type NovidadeEvent,
} from "../../utils/novidades";

// Placements do sistema "profyla" no Painel de Controle (db/seeds/001_catalog.sql do painel).
export type NovidadesPlacement = "web.dashboard" | "web.novidades";

// O feed muda por tipo de conta (candidato x equipe): a chave do cache leva o usuário logado.
const cache = new Map<string, { at: number; items: Novidade[] }>();
const cacheKey = (placement: NovidadesPlacement) => `${getStoredAuthHeaders()?.uid ?? "anon"}|${placement}`;

const tracker = createNovidadesTracker((events: NovidadeEvent[]) => {
  void api.post("/api/novidades/events", { events }).catch(() => undefined);
});
let flushTimer: ReturnType<typeof setTimeout> | undefined;

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = undefined;
    tracker.flush();
  }, 2_000);
}

export const novidadesService = {
  /** Erro ou painel fora = lista vazia: Novidades nunca mostra erro. */
  async list(placement: NovidadesPlacement): Promise<Novidade[]> {
    const key = cacheKey(placement);
    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < NOVIDADES_STALE_TIME_MS) return hit.items;
    try {
      const response = await api.get<unknown>("/api/novidades", { params: { placement } });
      const items = novidadesFrom(response.data);
      cache.set(key, { at: Date.now(), items });
      return items;
    } catch {
      return hit?.items ?? [];
    }
  },

  impression(announcementId: string, placement: NovidadesPlacement) {
    if (tracker.impression(announcementId, placement)) scheduleFlush();
  },

  click(announcementId: string, placement: NovidadesPlacement) {
    tracker.click(announcementId, placement);
    tracker.flush();
  },
};
