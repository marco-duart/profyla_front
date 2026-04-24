import api from "../../../configs/api";
import type { AdminHiring } from "./dto";

export async function listHirings(): Promise<AdminHiring.Item[]> {
  const response = await api.get<AdminHiring.Item[]>("/api/admins/hirings");
  return response.data ?? [];
}

export async function getHiring(id: number): Promise<AdminHiring.Detail> {
  const response = await api.get<AdminHiring.Detail>(`/api/admins/hiring/${id}`);
  return response.data;
}

export async function createHiring(params: AdminHiring.UpsertParams): Promise<void> {
  await api.post("/api/admins/hiring", params);
}

export async function updateHiring(
  id: number,
  params: Partial<Pick<AdminHiring.UpsertParams, "start_date" | "end_date" | "status">>,
): Promise<void> {
  await api.patch(`/api/admins/hiring/${id}`, params);
}

export async function deleteHiring(id: number): Promise<void> {
  await api.delete(`/api/admins/hiring/${id}`);
}
