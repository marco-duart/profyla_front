import { isAxiosError } from "axios";
import api from "../api";
import {
  GetNotificationDTO,
  GetNotificationsDTO,
  CreateNotificationsDTO,
  UpdateNotificationsDTO,
  DeleteNotificationsDTO,
} from "./DTO";

export const GetNotification = async (params: GetNotificationDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.get<GetNotificationDTO.IResponse>(
      `/user/notifications/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      notification: response.data.notification,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const GetNotifications = async (params: GetNotificationsDTO.IParams) => {
  try {
    const { token } = params;
    const response = await api.get<GetNotificationsDTO.IResponse>(
      "/users/notifications",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      notifications: response.data.notifications,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const CreateNotifications = async (
  params: CreateNotificationsDTO.IParams
) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateNotificationsDTO.IResponse>(
      "/user/notification",
      restParams,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      notifications: response.data.notification,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const UpdateNotifications = async (
  params: UpdateNotificationsDTO.IParams
) => {
  try {
    const { user_notification_id, token, ...restParams } = params;
    const response = await api.patch<UpdateNotificationsDTO.IResponse>(
      `/users/notification/${user_notification_id}`,
      restParams,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      notifications: response.data.notification,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const DeleteNotifications = async (
  params: DeleteNotificationsDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteNotificationsDTO.IResponse>(
      `/users/notification/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      notifications: response.data.notification,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};
