import api, {
  clearStoredAuthHeaders,
  type AuthHeaders,
  getStoredAuthHeaders,
  setStoredAuthHeaders,
} from "../../configs/api";
import type { Register, SignIn, ValidateToken } from "./dto";

type HeaderBag = {
  get?: (key: string) => string | undefined;
  [key: string]: unknown;
};

function readHeader(headers: HeaderBag, key: string): string | undefined {
  const byGet = headers.get?.(key);
  if (typeof byGet === "string" && byGet.length > 0) {
    return byGet;
  }

  const direct = headers[key] ?? headers[key.toLowerCase()];
  if (typeof direct === "string" && direct.length > 0) {
    return direct;
  }

  return undefined;
}

function normalizeAuthHeaders(rawHeaders: Record<string, string | undefined>): AuthHeaders {
  const accessToken = rawHeaders["access-token"] ?? "";
  const client = rawHeaders.client ?? "";
  const uid = rawHeaders.uid ?? "";
  const tokenType = rawHeaders["token-type"] ?? "Bearer";

  if (!accessToken || !client || !uid) {
    throw new Error("Não foi possível recuperar os headers de autenticação.");
  }

  return {
    accessToken,
    client,
    uid,
    tokenType,
  };
}

export async function signIn(params: SignIn.Params): Promise<SignIn.User> {
  const response = await api.post<SignIn.Response>("/auth/sign_in", params);

  const headers = normalizeAuthHeaders({
    "access-token": readHeader(response.headers as HeaderBag, "access-token"),
    client: readHeader(response.headers as HeaderBag, "client"),
    uid: readHeader(response.headers as HeaderBag, "uid"),
    "token-type": readHeader(response.headers as HeaderBag, "token-type"),
  });

  setStoredAuthHeaders(headers);

  const user = response.data?.data;
  if (!user) {
    const validatedUser = await validateToken();
    return validatedUser;
  }

  return user;
}

export async function validateToken(): Promise<ValidateToken.Response["data"]> {
  const response = await api.get<ValidateToken.Response>("/auth/validate_token");

  if (!response.data?.success || !response.data?.data) {
    throw new Error("Sessão inválida.");
  }

  return response.data.data;
}

export async function signOut(): Promise<void> {
  try {
    await api.delete("/auth/sign_out");
  } catch {
    // Ignore sign out API errors and clear local session anyway.
  } finally {
    clearStoredAuthHeaders();
  }
}

export function hasStoredSession(): boolean {
  return Boolean(getStoredAuthHeaders());
}

export async function registerUser(params: Register.Params): Promise<void> {
  await api.post("/auth", params);
}

export async function resendConfirmation(email: string): Promise<void> {
  await api.post("/auth/confirmation", {
    email,
    redirect_url: `${window.location.origin}/confirmado`,
  });
}

export async function requestPasswordReset(email: string): Promise<void> {
  await api.post("/auth/password", {
    email,
    redirect_url: `${window.location.origin}/redefinir-senha`,
  });
}

export async function resetPassword(params: {
  reset_password_token: string;
  password: string;
  password_confirmation: string;
}): Promise<void> {
  await api.put("/auth/password", params);
  // The reset also issues a session; we want the user to sign in explicitly instead.
  clearStoredAuthHeaders();
}
