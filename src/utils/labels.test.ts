import { hiringStatusLabel, interviewMethodLabel, interviewStatusLabel, interviewTypeLabel } from "./labels";

describe("domain labels", () => {
  it("maps interview types and methods", () => {
    expect(interviewTypeLabel("online")).toBe("Online");
    expect(interviewTypeLabel("presencial")).toBe("Presencial");
    expect(interviewMethodLabel("solo")).toBe("Individual");
  });

  it("shows the interview status from each point of view", () => {
    expect(interviewStatusLabel("pendente")).toBe("Aguardando sua resposta");
    expect(interviewStatusLabel("pendente", "staff")).toBe("Aguardando resposta do candidato");
    expect(interviewStatusLabel("reagendamento_solicitado")).toBe("Reagendamento solicitado");
  });

  it("maps the hiring process status", () => {
    expect(hiringStatusLabel("open")).toBe("Aberto");
    expect(hiringStatusLabel("closed")).toBe("Encerrado");
  });

  it("humanizes unknown values instead of leaking raw identifiers", () => {
    expect(interviewTypeLabel("video_call")).toBe("Video call");
    expect(interviewTypeLabel(null)).toBe("-");
  });
});
