export type Notification = {
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
    notification: Notification;
  }
}

export namespace GetNotificationsDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    notifications: Notification[];
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
    notification: Notification;
  }
}

export namespace UpdateNotificationsDTO {
  export interface IParams {
    user_notification_id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    notification: Notification;
  }
}

export namespace DeleteNotificationsDTO {
  export interface IParams {
    user_notification_id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    notification: Notification;
  }
}
