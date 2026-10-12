import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { AxiosError } from "axios";
import { RegisterPage } from "./index";
import { renderPage } from "../../test/render";

const registerUser = vi.hoisted(() => vi.fn());
vi.mock("../../services/auth", () => ({ registerUser }));
vi.mock("react-hot-toast", () => ({ default: { success: vi.fn(), error: vi.fn() } }));

const VALID_CPF = "529.982.247-25";

async function fill(overrides: Partial<Record<"name" | "cpf" | "email" | "password" | "confirmation", string>> = {}, { accept = true } = {}) {
  const user = userEvent.setup();
  const values = { name: "Ana Souza", cpf: VALID_CPF, email: "ana@exemplo.com", password: "Senha@12345", confirmation: "Senha@12345", ...overrides };
  await user.type(screen.getByLabelText(/nome completo/i), values.name);
  await user.type(screen.getByLabelText(/cpf/i), values.cpf);
  await user.type(screen.getByLabelText(/e-mail/i), values.email);
  await user.type(screen.getByLabelText(/^senha/i), values.password);
  await user.type(screen.getByLabelText(/confirmar senha/i), values.confirmation);
  if (accept) await user.click(screen.getByRole("checkbox"));
  await user.click(screen.getByRole("button", { name: /criar conta/i }));
}

describe("RegisterPage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("validates every field before calling the API", async () => {
    renderPage(<RegisterPage />, { path: "/cadastro" });

    await userEvent.setup().click(screen.getByRole("button", { name: /criar conta/i }));

    expect(await screen.findByText("Informe seu nome completo.")).toBeInTheDocument();
    expect(screen.getByText("CPF inválido.")).toBeInTheDocument();
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(screen.getByText(/É necessário aceitar os Termos/)).toBeInTheDocument();
    expect(registerUser).not.toHaveBeenCalled();
  });

  it("masks the CPF while typing", async () => {
    renderPage(<RegisterPage />, { path: "/cadastro" });

    await userEvent.setup().type(screen.getByLabelText(/cpf/i), "52998224725");

    expect(screen.getByLabelText(/cpf/i)).toHaveValue(VALID_CPF);
  });

  it("flags mismatched passwords and a CPF with wrong check digits", async () => {
    renderPage(<RegisterPage />, { path: "/cadastro" });

    await fill({ cpf: "529.982.247-26", confirmation: "outra-senha" });

    expect(await screen.findByText("CPF inválido.")).toBeInTheDocument();
    expect(screen.getByText("As senhas não coincidem.")).toBeInTheDocument();
    expect(registerUser).not.toHaveBeenCalled();
  });

  it("requires accepting the terms", async () => {
    renderPage(<RegisterPage />, { path: "/cadastro" });

    await fill({}, { accept: false });

    expect(await screen.findByText(/É necessário aceitar os Termos/)).toBeInTheDocument();
    expect(registerUser).not.toHaveBeenCalled();
  });

  it("registers with digits-only CPF, normalized e-mail and the consent flags, then asks to check the inbox", async () => {
    registerUser.mockResolvedValue(undefined);
    renderPage(<RegisterPage />, { path: "/cadastro" });

    await fill({ email: "Ana@Exemplo.COM" });

    await waitFor(() => expect(registerUser).toHaveBeenCalledTimes(1));
    expect(registerUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Ana Souza",
        cpf: "52998224725",
        email: "ana@exemplo.com",
        accept_terms: true,
        accept_privacy: true,
      }),
    );
    expect(await screen.findByText(/Verifique seu e-mail/)).toBeInTheDocument();
    expect(screen.getByText("ana@exemplo.com")).toBeInTheDocument();
  });

  it("shows the server message when the API refuses the sign up", async () => {
    registerUser.mockRejectedValue(new AxiosError("x", "ERR", undefined, undefined, { status: 422, data: { errors: { full_messages: ["E-mail já está em uso"] } } } as never));
    renderPage(<RegisterPage />, { path: "/cadastro" });

    await fill();

    expect(await screen.findByText("E-mail já está em uso")).toBeInTheDocument();
  });
});
