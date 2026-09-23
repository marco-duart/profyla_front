import api from "../../../configs/api";
import type { AdminCandidate } from "./dto";

export async function getCandidate(id: number): Promise<AdminCandidate.Detail> {
  const response = await api.get<AdminCandidate.Detail>(`/api/admins/candidate/${id}`);
  return response.data;
}
