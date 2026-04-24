export type StatusTone = "positive" | "negative" | "neutral";

export function getStatusLabel(stage: string): string {
  switch (stage) {
    case "DESISTIU":
      return "Encerrada por desistencia";
    case "REPROVADO":
      return "Processo encerrado";
    case "CONTRATADO":
      return "Contratacao concluida";
    case "TRIAGEM":
      return "Em triagem";
    default:
      return stage;
  }
}

export function getStatusToneColor(tone: StatusTone): string {
  switch (tone) {
    case "positive":
      return "$success";
    case "negative":
      return "$error";
    default:
      return "$brandStrong";
  }
}
