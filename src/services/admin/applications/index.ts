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

// Moves several applications at once; the server applies it in one transaction (all or none).
export async function moveApplicationsBatch(params: {
  application_ids: number[];
  hiring_process_stage_id: number;
  feedback_title?: string;
  specific_comment?: string;
}): Promise<{ moved: number; message: string }> {
  const response = await api.patch<{ moved: number; message: string }>("/api/admins/applications/batch", params);
  return response.data;
}
