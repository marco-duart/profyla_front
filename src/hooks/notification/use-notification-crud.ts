import { useEffect, useState } from "react";

import { useUserContext } from "../use-user-context";
import {
  CreateNotifications,
  DeleteNotifications,
  GetNotifications,
  GetNotification,
  UpdateNotifications,
} from "../../services/notifications/index";

import { Notification } from "../../services/notifications/DTO";

type State = {
  notifications: undefined | Notification[];
};

const INITIAL_STATE = {
  notifications: undefined,
};

export type CreateNotificationData = {
  user_notification_id: number;
  viewed: boolean;
  viewed_at: Date;
  id: number;
  title: string;
  notification_type: string;
  message: string;
};

export type UpdateNotificationData = {
  user_notification_id: number;
};

export type DeleteNotificationData = {
  user_notification_id: number;
};

export const useNotificationsCrud = () => {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const { token } = useUserContext();

  const fetchNotifications = async () => {
    if (!token) {
      return;
    }

    const params = { token };
    const { notifications } = await GetNotifications(params);
    setState({ notifications });
  };

  const createNotifications = async (data: CreateNotificationData) => {
    if (!token) {
      return;
    }

    const params = { ...data, token };
    await CreateNotifications(params);
    fetchNotifications();
  };

  const deleteNotifications = async (data: DeleteNotificationData) => {
    if (!token) {
      return;
    }

    const params = { ...data, token };
    await DeleteNotifications(params);
    fetchNotifications();
  };

  const updateNotifications = async (data: UpdateNotificationData) => {
    if (!token) {
      return;
    }

    const params = { ...data, token };
    await UpdateNotifications(params);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications: state.notifications,
    fetchNotifications,
    createNotifications,
    deleteNotifications,
    updateNotifications,
  };
};
