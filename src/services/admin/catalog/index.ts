import api from "../../../configs/api";

export type CatalogEntry = { id: number; title: string };

export async function listSkillsCatalog(): Promise<CatalogEntry[]> {
  const response = await api.get<CatalogEntry[]>("/api/admins/skills");
  return response.data ?? [];
}

export async function listKnowledgesCatalog(): Promise<CatalogEntry[]> {
  const response = await api.get<CatalogEntry[]>("/api/admins/knowledges");
  return response.data ?? [];
}
