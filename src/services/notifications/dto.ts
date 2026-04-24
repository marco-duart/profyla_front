export namespace NotificationList {
  export type Item = {
    id: number;
    title: string;
    notification_type: string;
    message: string;
    created_at: string;
  };

  export type Response = Item[];
}
