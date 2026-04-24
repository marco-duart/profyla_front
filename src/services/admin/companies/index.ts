import api from "../../../configs/api";
import type { AdminCompany } from "./dto";

export async function listCompanies(): Promise<AdminCompany.Item[]> {
  const response = await api.get<AdminCompany.ListResponse>("/api/admins/companies");
  return response.data.companies ?? [];
}

export async function getCompany(id: number): Promise<AdminCompany.Item> {
  const response = await api.get<AdminCompany.Item>(`/api/admins/company/${id}`);
  return response.data;
}

export async function createCompany(params: AdminCompany.UpsertParams): Promise<void> {
  await api.post("/api/admins/company", params);
}

export async function updateCompany(id: number, params: Partial<AdminCompany.UpsertParams>): Promise<void> {
  await api.patch(`/api/admins/company/${id}`, params);
}

export async function deleteCompany(id: number): Promise<void> {
  await api.delete(`/api/admins/company/${id}`);
}
