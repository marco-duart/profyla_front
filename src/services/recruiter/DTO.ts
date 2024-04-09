type Recruiter = {
  id: number;
  name: string;
  email: string;
  position: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
};

type RecruiterDetail = {
  id: number;
  recruiter_id: number;
  name: string;
  email: string;
  position: string;
  photo_url: string;
  created_at: Date;
  updated_at: Date;
};

export namespace GetRecruiterDTO {
  export interface IParams {
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    recruiter: RecruiterDetail;
  }
}

export namespace CreateRecruiterDTO {
  export interface IParams {
    position: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    recruiter: Recruiter;
  }
}
