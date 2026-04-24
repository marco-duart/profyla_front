import api from "../../configs/api";
import type { NotificationList } from "./dto";

export async function listNotifications(search?: string): Promise<NotificationList.Response> {
  const response = await api.get<NotificationList.Response>("/api/candidates/notifications", {
    params: search ? { "q[title_or_message_cont]": search } : undefined,
  });

  return response.data;
}
