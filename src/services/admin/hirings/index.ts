import { downloadFile } from "../../../utils/download";
import { PAGE_SIZE, type Paged } from "../../pagination";
import api from "../../../configs/api";
import type { AdminHiring } from "./dto";

export async function listHirings(): Promise<AdminHiring.Item[]> {
  const response = await api.get<AdminHiring.Item[]>("/api/admins/hirings");
  return response.data ?? [];
}

export async function listHiringsPage(page: number, jobPostingId?: number, perPage = PAGE_SIZE): Promise<Paged<AdminHiring.Item>> {
  const response = await api.get<Paged<AdminHiring.Item>>("/api/admins/hirings", {
    params: { page, per_page: perPage, job_posting_id: jobPostingId },
  });
  return response.data;
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

export type PriorityAlertResult = { message: string; threshold: number; sent: number; below_threshold: number; already_applied: number };

// E-mails only the candidates whose skills fit the job (score >= threshold) and who opted in.
export async function alertCompatibleCandidates(id: number): Promise<PriorityAlertResult> {
  const response = await api.post<PriorityAlertResult>(`/api/admins/hiring/priority/${id}`);
  return response.data;
}


export const exportHiringApplicationsCsv = (id: number) => downloadFile(`/api/admins/hiring/${id}/export`, "candidaturas.csv");
