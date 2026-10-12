import { format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// Single place for date display (pt-BR). parseISO reads date-only values ("1992-03-04") as local
// dates, so they never shift by a day the way `new Date("1992-03-04")` does in Brazil.
function toDate(value?: string | null): Date | null {
  if (!value) return null;
  const date = parseISO(value);
  return isValid(date) ? date : null;
}

export function formatDate(value?: string | null, fallback = "-"): string {
  const date = toDate(value);
  return date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : fallback;
}

export function formatDateTime(value?: string | null, fallback = "-"): string {
  const date = toDate(value);
  return date ? format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR }) : fallback;
}

const WEEKDAYS = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];

// "ter., 14/10/2026 às 14:30" (same style as the e-mails)
export function formatDateTimeLong(value?: string | null, fallback = "-"): string {
  const date = toDate(value);
  if (!date) return fallback;
  return `${WEEKDAYS[date.getDay()]}, ${format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`;
}
