import { downloadFile } from "../../../utils/download";
import { PAGE_SIZE, type Paged } from "../../pagination";
import api from "../../../configs/api";
import type { AdminCandidate } from "./dto";

export async function listCandidates(search?: string): Promise<AdminCandidate.ListItem[]> {
  const response = await api.get<AdminCandidate.ListItem[]>("/api/admins/candidates", {
    params: search ? { search } : undefined,
  });
  return response.data;
}

export async function listCandidatesPage(page: number, search?: string, tag?: string, perPage = PAGE_SIZE): Promise<Paged<AdminCandidate.ListItem>> {
  const response = await api.get<Paged<AdminCandidate.ListItem>>("/api/admins/candidates", {
    params: { page, per_page: perPage, search: search || undefined, tag: tag || undefined },
  });
  return response.data;
}

export async function getCandidate(id: number): Promise<AdminCandidate.Detail> {
  const response = await api.get<AdminCandidate.Detail>(`/api/admins/candidate/${id}`);
  return response.data;
}

// Staff files are streamed through the API (authenticated and audited), never linked directly.
export const downloadCandidateCurriculum = (userId: number) =>
  downloadFile(`/api/admins/candidate/${userId}/curriculum_file`, "currículo.pdf");

export const downloadCandidateDocument = (userId: number, documentId: number) =>
  downloadFile(`/api/admins/candidate/${userId}/document_file/${documentId}`, "documento");

// CSV of the directory with the same filters as the screen (search / tag).
export function exportCandidatesCsv(search?: string, tag?: string) {
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (tag) query.set("tag", tag);
  return downloadFile(`/api/admins/candidates-export?${query.toString()}`, "candidatos.csv");
}
