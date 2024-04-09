import { isAxiosError } from "axios";
import api from "../api";
import {
  GetDynamicExamDTO,
  GetDynamicExamsDTO,
  CreateDynamicExamDTO,
  UpdateDynamicExamDTO,
  DeleteDynamicExamDTO,
} from "./DTO";

export const GetDynamicExam = async (params: GetDynamicExamDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.get<GetDynamicExamDTO.IResponse>(
      `/admins/exam/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      dynamicExam: response.data.exam,
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

export const GetDynamicExams = async (params: GetDynamicExamsDTO.IParams) => {
  try {
    const { token } = params;
    const response = await api.get<GetDynamicExamsDTO.IResponse>(
      "/admins/exams",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      dynamicExams: response.data.exams,
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

export const CreateDynamicExam = async (
  params: CreateDynamicExamDTO.IParams
) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateDynamicExamDTO.IResponse>(
      "/admins/exam",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      dynamicExam: response.data.exam,
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

export const UpdateDynamicExam = async (
  params: UpdateDynamicExamDTO.IParams
) => {
  try {
    const { id, token, ...restParams } = params;
    const response = await api.patch<UpdateDynamicExamDTO.IResponse>(
      `/admins/exam/${id}`,
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      dynamicExam: response.data.exam,
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

export const DeleteDynamicExam = async (
  params: DeleteDynamicExamDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteDynamicExamDTO.IResponse>(
      `/admins/exam/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      dynamicExam: response.data.exam,
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
