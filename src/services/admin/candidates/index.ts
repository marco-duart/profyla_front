import api from "../../../configs/api";
import type { AdminCandidate } from "./dto";

export async function listCandidates(search?: string): Promise<AdminCandidate.ListItem[]> {
  const response = await api.get<AdminCandidate.ListItem[]>("/api/admins/candidates", {
    params: search ? { search } : undefined,
  });
  return response.data;
}

export async function getCandidate(id: number): Promise<AdminCandidate.Detail> {
  const response = await api.get<AdminCandidate.Detail>(`/api/admins/candidate/${id}`);
  return response.data;
}
