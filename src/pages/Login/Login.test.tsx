import { AxiosError } from "axios";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { LoginPage } from "./index";
import { guestAuth, renderPage } from "../../test/render";

const toast = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }));
vi.mock("react-hot-toast", () => ({ default: toast }));

const resendConfirmation = vi.hoisted(() => vi.fn());
vi.mock("../../services/auth", () => ({ resendConfirmation }));

function apiError(status: number, data: unknown) {
  return new AxiosError("fail", "ERR_BAD_REQUEST", undefined, undefined, { status, data } as never);
}

async function fillAndSubmit(email = "ana@exemplo.com", password = "Senha@123") {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/e-mail/i), email);
  await user.type(screen.getByLabelText(/senha/i), password);
  await user.click(screen.getByRole("button", { name: "Entrar" }));
}

describe("LoginPage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("sends a candidate to the candidate area after signing in", async () => {
    const signInWithEmail = vi.fn().mockResolvedValue({ id: 1, name: "Ana", email: "ana@exemplo.com", role: "user" });
    renderPage(<LoginPage />, { path: "/login", auth: guestAuth({ signInWithEmail }), destinations: ["/candidate/home", "/staff/home"] });

    await fillAndSubmit();

    expect(signInWithEmail).toHaveBeenCalledWith("ana@exemplo.com", "Senha@123");
    expect(await screen.findByText("Destino: /candidate/home")).toBeInTheDocument();
  });

  it("sends staff to the staff area", async () => {
    const signInWithEmail = vi.fn().mockResolvedValue({ id: 2, name: "Rita", email: "rita@x.com", role: "admin" });
    renderPage(<LoginPage />, { path: "/login", auth: guestAuth({ signInWithEmail }), destinations: ["/candidate/home", "/staff/home"] });

    await fillAndSubmit("rita@x.com");

    expect(await screen.findByText("Destino: /staff/home")).toBeInTheDocument();
  });

  it("shows the message from the API and stays on the page when credentials are wrong", async () => {
    const signInWithEmail = vi.fn().mockRejectedValue(apiError(401, { errors: ["E-mail ou senha inválidos."] }));
    renderPage(<LoginPage />, { path: "/login", auth: guestAuth({ signInWithEmail }), destinations: ["/candidate/home"] });

    await fillAndSubmit();

    expect(await screen.findByText("E-mail ou senha inválidos.")).toBeInTheDocument();
    expect(screen.queryByText("Destino: /candidate/home")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeEnabled();
  });

  it("offers to resend the confirmation e-mail for unconfirmed accounts", async () => {
    const signInWithEmail = vi.fn().mockRejectedValue(apiError(401, { errors: ["Confirme seu e-mail."], error_code: "email_not_confirmed" }));
    resendConfirmation.mockResolvedValue(undefined);
    renderPage(<LoginPage />, { path: "/login", auth: guestAuth({ signInWithEmail }) });

    await fillAndSubmit("Ana@Exemplo.com");
    await userEvent.setup().click(await screen.findByRole("button", { name: "Reenviar e-mail de confirmação" }));

    await waitFor(() => expect(resendConfirmation).toHaveBeenCalledWith("ana@exemplo.com"));
    expect(toast.success).toHaveBeenCalled();
  });

  it("explains that the session expired when redirected with ?expired=1", async () => {
    renderPage(<LoginPage />, { path: "/login?expired=1" });

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Sua sessão expirou. Entre novamente."));
  });

  it("links to sign up and password recovery", () => {
    renderPage(<LoginPage />, { path: "/login" });

    expect(screen.getByRole("link", { name: "Criar conta" })).toHaveAttribute("href", "/cadastro");
    expect(screen.getByRole("link", { name: "Esqueci minha senha" })).toHaveAttribute("href", "/esqueci-senha");
  });
});
