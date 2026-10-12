import axios from "axios";
import { env } from "../../configs/env";
import type { PublicJobs } from "./dto";

// Public endpoints: a plain client with NO auth headers (and no 401 handling).
const publicApi = axios.create({ baseURL: env.BASE_URL });

export async function listPublicJobs(params: { search?: string; page?: number }): Promise<PublicJobs.List> {
  const response = await publicApi.get<PublicJobs.List>("/api/public/jobs", { params: { search: params.search || undefined, page: params.page ?? 1, per_page: 12 } });
  return response.data;
}

export async function getPublicJob(id: number): Promise<PublicJobs.Detail> {
  const response = await publicApi.get<PublicJobs.Detail>(`/api/public/jobs/${id}`);
  return response.data;
}

export async function getPublicCompanyJobs(id: number, page = 1): Promise<PublicJobs.CompanyPage> {
  const response = await publicApi.get<PublicJobs.CompanyPage>(`/api/public/companies/${id}/jobs`, { params: { page, per_page: 12 } });
  return response.data;
}
