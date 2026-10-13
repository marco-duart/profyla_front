import axios from "axios";
import { env } from "./env";

const AUTH_STORAGE_KEY = "profyla.auth.headers";

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

// Endpoints where a 401 means "wrong credentials", not "session expired".
const PUBLIC_AUTH_PATHS = ["/auth/sign_in", "/auth/password", "/auth/confirmation"];

function isSessionExpiredResponse(error: { config?: { url?: string }; response?: { status?: number } }): boolean {
  if (error.response?.status !== 401) {
    return false;
  }

  const url = error.config?.url ?? "";
  if (PUBLIC_AUTH_PATHS.some((path) => url.includes(path))) {
    return false;
  }

  // Credentials already cleared by a parallel request that failed first: nothing left to expire.
  return getStoredAuthHeaders() !== null;
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

    if (isSessionExpiredResponse(error)) {
      clearStoredAuthHeaders();
      if (!window.location.pathname.startsWith("/login")) {
        window.location.assign("/login?expired=1");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
