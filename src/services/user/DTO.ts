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
