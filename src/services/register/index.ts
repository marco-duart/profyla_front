import { isAxiosError } from "axios";
import api from "../api";
import {
  RegisterDTO,
  LoginAPIDTO,
  LoggedUserDTO,
  ForgetPasswordDTO,
  ChangePasswordDTO,
  GetTokenDTO,
  ConfirmAccountDTO,
  EmailAvailabilityDTO,
  CpfAvailabilityDTO,
} from "./DTO";

export const Register = async (params: RegisterDTO.IParams) => {
  try {
    console.log(params)
    const response = await api.post<RegisterDTO.IResponse>("/users", params, { headers: {"Content-Type": "multipart/form-data"} });

    return {
      error: false,
      message: "MESSAGE",
      code: response.data.code,
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: true,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      error: true,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const LoginAPI = async (params: LoginAPIDTO.IParams) => {
  try {
    const response = await api.post<LoginAPIDTO.IResponse>("/users/login", params);

    return {
      error: false,
      message: "MESSAGE",
      code: "CODIGO",
      user: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: true,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      error: true,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const LoggedUser = async (params: LoggedUserDTO.IParams) => {
  try {
    const { token } = params
    const response = await api.post<LoggedUserDTO.IResponse>('/users/me', { headers: { Authorization: token } })

    return {
      error: false,
      message: "MESSAGE",
      user: response.data
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: true,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      error: true,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const ForgetPassword = async (params: ForgetPasswordDTO.IParams) => {
  try {
    const response = await api.post<ForgetPasswordDTO.IResponse>('/users/forget-password', params)

    return {
      error: response.data.error,
      message: "MESSAGE",
      code: response.data.code
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: true,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      error: true,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const ChangePassword = async (params: ChangePasswordDTO.IParams) => {
  try {
    const response = await api.post<ChangePasswordDTO.IResponse>('/users/reset-password', params)

    return {
      error: false,
      message: "MESSAGE",
      code: response.data.code
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: true,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      error: true,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const GetToken = async (params: GetTokenDTO.IParams) => {
  try {
    const response = await api.post<GetTokenDTO.IResponse>('/users/resend-token', params)

    return {
      error: false,
      message: "MESSAGE",
      code: response.data.code
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: true,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      error: true,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const ConfirmAccount = async (params: ConfirmAccountDTO.IParams) => {
  try {
    const { id, ...restParams } = params
    const response = await api.post<ConfirmAccountDTO.IResponse>(`/users/confirm/${id}`, restParams )

    return {
      error: false,
      message: "MESSAGE",
      code: response.data.code
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: true,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      error: true,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const EmailAvailability = async (params: EmailAvailabilityDTO.IParams) => {
  try {
    const response = await api.post<EmailAvailabilityDTO.IResponse>('/users/email', params)

    return {
      error: false,
      message: "MESSAGE",
      code: response.data.code
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: true,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      error: true,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};

export const CpfAvailability = async (params: CpfAvailabilityDTO.IParams) => {
  try {
    const response = await api.post<CpfAvailabilityDTO.IResponse>('/users/cpf', params)

    return {
      error: false,
      message: "MESSAGE",
      code: response.data.code
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        error: true,
        message: "MESSAGE",
        code: "CODIGO",
      };
    }
    return {
      error: true,
      message: "MESSAGE",
      code: "CODIGO",
    };
  }
};
