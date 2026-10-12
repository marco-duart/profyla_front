export namespace Account {
  export type Response = {
    id: number;
    name: string;
    email: string;
    cpf: string;
    role: string;
    confirmed_at: string | null;
    candidate_id: number | null;
    photo_url?: string | null;
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

export namespace EmailPreferences {
  export type Category = "opportunities" | "birthday" | "digest";
  export type Preferences = Record<Category, boolean>;
  export type Response = { preferences: Preferences };
}
