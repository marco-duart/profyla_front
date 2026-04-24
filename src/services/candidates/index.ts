import api from "../../configs/api";
import type { CreateCandidateProfile } from "./dto";

export async function createCandidateProfile(
  params: CreateCandidateProfile.Params,
): Promise<CreateCandidateProfile.Response> {
  const response = await api.post<CreateCandidateProfile.Response>("/api/candidates", params);
  return response.data;
}
