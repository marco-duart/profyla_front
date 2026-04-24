import api from "../../configs/api";
import type { OpportunityDetail, OpportunityList } from "./dto";

export async function listOpportunities(search?: string): Promise<OpportunityList.Response> {
  const response = await api.get<OpportunityList.Response>("/api/candidates/opportunities", {
    params: search ? { "q[job_posting_title_cont]": search } : undefined,
  });

  return response.data;
}

export async function getOpportunityDetails(id: number): Promise<OpportunityDetail.Response> {
  const response = await api.get<OpportunityDetail.Response>(`/api/candidates/opportunity/${id}`);
  return response.data;
}
