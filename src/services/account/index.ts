import api from "../../configs/api";
import type { Account, EmailPreferences, UpdateAccount, UpdatePassword } from "./dto";

export async function getAccount(): Promise<Account.Response> {
  const response = await api.get<Account.Response>("/api/account");
  return response.data;
}

export async function updateAccount(params: UpdateAccount.Params): Promise<UpdateAccount.Response> {
  const response = await api.patch<UpdateAccount.Response>("/api/account", params);
  return response.data;
}

export async function updatePassword(params: UpdatePassword.Params): Promise<UpdatePassword.Response> {
  const response = await api.patch<UpdatePassword.Response>("/api/account/password", params);
  return response.data;
}

export async function uploadPhoto(file: File): Promise<Account.Response> {
  const form = new FormData();
  form.append("photo", file);
  const response = await api.put<Account.Response>("/api/account/photo", form, { headers: { "Content-Type": undefined } });
  return response.data;
}

export async function deletePhoto(): Promise<Account.Response> {
  const response = await api.delete<Account.Response>("/api/account/photo");
  return response.data;
}

// LGPD: data subject rights (export, deletion).
export async function exportAccountData(): Promise<Blob> {
  const response = await api.get("/api/account/export", { responseType: "blob" });
  return response.data as Blob;
}

export async function deleteAccount(password: string): Promise<{ message: string }> {
  const response = await api.delete<{ message: string }>("/api/account", { data: { password } });
  return response.data;
}

// E-mail preferences (opt-out of non-transactional e-mails).
export async function getEmailPreferences(): Promise<EmailPreferences.Response> {
  const response = await api.get<EmailPreferences.Response>("/api/account/email_preferences");
  return response.data;
}

export async function updateEmailPreferences(
  preferences: Partial<EmailPreferences.Preferences>,
): Promise<EmailPreferences.Response> {
  const response = await api.patch<EmailPreferences.Response>("/api/account/email_preferences", preferences);
  return response.data;
}

// Public (no session): the signed token from the e-mail link is the credential.
export async function unsubscribeFromEmails(token: string, category: EmailPreferences.Category): Promise<void> {
  await api.post("/api/email_preferences/unsubscribe", { token, category });
}
