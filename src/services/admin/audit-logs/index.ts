import api from "../../../configs/api";
import type { AuditLog } from "./dto";

export async function listAuditLogs(filters: AuditLog.Filters): Promise<AuditLog.Response> {
  const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined && value !== ""));
  const response = await api.get<AuditLog.Response>("/api/admins/audit_logs", { params });
  return response.data;
}
