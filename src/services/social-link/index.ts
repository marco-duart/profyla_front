import { isAxiosError } from "axios";
import api from "../api";
import {
  GetSocialLinkDTO,
  GetSocialLinksDTO,
  CreateSocialLinkDTO,
  UpdateSocialLinkDTO,
  DeleteSocialLinkDTO,
} from "./DTO";

export const GetSocialLink = async (params: GetSocialLinkDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.get<GetSocialLinkDTO.IResponse>(
      `/candidates/social/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      socialLink: response.data.social,
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

export const GetSocialLinks = async (params: GetSocialLinksDTO.IParams) => {
  try {
    const { token } = params;
    const response = await api.get<GetSocialLinksDTO.IResponse>(
      "/candidates/socials",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      socialLinks: response.data.social,
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

export const CreateSocialLink = async (params: CreateSocialLinkDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateSocialLinkDTO.IResponse>(
      "/candidates/social",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      socialLink: response.data.social,
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

export const UpdateSocialLink = async (params: UpdateSocialLinkDTO.IParams) => {
  try {
    const { id, token, ...restParams } = params;
    const response = await api.patch<UpdateSocialLinkDTO.IResponse>(
      `/candidates/social/${id}`,
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      socialLink: response.data.social,
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

export const DeleteSocialLink = async (params: DeleteSocialLinkDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteSocialLinkDTO.IResponse>(
      `/candidates/social/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      socialLink: response.data.social,
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
