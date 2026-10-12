export namespace CandidateAnnotation {
  export type Note = {
    id: number;
    body: string;
    author_user_id: number | null;
    author_name: string | null;
    created_at: string;
  };

  export type TagCount = { name: string; count: number };
}
