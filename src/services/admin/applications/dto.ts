export namespace AdminApplication {
  export type Item = {
    id: number;
    stage: string;
    stage_id: number;
    hiring_process_id: number;
    job_name: string;
    company_name: string;
    candidate_user_id?: number;
    candidate_name?: string;
    candidate_email?: string;
    job_location?: string;
    modality?: string;
    terminal_state: boolean;
    status_tone: "positive" | "negative" | "neutral";
    // Fit to the job (skills/knowledges overlap); score is null when the job lists nothing.
    match?: { score: number | null; matched: string[]; missing: string[] };
    scorecard?: { average: number | null; evaluations: number };
    created_at?: string;
    updated_at?: string;
  };

  export type MoveStageParams = {
    application_id: number;
    hiring_process_stage_id: number;
    feedback_title?: string;
    overall_assessment?: number;
    specific_comment?: string;
    improvements?: string;
  };
}
