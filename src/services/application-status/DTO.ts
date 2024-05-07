type Application = {
  id: number;
  created_at: Date;
  updated_at: Date;
  candidate_id: number;
  hiring_process_stage_id: number;
};

export type ApplicationShow = {
  id: number;
  start_date: Date;
  end_date: Date;
  status: string;
  salary: number;
  business_name: string;
  title: string;
  stage: string;
}

export type ApplicationDetail = {
  job_name: string;
  stage: string;
  application: Application;
};

export namespace GetApplicationDTO {
  export interface IParams {
    prefix: string;
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    application: ApplicationDetail;
  }
}

export namespace GetApplicationsDTO {
  export interface IParams {
    prefix: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    applications: ApplicationShow[];
    pageable: {
      offset: number;
      page: number;
      page_size: number;
      total_page: number;
      total_item: number;
      paged: number;
    };
  }
}

export namespace CreateApplicationDTO {
  export interface IParams {
    hiring_process_stage_id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    application: Application;
  }
}

export namespace UpdateApplicationDTO {
  export interface IParams {
    application_id: number;
    hiring_process_stage_id: number;
    token: string;
    prefix: string;
  }
  export interface IResponse {
    message: string;
    application: Application;
  }
}

export namespace DeleteApplicationDTO {
  export interface IParams {
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    application: Application;
  }
}
