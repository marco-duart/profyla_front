type ProfessionalLink = {
  id: number;
  title: string;
  link: string;
  created_at: Date;
  updated_at: Date;
  candidate_id: number;
};

export namespace GetProfessionalLinkDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    professional: ProfessionalLink;
  }
}

export namespace GetProfessionalLinksDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    professional: ProfessionalLink[];
  }
}

export namespace CreateProfessionalLinkDTO {
  export interface IParams {
    title: string;
    link: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    professional: ProfessionalLink;
  }
}

export namespace UpdateProfessionalLinkDTO {
  export interface IParams {
    title: string;
    link: string;
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    professional: ProfessionalLink;
  }
}

export namespace DeleteProfessionalLinkDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    professional: ProfessionalLink;
  }
}
