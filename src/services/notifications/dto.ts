export namespace NotificationList {
  export type Item = {
    id: number;
    kind: string;
    title: string;
    body: string | null;
    link: string | null;
    read: boolean;
    created_at: string;
  };

  export type Response = {
    unread_count: number;
    records: Item[];
  };
}
