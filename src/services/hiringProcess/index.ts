import { isAxiosError } from "axios";
import api from "../api";
import {
  GetHiringProcessDTO,
  GetHiringProcessesDTO,
  CreateHiringProcessDTO,
  UpdateHiringProcessDTO,
  DeleteHiringProcessDTO,
} from "./DTO";

export const GetHiringProcess = async (params: GetHiringProcessDTO.IParams) => {
  try {
    const { prefix, id, token } = params;
    const response = await api.get<GetHiringProcessDTO.IResponse>(
      `/${prefix}/hiring/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      hiringProcess: response.data.hiring,
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

export const GetHiringProcesses = async (
  params: GetHiringProcessesDTO.IParams
) => {
  try {
    const { prefix,token } = params;
    console.log(token, prefix)
    const response = await api.get<GetHiringProcessesDTO.IResponse>(
      `/${prefix}/hirings`,
      { headers: { Authorization: token } }
    );
    console.log(response);
    return {
      success: true,
      message: "MESSAGE",
      hiringProcesses: response.data.hirings,
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

export const CreateHiringProcess = async (
  params: CreateHiringProcessDTO.IParams
) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateHiringProcessDTO.IResponse>(
      "/admins/hiring",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      hiringProcess: response.data.hiring,
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

export const UpdateHiringProcess = async (
  params: UpdateHiringProcessDTO.IParams
) => {
  try {
    const { id, token, ...restParams } = params;
    const response = await api.patch<UpdateHiringProcessDTO.IResponse>(
      `/admins/hiring/${id}`,
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      hiringProcess: response.data.hiring,
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

export const DeleteHiringProcess = async (
  params: DeleteHiringProcessDTO.IParams
) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteHiringProcessDTO.IResponse>(
      `/admins/hiring/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      hiringProcess: response.data.hiring,
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
