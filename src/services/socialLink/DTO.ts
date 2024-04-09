type SocialLink = {
  id: number;
  title: string;
  link: string;
  created_at: Date;
  updated_at: Date;
  candidate_id: number;
};

export namespace GetSocialLinkDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    social: SocialLink;
  }
}

export namespace GetSocialLinksDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    social: SocialLink[];
  }
}

export namespace CreateSocialLinkDTO {
  export interface IParams {
    title: string;
    link: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    social: SocialLink;
  }
}

export namespace UpdateSocialLinkDTO {
  export interface IParams {
    title: string;
    link: string;
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    social: SocialLink;
  }
}

export namespace DeleteSocialLinkDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    social: SocialLink;
  }
}
