export type Notifications = {
  user_notification_id: number;
  viewed: boolean;
  viewed_at: Date;
  id: number;
  title: string;
  notification_type: string;
  message: string;
  created_at: string;
  updated_at: string;
};

export namespace GetNotificationDTO {
  export interface IParams {
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    notification: Notifications;
  }
}

export namespace GetNotificationsDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    notifications: Notifications[];
  }
}

export namespace CreateNotificationsDTO {
  export interface IParams {
    viewed: boolean;
    viewed_at: Date;
    id: number;
    title: string;
    notification_type: string;
    message: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    notification: Notifications;
  }
}

export namespace UpdateNotificationsDTO {
  export interface IParams {
    viewed: boolean;
    viewed_at: Date;
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    notification: Notifications;
  }
}

export namespace DeleteNotificationsDTO {
  export interface IParams {
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    notification: Notifications;
  }
}
