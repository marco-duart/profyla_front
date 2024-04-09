import { isAxiosError } from "axios";
import api from "../api";
import { CreateCandidateDTO, GetCandidatesDTO, GetCandidateDTO } from "./DTO";

export const GetCandidate = async (params: GetCandidateDTO.IParams) => {
  try {
    const { prefix, id, token } = params;
    // prefix: 'candidates' | 'admins/candidate'
    const response = await api.get<GetCandidateDTO.IResponse>(
      `/${prefix}/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      candidate: response.data.candidate,
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

export const GetAllCandidates = async (params: GetCandidatesDTO.IParams) => {
  try {
    const { token } = params;
    const response = await api.get<GetCandidatesDTO.IResponse>(
      "/admins/candidates",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      candidates: response.data.candidates,
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

export const CreateCandidate = async (params: CreateCandidateDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateCandidateDTO.IResponse>(
      "/candidates",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      candidate: response.data.candidate,
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
