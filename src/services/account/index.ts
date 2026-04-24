import api from "../../configs/api";
import type { Account, UpdateAccount, UpdatePassword } from "./dto";

export async function getAccount(): Promise<Account.Response> {
  const response = await api.get<Account.Response>("/api/candidates/account");
  return response.data;
}

export async function updateAccount(params: UpdateAccount.Params): Promise<UpdateAccount.Response> {
  const response = await api.patch<UpdateAccount.Response>("/api/candidates/account", params);
  return response.data;
}

export async function updatePassword(params: UpdatePassword.Params): Promise<UpdatePassword.Response> {
  const response = await api.patch<UpdatePassword.Response>("/api/candidates/account/password", params);
  return response.data;
}
