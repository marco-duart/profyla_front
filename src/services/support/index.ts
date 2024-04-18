import { isAxiosError } from "axios";
import { RequestSupportDTO } from "./DTO";
import api from "../api";

export const RequestSupport = async (params: RequestSupportDTO.IParams) => {
  try {
    const response = await api.post<RequestSupportDTO.IResponse>(
      "/users/support",
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
