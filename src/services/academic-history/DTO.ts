type AcademicHistory = {
  id: number;
  title: string;
  institution: string;
  degree: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
  candidate_id: number;
};

export namespace GetAcademicHistoryDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    academic: AcademicHistory;
  }
}

export namespace GetAcademicHistoriesDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    academic: AcademicHistory[];
  }
}

export namespace CreateAcademicHistoryDTO {
  export interface IParams {
    title: string;
    institution: string;
    degree: string;
    start_date: Date;
    end_date: Date;
    token: string;
  }
  export interface IResponse {
    message: string;
    academic: AcademicHistory;
  }
}

export namespace UpdateAcademicHistoryDTO {
  export interface IParams {
    title?: string;
    institution?: string;
    degree?: string;
    start_date?: Date;
    end_date?: Date;
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    academic: AcademicHistory;
  }
}

export namespace DeleteAcademicHistoryDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    academic: AcademicHistory;
  }
}
