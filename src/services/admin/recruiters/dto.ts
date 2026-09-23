export namespace AdminRecruiter {
  export type Item = {
    id: number;
    recruiter_id: number;
    name: string;
    email: string;
    position: string;
    photo_url?: string | null;
    created_at?: string;
    updated_at?: string;
  };

  export type CreateParams = {
    user_id: number;
    position: string;
  };
}
