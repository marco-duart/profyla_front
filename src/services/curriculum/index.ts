import api from "../../configs/api";
import type { CreateAcademic, CreateEmployment, CreateLink, CurriculumData } from "./dto";

export async function getCurriculum(): Promise<CurriculumData.Response> {
  const response = await api.get<CurriculumData.Response>("/api/candidates/curriculum");
  return response.data;
}

export async function createAcademic(params: CreateAcademic.Params): Promise<void> {
  await api.post("/api/candidates/academic", params);
}

export async function deleteAcademic(id: number): Promise<void> {
  await api.delete(`/api/candidates/academic/${id}`);
}

export async function createEmployment(params: CreateEmployment.Params): Promise<void> {
  await api.post("/api/candidates/employment", params);
}

export async function deleteEmployment(id: number): Promise<void> {
  await api.delete(`/api/candidates/employment/${id}`);
}

export async function createProfessionalLink(params: CreateLink.Params): Promise<void> {
  await api.post("/api/candidates/professional", params);
}

export async function deleteProfessionalLink(id: number): Promise<void> {
  await api.delete(`/api/candidates/professional/${id}`);
}

export async function createSocialLink(params: CreateLink.Params): Promise<void> {
  await api.post("/api/candidates/social", params);
}

export async function deleteSocialLink(id: number): Promise<void> {
  await api.delete(`/api/candidates/social/${id}`);
}
