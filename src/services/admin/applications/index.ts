import api from "../../../configs/api";
import type { AdminApplication } from "./dto";

export async function listAdminApplications(search?: string): Promise<AdminApplication.Item[]> {
  const response = await api.get<AdminApplication.Item[]>("/api/admins/applications", {
    params: search
      ? { "q[hiring_process_stage_title_or_hiring_process_stage_hiring_process_job_posting_title_or_candidate_name_cont]": search }
      : undefined,
  });

  return response.data ?? [];
}

export async function moveApplicationStage(params: AdminApplication.MoveStageParams): Promise<void> {
  await api.patch("/api/admins/application", params);
}
