export namespace AdminInterview {
  export type Item = {
    id: number;
    application_status_id?: number;
    candidate_name?: string;
    stage_id: number;
    stage_title?: string;
    date_time: string;
    interview_type: string;
    interviewer: string;
    interview_method: string;
    resume?: string;
    recruiter_id?: number;
    status?: string;
    google_calendar_url?: string;
    suggested_datetime?: string | null;
    candidate_message?: string | null;
    created_at?: string;
    updated_at?: string;
  };

  export type UpsertParams = {
    application_status_id?: number;
    hiring_process_stage_id: number;
    date_time: string;
    interview_type: string;
    interviewer: string;
    interview_method: string;
    resume?: string;
  };
}
