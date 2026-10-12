import api from "../../../configs/api";
import type { CandidateAnnotation } from "./dto";

export async function listNotes(userId: number): Promise<CandidateAnnotation.Note[]> {
  const response = await api.get<CandidateAnnotation.Note[]>(`/api/admins/candidate/${userId}/notes`);
  return response.data;
}

export async function addNote(userId: number, body: string): Promise<CandidateAnnotation.Note> {
  const response = await api.post<CandidateAnnotation.Note>(`/api/admins/candidate/${userId}/notes`, { body });
  return response.data;
}

export async function removeNote(userId: number, noteId: number): Promise<void> {
  await api.delete(`/api/admins/candidate/${userId}/notes/${noteId}`);
}

export async function setTags(userId: number, tags: string[]): Promise<string[]> {
  const response = await api.put<{ tags: string[] }>(`/api/admins/candidate/${userId}/tags`, { tags });
  return response.data.tags;
}

export async function listAllTags(): Promise<CandidateAnnotation.TagCount[]> {
  const response = await api.get<CandidateAnnotation.TagCount[]>("/api/admins/candidate-tags");
  return response.data;
}
