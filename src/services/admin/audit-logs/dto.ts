export namespace AuditLog {
  export type Item = {
    id: number;
    action: string;
    actor: { id: number; name: string; role: string } | null;
    subject_type: string | null;
    subject_id: number | null;
    metadata: Record<string, unknown> | null;
    ip: string | null;
    created_at: string;
  };

  export type Filters = {
    action_name?: string;
    actor_user_id?: string;
    subject_id?: string;
    from?: string;
    to?: string;
    page?: number;
    per_page?: number;
  };

  export type Response = {
    records: Item[];
    pagination: { page: number; per_page: number; total_count: number; total_pages: number };
  };
}
