import { isAxiosError } from "axios";
import api from "../api";
import {
  RegisterDTO,
  LoginAPIDTO,
  LoggedUserDTO,
  ForgetPasswordDTO,
  ResetPasswordDTO,
  GetTokenDTO,
  ConfirmAccountDTO,
  EmailAvailabilityDTO,
  CpfAvailabilityDTO,
} from "./DTO";

export const Register = async (params: RegisterDTO.IParams) => {
  try {
    const response = await api.post<RegisterDTO.IResponse>("/users", params, {
      headers: { ContentType: "multipart/form-data" },
    });

    return {
      success: true,
      message: "MESSAGE",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const LoginAPI = async (params: LoginAPIDTO.IParams) => {
  try {
    const response = await api.post<LoginAPIDTO.IResponse>(
      "/users/login",
      params
    );

    return {
      success: true,
      message: "MESSAGE",
      code: "CODIGO",
      user: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const LoggedUser = async (params: LoggedUserDTO.IParams) => {
  try {
    const { token } = params;
    const response = await api.post<LoggedUserDTO.IResponse>("/users/me", {
      headers: { Authorization: token },
    });

    return {
      success: true,
      message: "MESSAGE",
      user: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const ForgotPassword = async (params: ForgetPasswordDTO.IParams) => {
  try {
    const response = await api.post<ForgetPasswordDTO.IResponse>(
      "/users/forgot-password",
      params
    );

    return {
      success: true,
      message: "MESSAGE",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const ResetPassword = async (params: ResetPasswordDTO.IParams) => {
  try {
    const response = await api.post<ResetPasswordDTO.IResponse>(
      "/users/reset-password",
      params
    );

    return {
      success: true,
      message: "MESSAGE",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const GetToken = async (params: GetTokenDTO.IParams) => {
  try {
    const response = await api.post<GetTokenDTO.IResponse>(
      "/users/resend-token",
      params
    );

    return {
      success: true,
      message: "MESSAGE",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const ConfirmAccount = async (params: ConfirmAccountDTO.IParams) => {
  try {
    const { id, ...rest } = params
    const response = await api.post<ConfirmAccountDTO.IResponse>(`/users/confirm/${id}`, rest )

    return {
      success: true,
      message: "MESSAGE",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const EmailAvailability = async (
  params: EmailAvailabilityDTO.IParams
) => {
  try {
    const response = await api.post<EmailAvailabilityDTO.IResponse>(
      "/users/email",
      params
    );

    return {
      success: true,
      message: "MESSAGE",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const CpfAvailability = async (params: CpfAvailabilityDTO.IParams) => {
  try {
    const response = await api.post<CpfAvailabilityDTO.IResponse>(
      "/users/cpf",
      params
    );

    return {
      success: true,
      message: "MESSAGE",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      success: false,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};
