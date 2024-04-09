import { isAxiosError } from "axios";
import api from "../api";
import {
  GetProfilesDTO,
  CreateProfileDTO,
  DeleteProfileDTO,
  AssignProfileDTO,
  RemoveProfileDTO,
} from "./DTO";

export const GetProfiles = async (params: GetProfilesDTO.IParams) => {
  try {
    const { token } = params;
    const response = await api.get<GetProfilesDTO.IResponse>(
      "/admins/profiles",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      profiles: response.data.profile,
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

export const CreateProfile = async (params: CreateProfileDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateProfileDTO.IResponse>(
      "/admins/profile",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      profile: response.data.profile,
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

export const DeleteProfile = async (params: DeleteProfileDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteProfileDTO.IResponse>(
      `/admins/profile/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      profile: response.data.profile,
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

export const AssignProfile = async (params: AssignProfileDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<AssignProfileDTO.IResponse>(
      "/admins/candidate-profile",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      candidateProfile: response.data.candidateProfile,
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

export const RemoveProfile = async (params: RemoveProfileDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.delete<AssignProfileDTO.IResponse>(
      "/admins/candidate-profile",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      candidateProfile: response.data.candidateProfile,
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
