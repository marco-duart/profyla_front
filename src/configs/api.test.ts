import type { InternalAxiosRequestConfig } from "axios";
import api, { clearStoredAuthHeaders, getStoredAuthHeaders, setStoredAuthHeaders } from "./api";

type Handler = { fulfilled?: (v: unknown) => unknown; rejected?: (e: unknown) => unknown };
const responseHandlers = () => (api.interceptors.response as unknown as { handlers: Handler[] }).handlers.filter(Boolean)[0];
const requestHandlers = () => (api.interceptors.request as unknown as { handlers: Handler[] }).handlers.filter(Boolean)[0];

const headers = { accessToken: "tok1", client: "cli", uid: "u@x.com", tokenType: "Bearer" };

function responseWith(status: number, url: string, rotated?: Record<string, string>) {
  return { config: { url }, response: { status, headers: rotated ?? {} } };
}

describe("api client", () => {
  const assign = vi.fn();

  beforeEach(() => {
    assign.mockReset();
    Object.defineProperty(window, "location", { value: { pathname: "/candidate/home", assign }, configurable: true });
  });

  it("sends the stored auth headers on every request", async () => {
    setStoredAuthHeaders(headers);
    const config = { headers: new (await import("axios")).AxiosHeaders() } as InternalAxiosRequestConfig;

    const result = (await requestHandlers().fulfilled!(config)) as InternalAxiosRequestConfig;

    expect(result.headers.get("access-token")).toBe("tok1");
    expect(result.headers.get("client")).toBe("cli");
    expect(result.headers.get("uid")).toBe("u@x.com");
  });

  it("stores the rotated token that comes back in the response", async () => {
    setStoredAuthHeaders(headers);

    await responseHandlers().fulfilled!({ headers: { "access-token": "tok2", client: "cli", uid: "u@x.com" } });

    expect(getStoredAuthHeaders()).toMatchObject({ accessToken: "tok2", client: "cli" });
  });

  it("clears the session and sends the user to /login on a 401 from a protected endpoint", async () => {
    setStoredAuthHeaders(headers);

    await expect(responseHandlers().rejected!(responseWith(401, "/api/account"))).rejects.toBeTruthy();

    expect(getStoredAuthHeaders()).toBeNull();
    expect(assign).toHaveBeenCalledWith("/login?expired=1");
  });

  it("does not treat a wrong password on sign in as an expired session", async () => {
    setStoredAuthHeaders(headers);

    await expect(responseHandlers().rejected!(responseWith(401, "/auth/sign_in"))).rejects.toBeTruthy();

    expect(getStoredAuthHeaders()).not.toBeNull();
    expect(assign).not.toHaveBeenCalled();
  });

  it("does nothing special for a 401 when there is no session left (parallel request already cleared it)", async () => {
    clearStoredAuthHeaders();

    await expect(responseHandlers().rejected!(responseWith(401, "/api/account"))).rejects.toBeTruthy();

    expect(assign).not.toHaveBeenCalled();
  });

  it("does not redirect again when already on the login page", async () => {
    setStoredAuthHeaders(headers);
    Object.defineProperty(window, "location", { value: { pathname: "/login", assign }, configurable: true });

    await expect(responseHandlers().rejected!(responseWith(401, "/api/account"))).rejects.toBeTruthy();

    expect(assign).not.toHaveBeenCalled();
  });

  it("keeps the session on other errors (e.g. 500)", async () => {
    setStoredAuthHeaders(headers);

    await expect(responseHandlers().rejected!(responseWith(500, "/api/account"))).rejects.toBeTruthy();

    expect(getStoredAuthHeaders()).not.toBeNull();
  });
});
