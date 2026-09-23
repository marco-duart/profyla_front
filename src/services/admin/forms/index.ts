import api from "../../../configs/api";
import type { AdminForm } from "./dto";

export async function listForms(): Promise<AdminForm.Item[]> {
  const response = await api.get<AdminForm.Item[]>("/api/admins/forms");
  return response.data ?? [];
}

export async function getForm(id: number): Promise<AdminForm.Item> {
  const response = await api.get<AdminForm.Item>(`/api/admins/form/${id}`);
  return response.data;
}

export async function createForm(params: {
  title: string;
  description: string;
  department: string;
}): Promise<void> {
  await api.post("/api/admins/form", params);
}

export async function updateForm(
  id: number,
  params: Partial<{ title: string; description: string; department: string }>,
): Promise<void> {
  await api.patch(`/api/admins/form/${id}`, params);
}

export async function deleteForm(id: number): Promise<void> {
  await api.delete(`/api/admins/form/${id}`);
}

export async function createFormField(
  id: number,
  params: { question: string; response_type: AdminForm.Field["response_type"] },
): Promise<void> {
  await api.post(`/api/admins/form/${id}/field`, params);
}

export async function updateFormField(
  formId: number,
  fieldId: number,
  params: Partial<{ question: string; response_type: AdminForm.Field["response_type"] }>,
): Promise<void> {
  await api.patch(`/api/admins/form/${formId}/field/${fieldId}`, params);
}

export async function deleteFormField(formId: number, fieldId: number): Promise<void> {
  await api.delete(`/api/admins/form/${formId}/field/${fieldId}`);
}
