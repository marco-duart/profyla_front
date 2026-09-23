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

function persistRotatedHeaders(headers: unknown): void {
  const bag = headers as { get?: (key: string) => string | undefined; [key: string]: unknown };

  function read(key: string): string | undefined {
    const byGet = bag?.get?.(key);
    if (typeof byGet === "string" && byGet.length > 0) {
      return byGet;
    }

    const direct = bag?.[key] ?? bag?.[key.toLowerCase()];
    return typeof direct === "string" && direct.length > 0 ? direct : undefined;
  }

  const accessToken = read("access-token");
  const client = read("client");
  const uid = read("uid");

  if (!accessToken || !client || !uid) {
    return;
  }

  setStoredAuthHeaders({
    accessToken,
    client,
    uid,
    tokenType: read("token-type") ?? "Bearer",
  });
}

api.interceptors.response.use(
  (response) => {
    persistRotatedHeaders(response.headers);
    return response;
  },
  (error) => {
    if (error?.response) {
      persistRotatedHeaders(error.response.headers);
    }
    return Promise.reject(error);
  },
);

export default api;
