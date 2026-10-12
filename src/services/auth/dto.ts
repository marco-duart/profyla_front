export namespace SignIn {
  export type Params = {
    email: string;
    password: string;
  };

  export type User = {
    id: number;
    email: string;
    name: string;
    role: "user" | "admin" | "ti";
  };

  export type Response = {
    data?: User;
  };
}

export namespace ValidateToken {
  export type Response = {
    success: boolean;
    data: SignIn.User;
  };
}

export namespace Register {
  export type Params = {
    name: string;
    cpf: string;
    email: string;
    password: string;
    password_confirmation: string;
    accept_terms: boolean;
    accept_privacy: boolean;
    confirm_success_url: string;
  };
}
