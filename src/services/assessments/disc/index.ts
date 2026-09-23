import api from "../../../configs/api";
import type { DiscQuestions, DiscResult, SubmitDisc } from "./dto";

export async function getDiscQuestions(): Promise<DiscQuestions.Response> {
  const response = await api.get<DiscQuestions.Response>("/api/candidates/disc-assessment/questions");
  return response.data;
}

export async function submitDiscAssessment(params: SubmitDisc.Params): Promise<SubmitDisc.Response> {
  const response = await api.post<SubmitDisc.Response>("/api/candidates/disc-assessment", params);
  return response.data;
}

export async function getDiscResult(): Promise<DiscResult.Response> {
  const response = await api.get<DiscResult.Response>("/api/candidates/disc-assessment");
  return response.data;
}
