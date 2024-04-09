type HiringProcess = {
  id: number;
  start_date: Date;
  end_date: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
  job_posting_id: number;
  recruiter_id: number;
};

type HiringProcessDetail = {
  id: number;
  start_date: Date;
  end_date: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
  job_posting_id: number;
  job_name: string;
  recruiter_id: string;
  stages: {
    id: number;
    title: string;
    hiring_process_id: number;
    dynamic_form_id: number;
    dynamic_exam_id: number;
    created_at: Date;
    updated_at: Date;
  }[];
};

export namespace GetHiringProcessDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    hiring: HiringProcessDetail;
  }
}

export namespace GetHiringProcessesDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    hirings: HiringProcess[];
  }
}

export namespace CreateHiringProcessDTO {
  export interface IParams {
    job_id: number;
    start_date: Date;
    end_date: Date;
    status: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    hiring: HiringProcess;
  }
}

export namespace UpdateHiringProcessDTO {
  export interface IParams {
    job_id?: number;
    start_date?: Date;
    end_date?: Date;
    status?: string;
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    hiring: HiringProcess;
  }
}

export namespace DeleteHiringProcessDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    hiring: HiringProcess;
  }
}
