export namespace AdminUser {
  export type Item = {
    id: number;
    name: string;
    email: string;
    role: string;
    banned: boolean;
    confirmed_at: string | null;
    is_recruiter: boolean;
    has_candidate: boolean;
  };
}
