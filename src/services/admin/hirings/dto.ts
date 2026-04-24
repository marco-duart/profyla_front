export namespace AdminHiring {
  export type Stage = {
    id: number;
    title: string;
    hiring_process_id: number;
    dynamic_form_id?: number | null;
    dynamic_exam_id?: number | null;
  };

  export type Item = {
    id: number;
    job_posting_id: number;
    recruiter_id: number;
    start_date?: string;
    end_date?: string;
    status: string;
    created_at?: string;
    updated_at?: string;
  };

  export type Detail = Item & {
    job_name: string;
    stages: Stage[];
  };

  export type UpsertParams = {
    job_id: number;
    start_date: string;
    end_date: string;
    status: string;
    dynamic_form_id?: number;
    dynamic_exam_id?: number;
  };
}
