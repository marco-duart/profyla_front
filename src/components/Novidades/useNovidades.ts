import { useEffect, useState } from "react";
import { novidadesService, type NovidadesPlacement } from "../../services/novidades";
import type { Novidade } from "../../utils/novidades";

/** `data` é null enquanto carrega; erro e painel fora chegam como lista vazia (o serviço já trata). */
export function useNovidades(placement: NovidadesPlacement): { data: Novidade[] | null; loading: boolean } {
  const [state, setState] = useState<{ placement: NovidadesPlacement; items: Novidade[] } | null>(null);

  useEffect(() => {
    let active = true;
    void novidadesService.list(placement).then((items) => {
      if (active) setState({ placement, items });
    });
    return () => {
      active = false;
    };
  }, [placement]);

  const ready = state?.placement === placement;
  return { data: ready ? state.items : null, loading: !ready };
}
