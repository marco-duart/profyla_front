type JobPosting = {
  id: number;
  title: string;
  description: string;
  requirements: string;
  job_location: string;
  regime: string;
  modality: string;
  salary: string;
  work_schedule: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
  company_id: number;
};

export namespace GetJobPostingDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    job: JobPosting;
  }
}

export namespace GetJobPostingsDTO {
  export interface IParams {
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
    start_date: Date;
    end_date: Date;
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
    start_date?: Date;
    end_date?: Date;
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    job: JobPosting;
  }
}

export namespace DeleteJobPostingDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    job: JobPosting;
  }
}
