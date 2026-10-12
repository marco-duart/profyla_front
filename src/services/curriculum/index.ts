import api from "../../configs/api";
import type { CatalogItem, CreateAcademic, CreateDocument, CreateEmployment, CreateLink, CurriculumData } from "./dto";

export async function getCurriculum(): Promise<CurriculumData.Response> {
  const response = await api.get<CurriculumData.Response>("/api/candidates/curriculum");
  return response.data;
}

export async function createAcademic(params: CreateAcademic.Params): Promise<void> {
  await api.post("/api/candidates/academic", params);
}

export async function updateAcademic(id: number, params: Partial<CreateAcademic.Params>): Promise<void> {
  await api.patch(`/api/candidates/academic/${id}`, params);
}

export async function deleteAcademic(id: number): Promise<void> {
  await api.delete(`/api/candidates/academic/${id}`);
}

export async function createEmployment(params: CreateEmployment.Params): Promise<void> {
  await api.post("/api/candidates/employment", params);
}

export async function updateEmployment(id: number, params: Partial<CreateEmployment.Params>): Promise<void> {
  await api.patch(`/api/candidates/employment/${id}`, params);
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

export async function getSkillsCatalog(): Promise<CatalogItem.Item[]> {
  const response = await api.get<CatalogItem.Item[]>("/api/candidates/skills-catalog");
  return response.data ?? [];
}

export async function addSkill(skillId: number): Promise<void> {
  await api.post("/api/candidates/skill", { candidate_skills_attributes: [{ skill_id: skillId }] });
}

export async function removeSkill(candidateSkillId: number): Promise<void> {
  await api.delete(`/api/candidates/skill/${candidateSkillId}`);
}

export async function getKnowledgesCatalog(): Promise<CatalogItem.Item[]> {
  const response = await api.get<CatalogItem.Item[]>("/api/candidates/knowledges-catalog");
  return response.data ?? [];
}

export async function addKnowledge(knowledgeId: number): Promise<void> {
  await api.post("/api/candidates/knowledge", { candidate_knowledges_attributes: [{ knowledge_id: knowledgeId }] });
}

export async function removeKnowledge(candidateKnowledgeId: number): Promise<void> {
  await api.delete(`/api/candidates/knowledge/${candidateKnowledgeId}`);
}

function documentFormData(params: CreateDocument.Params): FormData {
  const formData = new FormData();
  formData.append("document_name", params.document_name);
  formData.append("document_number", params.document_number);
  if (params.issue_date) formData.append("issue_date", params.issue_date);
  if (params.location) formData.append("location", params.location);
  if (params.image) formData.append("image", params.image);
  return formData;
}

export async function uploadCurriculumFile(file: File): Promise<CurriculumData.Response> {
  const form = new FormData();
  form.append("file", file);
  const response = await api.put<CurriculumData.Response>("/api/candidates/curriculum/file", form, {
    headers: { "Content-Type": undefined },
  });
  return response.data;
}

export async function deleteCurriculumFile(): Promise<CurriculumData.Response> {
  const response = await api.delete<CurriculumData.Response>("/api/candidates/curriculum/file");
  return response.data;
}

export async function createDocument(params: CreateDocument.Params): Promise<void> {
  await api.post("/api/candidates/document", documentFormData(params), {
    headers: { "Content-Type": undefined },
  });
}

export async function deleteDocument(id: number): Promise<void> {
  await api.delete(`/api/candidates/document/${id}`);
}
