import { isAxiosError } from "axios";
import api from "../api";
import {
  GetProfessionalLinkDTO,
  GetProfessionalLinksDTO,
  CreateProfessionalLinkDTO,
  UpdateProfessionalLinkDTO,
  DeleteProfessionalLinkDTO,
} from "./DTO";

export const GetProfessionalLink = async (
  params: GetProfessionalLinkDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.get<GetProfessionalLinkDTO.IResponse>(
      `/candidates/professional/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      professionalLink: response.data.professional,
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

export const GetProfessionalLinks = async (
  params: GetProfessionalLinksDTO.IParams
) => {
  try {
    const { token } = params;
    const response = await api.get<GetProfessionalLinksDTO.IResponse>(
      "/candidates/professionals",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      professionalLinks: response.data.professional,
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

export const CreateProfessionalLink = async (
  params: CreateProfessionalLinkDTO.IParams
) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateProfessionalLinkDTO.IResponse>(
      "/candidates/professional",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      professionalLink: response.data.professional,
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

export const UpdateProfessionalLink = async (
  params: UpdateProfessionalLinkDTO.IParams
) => {
  try {
    const { id, token, ...restParams } = params;
    const response = await api.patch<UpdateProfessionalLinkDTO.IResponse>(
      `/candidates/professional/${id}`,
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      professionalLink: response.data.professional,
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

export const DeleteProfessionalLink = async (
  params: DeleteProfessionalLinkDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteProfessionalLinkDTO.IResponse>(
      `/candidates/professional/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      professionalLink: response.data.professional,
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
