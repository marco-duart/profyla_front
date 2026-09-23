import api from "../../../configs/api";
import type { AdminUser } from "./dto";

export async function listUsers(): Promise<AdminUser.Item[]> {
  const response = await api.get<AdminUser.Item[]>("/api/admins/users");
  return response.data ?? [];
}

export async function banUser(userId: number, banReason: string): Promise<void> {
  await api.post("/api/admins/ban", { user_id: userId, ban_reason: banReason });
}

export async function unbanUser(userId: number): Promise<void> {
  await api.post("/api/admins/unban", { user_id: userId });
}
