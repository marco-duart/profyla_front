import api from "../../configs/api";
import type {
  ApplicationDetail,
  CreateApplication,
  InterviewResponse,
  ListApplications,
  SubmitExamResponse,
  SubmitFormResponse,
  WithdrawApplication,
} from "./dto";

export async function listCandidateApplications(search?: string): Promise<ListApplications.Response> {
  const response = await api.get<ListApplications.Response>("/api/candidates/applications", {
    params: search ? { "q[hiring_process_stage_title_or_hiring_process_stage_hiring_process_job_posting_title_cont]": search } : undefined,
  });
  return response.data;
}

export async function createApplication(
  params: CreateApplication.Params,
): Promise<CreateApplication.Response> {
  const response = await api.post<CreateApplication.Response>("/api/candidates/application", params);
  return response.data;
}

export async function getApplicationDetail(id: number): Promise<ApplicationDetail.Response> {
  const response = await api.get<ApplicationDetail.Response>(`/api/candidates/application/${id}`);
  return response.data;
}

export async function withdrawApplication(
  id: number,
  params: WithdrawApplication.Params,
): Promise<WithdrawApplication.Response> {
  const response = await api.post<WithdrawApplication.Response>(`/api/candidates/application/${id}/withdraw`, params);
  return response.data;
}

export async function respondInterview(
  applicationId: number,
  params: InterviewResponse.Params,
): Promise<InterviewResponse.Response> {
  const response = await api.post<InterviewResponse.Response>(
    `/api/candidates/application/${applicationId}/interview-response`,
    params,
  );
  return response.data;
}

export async function submitFormResponse(
  params: SubmitFormResponse.Params,
): Promise<SubmitFormResponse.Response> {
  const response = await api.post<SubmitFormResponse.Response>("/api/candidates/application-form/response", params);
  return response.data;
}

export async function submitExamResponse(
  params: SubmitExamResponse.Params,
): Promise<SubmitExamResponse.Response> {
  const response = await api.post<SubmitExamResponse.Response>("/api/candidates/application-exam/response", params);
  return response.data;
}
