import api from "../../../configs/api";
import type { Scorecard } from "./dto";

export async function getCriteria(hiringId: number): Promise<Scorecard.Criterion[]> {
  const response = await api.get<Scorecard.Criterion[]>(`/api/admins/hiring/${hiringId}/criteria`);
  return response.data;
}

export async function saveCriteria(hiringId: number, criteria: string[]): Promise<Scorecard.Criterion[]> {
  const response = await api.put<Scorecard.Criterion[]>(`/api/admins/hiring/${hiringId}/criteria`, { criteria });
  return response.data;
}

export async function getScorecard(interviewId: number): Promise<Scorecard.Detail> {
  const response = await api.get<Scorecard.Detail>(`/api/admins/interview/${interviewId}/scorecard`);
  return response.data;
}

export async function saveScorecard(interviewId: number, scores: Record<number, number>, comment: string): Promise<Scorecard.Detail> {
  const response = await api.put<Scorecard.Detail>(`/api/admins/interview/${interviewId}/scorecard`, { scores, comment });
  return response.data;
}
