import api from "../../../configs/api";
import type { AdminInterview } from "./dto";

export async function listInterviews(): Promise<AdminInterview.Item[]> {
  const response = await api.get<AdminInterview.Item[]>("/api/admins/interviews");
  return response.data ?? [];
}

export async function getInterview(id: number): Promise<AdminInterview.Item> {
  const response = await api.get<AdminInterview.Item>(`/api/admins/interview/${id}`);
  return response.data;
}

export async function createInterview(params: AdminInterview.UpsertParams): Promise<void> {
  await api.post("/api/admins/interview", params);
}

export async function updateInterview(id: number, params: Partial<AdminInterview.UpsertParams>): Promise<void> {
  await api.patch(`/api/admins/interview/${id}`, params);
}

export async function deleteInterview(id: number): Promise<void> {
  await api.delete(`/api/admins/interview/${id}`);
}
