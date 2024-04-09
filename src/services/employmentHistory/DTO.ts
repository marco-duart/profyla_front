type EmploymentHistory = {
  id: number;
  company_name: string;
  position: string;
  start_date: Date;
  end_date: Date;
  achievements: string;
  created_at: Date;
  updated_at: Date;
  candidate_id: number;
};

export namespace GetEmploymentHistoryDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    employment: EmploymentHistory;
  }
}

export namespace GetEmploymentHistoriesDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    employment: EmploymentHistory[];
  }
}

export namespace CreateEmploymentHistoryDTO {
  export interface IParams {
    company_name: string;
    position: string;
    start_date: Date;
    end_date: Date;
    achievements: String;
    token: string;
  }
  export interface IResponse {
    message: string;
    employment: EmploymentHistory;
  }
}

export namespace UpdateEmploymentHistoryDTO {
  export interface IParams {
    company_name?: string;
    position?: string;
    start_date?: Date;
    end_date?: Date;
    achievements?: String;
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    employment: EmploymentHistory;
  }
}

export namespace DeleteEmploymentHistoryDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    employment: EmploymentHistory;
  }
}
