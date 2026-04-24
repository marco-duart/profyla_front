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
