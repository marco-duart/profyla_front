import { isAxiosError } from "axios";
import api from "../api";
import {
  BanUserDTO,
  ChangeEmailDTO,
  ChangeNewsletterDTO,
  ChangePasswordDTO,
  ChangePhotoDTO,
} from "./DTO";

export const ChangeEmail = async (params: ChangeEmailDTO.IParams) => {
  try {
    const { token, ...rest } = params;
    const response = await api.post<ChangeEmailDTO.IResponse>(
      "/users/change-email",
      rest,
      {
        headers: { Authorization: token },
      }
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

export const ChangePassword = async (params: ChangePasswordDTO.IParams) => {
  try {
    const { token, ...rest } = params;
    const response = await api.post<ChangePasswordDTO.IResponse>(
      "/users/change-password",
      rest,
      {
        headers: { Authorization: token },
      }
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

export const ChangeNewsletter = async (params: ChangeNewsletterDTO.IParams) => {
  try {
    const { id, ...rest } = params;
    const response = await api.post<ChangeNewsletterDTO.IResponse>(
      `/users/change-newsletter/${id}`,
      rest
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

export const ChangePhoto = async (params: ChangePhotoDTO.IParams) => {
  try {
    const { token, ...rest } = params;
    const response = await api.post<ChangePhotoDTO.IResponse>(
      "/users/change-photo",
      rest,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    return {
      success: true,
      message: "MESSAGE",
    };
  } catch (error) {
    console.log(error);
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

export const BanUser = async (params: BanUserDTO.IParams) => {
  try {
    const { token, ...rest } = params;
    const response = await api.post<BanUserDTO.IResponse>("/admins/ban", {
      params: rest,
      headers: { Authorization: token },
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
