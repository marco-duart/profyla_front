import api from "../../../configs/api";
import type { AdminExam } from "./dto";

export async function listExams(): Promise<AdminExam.Item[]> {
  const response = await api.get<AdminExam.Item[]>("/api/admins/exams");
  return response.data ?? [];
}

export async function getExam(id: number): Promise<AdminExam.Item> {
  const response = await api.get<AdminExam.Item>(`/api/admins/exam/${id}`);
  return response.data;
}

export async function createExam(params: AdminExam.UpsertParams): Promise<void> {
  await api.post("/api/admins/exam", params);
}

export async function updateExam(id: number, params: Partial<AdminExam.UpsertParams>): Promise<void> {
  await api.patch(`/api/admins/exam/${id}`, params);
}

export async function deleteExam(id: number): Promise<void> {
  await api.delete(`/api/admins/exam/${id}`);
}

export async function createExamQuestion(id: number, params: AdminExam.CreateQuestionParams): Promise<void> {
  await api.post(`/api/admins/exam/${id}/question`, params);
}
