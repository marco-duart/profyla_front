export type JobPosting = {
  id: number;
  title: string;
  description: string;
  requirements: string;
  job_location: string;
  regime: string;
  modality: string;
  salary: string;
  work_schedule: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  company_id: number;
};

export namespace GetJobPostingDTO {
  export interface IParams {
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    job: JobPosting;
  }
}

export namespace GetJobPostingsDTO {
  export interface IParams {
    company_id: number; 
    token: string;
  }
  export interface IResponse {
    message: string;
    jobs: JobPosting[];
  }
}

export namespace CreateJobPostingDTO {
  export interface IParams {
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
    token: string;
  }
  export interface IResponse {
    message: string;
    job: JobPosting;
  }
}

export namespace UpdateJobPostingDTO {
  export interface IParams {
    title?: string;
    description?: string;
    requirements?: string;
    job_location?: string;
    regime?: string;
    modality?: string;
    salary?: string;
    work_schedule?: string;
    start_date?: string;
    end_date?: string;
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    job: JobPosting;
  }
}

export namespace DeleteJobPostingDTO {
  export interface IParams {
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    job: JobPosting;
  }
}
