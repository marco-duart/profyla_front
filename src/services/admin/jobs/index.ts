import { PAGE_SIZE, type Paged } from "../../pagination";
import api from "../../../configs/api";
import type { AdminJob } from "./dto";

export async function listJobs(): Promise<AdminJob.Item[]> {
  const response = await api.get<AdminJob.Item[]>("/api/admins/jobs");
  return response.data ?? [];
}

export async function listJobsPage(page: number, companyId?: number, perPage = PAGE_SIZE): Promise<Paged<AdminJob.Item>> {
  const response = await api.get<Paged<AdminJob.Item>>("/api/admins/jobs", { params: { page, per_page: perPage, company_id: companyId } });
  return response.data;
}

export async function getJob(id: number): Promise<AdminJob.Item> {
  const response = await api.get<AdminJob.Item>(`/api/admins/job/${id}`);
  return response.data;
}

export async function createJob(params: AdminJob.UpsertParams): Promise<void> {
  await api.post("/api/admins/job", params);
}

export async function updateJob(id: number, params: Partial<AdminJob.UpsertParams>): Promise<void> {
  await api.patch(`/api/admins/job/${id}`, params);
}

export async function deleteJob(id: number): Promise<void> {
  await api.delete(`/api/admins/job/${id}`);
}
