import api from "../../../configs/api";
import type { Metrics } from "./dto";

export async function getMetrics(filters: Metrics.Filters): Promise<Metrics.Response> {
  const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
  const response = await api.get<Metrics.Response>("/api/admins/metrics", { params });
  return response.data;
}
