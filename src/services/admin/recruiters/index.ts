import api from "../../../configs/api";
import type { AdminRecruiter } from "./dto";

export async function listRecruiters(): Promise<AdminRecruiter.Item[]> {
  const response = await api.get<AdminRecruiter.Item[]>("/api/admins/recruiters");
  return response.data ?? [];
}

export async function getRecruiter(userId: number): Promise<AdminRecruiter.Item> {
  const response = await api.get<AdminRecruiter.Item>(`/api/admins/recruiter/${userId}`);
  return response.data;
}

export async function createRecruiter(params: AdminRecruiter.CreateParams): Promise<void> {
  await api.post("/api/admins/recruiter", params);
}
