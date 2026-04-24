import axios from "axios";
import { env } from "./env";

const AUTH_STORAGE_KEY = "talentflow.auth.headers";

export type AuthHeaders = {
  accessToken: string;
  client: string;
  uid: string;
  tokenType: string;
};

export function getStoredAuthHeaders(): AuthHeaders | null {
  const rawHeaders = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawHeaders) {
    return null;
  }

  try {
    return JSON.parse(rawHeaders) as AuthHeaders;
  } catch {
    return null;
  }
}

export function setStoredAuthHeaders(headers: AuthHeaders): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(headers));
}

export function clearStoredAuthHeaders(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

const api = axios.create({
  baseURL: env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...(env.API_KEY ? { Authorization: env.API_KEY } : {}),
  },
});

api.interceptors.request.use((requestConfig) => {
  const authHeaders = getStoredAuthHeaders();
  if (!authHeaders) {
    return requestConfig;
  }

  requestConfig.headers.set("access-token", authHeaders.accessToken);
  requestConfig.headers.set("client", authHeaders.client);
  requestConfig.headers.set("uid", authHeaders.uid);
  requestConfig.headers.set("token-type", authHeaders.tokenType);

  return requestConfig;
});

export default api;
