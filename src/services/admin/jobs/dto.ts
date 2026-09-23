export namespace AdminJob {
  export type Item = {
    id: number;
    company_id: number;
    title: string;
    description?: string;
    requirements?: string;
    job_location?: string;
    regime?: string;
    modality?: string;
    salary?: string;
    work_schedule?: string;
    start_date?: string;
    end_date?: string;
    image_url?: string;
    created_at?: string;
    updated_at?: string;
  };

  export type UpsertParams = {
    company_id: number;
    title: string;
    description: string;
    requirements: string;
    job_location: string;
    regime: string;
    modality: string;
    salary: string;
    work_schedule: string;
    start_date?: string;
    end_date?: string;
  };
}
