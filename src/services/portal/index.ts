import api from "../../configs/api";
import type { HomeData } from "./dto";

export async function getCandidateHomeData(): Promise<HomeData.Response> {
  const response = await api.get<HomeData.Response>("/api/candidates/home");
  return response.data;
}
