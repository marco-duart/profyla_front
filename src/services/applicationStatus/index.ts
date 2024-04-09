import { isAxiosError } from "axios";
import api from "../api";
import {
  GetApplicationDTO,
  GetApplicationsDTO,
  CreateApplicationDTO,
  UpdateApplicationDTO,
  DeleteApplicationDTO,
} from "./DTO";

export const GetApplication = async (params: GetApplicationDTO.IParams) => {
  try {
    const { prefix, id, token } = params;
    const response = await api.get<GetApplicationDTO.IResponse>(
      `/${prefix}/application/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      application: response.data.application,
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

export const GetApplications = async (params: GetApplicationsDTO.IParams) => {
  try {
    const { prefix, token } = params;
    const response = await api.get<GetApplicationsDTO.IResponse>(
      `/${prefix}/applications`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      applications: response.data.applications,
      pageable: response.data.pageable,
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

export const CreateApplication = async (
  params: CreateApplicationDTO.IParams
) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateApplicationDTO.IResponse>(
      "/candidates/application",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      application: response.data.application,
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

export const UpdateApplication = async (
  params: UpdateApplicationDTO.IParams
) => {
  try {
    const { token } = params;
    const response = await api.patch<UpdateApplicationDTO.IResponse>(
      "/admins/application",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      application: response.data.application,
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

export const DeleteApplication = async (
  params: DeleteApplicationDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteApplicationDTO.IResponse>(
      `/candidates/application/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      application: response.data.application,
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
