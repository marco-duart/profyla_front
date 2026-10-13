const KEY = "profyla.postLoginRedirect";

// Only same-site paths are accepted (never "//host" or absolute URLs): avoids open redirects.
export function safeRedirect(value: string | null | undefined): string | null {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("://")) return null;
  return value;
}

export function rememberRedirect(value: string | null | undefined): void {
  const safe = safeRedirect(value);
  try {
    if (safe) localStorage.setItem(KEY, safe);
  } catch {
    // storage unavailable: the redirect simply is not remembered
  }
}

export function takeRedirect(preferred?: string | null): string | null {
  const direct = safeRedirect(preferred);
  let stored: string | null = null;
  try {
    stored = safeRedirect(localStorage.getItem(KEY));
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
  return direct ?? stored;
}
