import api from "../../../configs/api";
import type { EneagramaQuestions, EneagramaResult, SubmitEneagrama } from "./dto";

export async function getEneagramaQuestions(): Promise<EneagramaQuestions.Response> {
  const response = await api.get<EneagramaQuestions.Response>("/api/candidates/eneagrama-assessment/questions");
  return response.data;
}

export async function submitEneagramaAssessment(params: SubmitEneagrama.Params): Promise<SubmitEneagrama.Response> {
  const response = await api.post<SubmitEneagrama.Response>("/api/candidates/eneagrama-assessment", params);
  return response.data;
}

export async function getEneagramaResult(): Promise<EneagramaResult.Response> {
  const response = await api.get<EneagramaResult.Response>("/api/candidates/eneagrama-assessment");
  return response.data;
}
