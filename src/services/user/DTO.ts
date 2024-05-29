export namespace ChangeEmailDTO {
  export interface IParams {
    email: string;
    token: string;
  }
  export interface IResponse {
    message: string;
  }
}

export namespace ChangePasswordDTO {
  export interface IParams {
    current_password: string;
    new_password: string;
    token: string;
  }
  export interface IResponse {
    message: string;
  }
}

export namespace ChangeNewsletterDTO {
  export interface IParams {
    id: number;
    newsletter: boolean;
  }
  export interface IResponse {
    message: string;
  }
}

export namespace ChangePhotoDTO {
  export interface IParams {
    photo: File;
    token: string;
  }
  export interface IResponse {
    message: string;
  }
}

export namespace BanUserDTO {
  export interface IParams {
    user_id: number;
    ban_reason: string;
    token: string;
  }
  export interface IResponse {
    message: string;
  }
}
