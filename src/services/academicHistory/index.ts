import { isAxiosError } from "axios";
import api from "../api";
import {
  GetAcademicHistoryDTO,
  GetAcademicHistoriesDTO,
  CreateAcademicHistoryDTO,
  UpdateAcademicHistoryDTO,
  DeleteAcademicHistoryDTO,
} from "./DTO";

export const GetAcademicHistory = async (
  params: GetAcademicHistoryDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.get<GetAcademicHistoryDTO.IResponse>(
      `/candidates/academic/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      academicHistory: response.data.academic,
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

export const GetAcademicHistories = async (
  params: GetAcademicHistoriesDTO.IParams
) => {
  try {
    const { token } = params;
    const response = await api.get<GetAcademicHistoriesDTO.IResponse>(
      "/candidates/academics",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      academicHistories: response.data.academic,
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

export const CreateAcademicHistory = async (
  params: CreateAcademicHistoryDTO.IParams
) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateAcademicHistoryDTO.IResponse>(
      "/candidates/academic",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      academicHistory: response.data.academic,
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

export const UpdateAcademicHistory = async (
  params: UpdateAcademicHistoryDTO.IParams
) => {
  try {
    const { id, token, ...restParams } = params;
    const response = await api.patch<UpdateAcademicHistoryDTO.IResponse>(
      `/candidates/academic/${id}`,
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      academicHistory: response.data.academic,
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

export const DeleteAcademicHistory = async (
  params: DeleteAcademicHistoryDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteAcademicHistoryDTO.IResponse>(
      `/candidates/academic/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      academicHistory: response.data.academic,
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
