// Maps internal values coming from the API to the text shown to people. Unknown values are
// shown capitalized instead of leaking raw identifiers.
function humanize(value: string): string {
  const text = value.replace(/_/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function labelFrom(map: Record<string, string>, value?: string | null): string {
  if (!value) return "-";
  return map[value.toLowerCase()] ?? humanize(value);
}

const INTERVIEW_TYPES: Record<string, string> = {
  online: "Online",
  presencial: "Presencial",
  telefone: "Telefone",
  hibrido: "Híbrido",
};

const INTERVIEW_METHODS: Record<string, string> = {
  solo: "Individual",
  individual: "Individual",
  grupo: "Em grupo",
  painel: "Painel",
  dinamica: "Dinâmica de grupo",
};

// Interview status as seen by the candidate (what is expected of them).
const INTERVIEW_STATUS_CANDIDATE: Record<string, string> = {
  pendente: "Aguardando sua resposta",
  aceita: "Presença confirmada",
  recusada: "Você recusou",
  reagendamento_solicitado: "Reagendamento solicitado",
};

// Interview status as seen by staff (what the candidate answered).
const INTERVIEW_STATUS_STAFF: Record<string, string> = {
  pendente: "Aguardando resposta do candidato",
  aceita: "Candidato confirmou",
  recusada: "Candidato recusou",
  reagendamento_solicitado: "Candidato pediu reagendamento",
};

const HIRING_STATUS: Record<string, string> = {
  draft: "Rascunho",
  open: "Aberto",
  paused: "Pausado",
  closed: "Encerrado",
};

export const interviewTypeLabel = (value?: string | null) => labelFrom(INTERVIEW_TYPES, value);
export const interviewMethodLabel = (value?: string | null) => labelFrom(INTERVIEW_METHODS, value);
export const interviewStatusLabel = (value?: string | null, audience: "candidate" | "staff" = "candidate") =>
  labelFrom(audience === "candidate" ? INTERVIEW_STATUS_CANDIDATE : INTERVIEW_STATUS_STAFF, value);
export const hiringStatusLabel = (value?: string | null) => labelFrom(HIRING_STATUS, value);
