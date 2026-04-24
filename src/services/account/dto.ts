export namespace Account {
  export type Response = {
    id: number;
    name: string;
    email: string;
    cpf: string;
    role: string;
    confirmed_at: string | null;
    candidate_id: number | null;
  };
}

export namespace UpdateAccount {
  export type Params = {
    name?: string;
    email?: string;
  };

  export type Response = {
    message: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export namespace UpdatePassword {
  export type Params = {
    password: string;
    password_confirmation: string;
  };

  export type Response = {
    message: string;
  };
}
