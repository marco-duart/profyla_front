import type { Pagination as PaginationData } from "../../services/pagination";
import { Actions, Button, Meta } from "./styles";

type PaginationProps = {
  pagination: PaginationData | null;
  loading?: boolean;
  onChange: (page: number) => void;
};

// "Anterior / Página X de Y / Próxima" for the paged staff lists. Renders nothing for a single page.
export function Pagination({ pagination, loading = false, onChange }: PaginationProps) {
  if (!pagination || pagination.total_pages <= 1) return null;

  return (
    <Actions role="navigation" aria-label="Paginação" css={{ alignItems: "center", justifyContent: "space-between" }}>
      <Button type="button" disabled={pagination.page <= 1 || loading} onClick={() => onChange(pagination.page - 1)}>
        Anterior
      </Button>
      <Meta aria-live="polite">
        Página {pagination.page} de {pagination.total_pages} · {pagination.total_count} registros
      </Meta>
      <Button type="button" disabled={pagination.page >= pagination.total_pages || loading} onClick={() => onChange(pagination.page + 1)}>
        Próxima
      </Button>
    </Actions>
  );
}
