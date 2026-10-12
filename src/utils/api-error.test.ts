import { AxiosError } from "axios";
import { getApiErrorCode, getApiErrorMessage } from "./api-error";

function axiosError(data: unknown, status = 422) {
  return new AxiosError("fail", "ERR_BAD_REQUEST", undefined, undefined, { status, data } as never);
}

describe("api error parsing", () => {
  it("reads the standard { error: { code, message } } shape", () => {
    const error = axiosError({ error: { code: "not_found", message: "Registro não encontrado." } }, 404);
    expect(getApiErrorMessage(error, "fallback")).toBe("Registro não encontrado.");
    expect(getApiErrorCode(error)).toBe("not_found");
  });

  it("still reads devise_token_auth errors and legacy strings", () => {
    expect(getApiErrorMessage(axiosError({ errors: ["E-mail ou senha inválidos."] }, 401), "x")).toBe("E-mail ou senha inválidos.");
    expect(getApiErrorMessage(axiosError({ errors: { full_messages: ["CPF inválido", "Senha curta"] } }), "x")).toBe("CPF inválido Senha curta");
    expect(getApiErrorMessage(axiosError({ error: "texto antigo" }), "x")).toBe("texto antigo");
  });

  it("uses the fallback when there is nothing to show", () => {
    expect(getApiErrorMessage(axiosError({}), "fallback")).toBe("fallback");
    expect(getApiErrorMessage("boom", "fallback")).toBe("fallback");
    expect(getApiErrorCode(new Error("x"))).toBeUndefined();
  });
});
