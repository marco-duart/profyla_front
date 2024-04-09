import { isAxiosError } from "axios";
import api from "../api";
import {
  GetEmploymentHistoryDTO,
  GetEmploymentHistoriesDTO,
  CreateEmploymentHistoryDTO,
  UpdateEmploymentHistoryDTO,
  DeleteEmploymentHistoryDTO,
} from "./DTO";

export const GetEmploymentHistory = async (
  params: GetEmploymentHistoryDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.get<GetEmploymentHistoryDTO.IResponse>(
      `/candidates/employment/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      employmentHistory: response.data.employment,
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

export const GetEmploymentHistories = async (
  params: GetEmploymentHistoriesDTO.IParams
) => {
  try {
    const { token } = params;
    const response = await api.get<GetEmploymentHistoriesDTO.IResponse>(
      "/candidates/employments",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      EmploymentHistories: response.data.employment,
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

export const CreateEmploymentHistory = async (
  params: CreateEmploymentHistoryDTO.IParams
) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateEmploymentHistoryDTO.IResponse>(
      "/candidates/employment",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      employmentHistory: response.data.employment,
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

export const UpdateEmploymentHistory = async (
  params: UpdateEmploymentHistoryDTO.IParams
) => {
  try {
    const { id, token, ...restParams } = params;
    const response = await api.patch<UpdateEmploymentHistoryDTO.IResponse>(
      `/candidates/employment/${id}`,
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      employmentHistory: response.data.employment,
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

export const DeleteEmploymentHistory = async (
  params: DeleteEmploymentHistoryDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteEmploymentHistoryDTO.IResponse>(
      `/candidates/employment/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      employmentHistory: response.data.employment,
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
