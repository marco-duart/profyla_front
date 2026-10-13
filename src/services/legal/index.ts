import api from "../../configs/api";
import type { Legal } from "./dto";

export async function getLegalDocument(kind: Legal.Kind): Promise<Legal.Document> {
  const response = await api.get<Legal.Document>(`/api/legal/${kind}`);
  return response.data;
}

export async function getConsents(): Promise<Legal.Consents> {
  const response = await api.get<Legal.Consents>("/api/account/consents");
  return response.data;
}

export async function acceptConsents(kinds?: Legal.Kind[]): Promise<Legal.Consents> {
  const response = await api.post<Legal.Consents>("/api/account/consents", { kinds });
  return response.data;
}

export async function revokeConsent(kind: Legal.Kind): Promise<Legal.Consents> {
  const response = await api.delete<Legal.Consents>(`/api/account/consents/${kind}`);
  return response.data;
}

// Lets the ConsentGate (mounted once, above the pages) re-check right after a revoke/accept.
export const CONSENTS_CHANGED_EVENT = "profyla:consents-changed";
