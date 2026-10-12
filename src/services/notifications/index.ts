import api from "../../configs/api";
import type { NotificationList } from "./dto";

export async function listNotifications(limit = 20): Promise<NotificationList.Response> {
  const response = await api.get<NotificationList.Response>("/api/account/notifications", { params: { limit } });
  return response.data;
}

export async function markNotificationRead(id: number): Promise<{ unread_count: number }> {
  const response = await api.patch<{ unread_count: number }>(`/api/account/notifications/${id}/read`);
  return response.data;
}

export async function markAllNotificationsRead(): Promise<{ unread_count: number }> {
  const response = await api.post<{ unread_count: number }>("/api/account/notifications/read_all");
  return response.data;
}
