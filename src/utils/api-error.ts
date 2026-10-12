import axios from "axios";

type ErrorBody = {
  error?: string | { code?: string; message?: string };
  errors?: string[] | { full_messages?: string[] };
};

function messageFromBody(body: ErrorBody | undefined): string | undefined {
  if (!body) return undefined;

  if (typeof body.error === "string") return body.error;
  if (typeof body.error?.message === "string") return body.error.message;

  if (Array.isArray(body.errors)) return body.errors.join(" ");
  if (Array.isArray(body.errors?.full_messages)) return body.errors.full_messages.join(" ");

  return undefined;
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (axios.isAxiosError(error)) {
    return messageFromBody(error.response?.data as ErrorBody | undefined) || fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message || fallbackMessage;
  }

  return fallbackMessage;
}

// Stable machine-readable code of an API error ({ error: { code } }), when present.
export function getApiErrorCode(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) return undefined;
  const body = error.response?.data as ErrorBody | undefined;
  return typeof body?.error === "object" ? body.error?.code : undefined;
}
