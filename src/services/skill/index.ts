import { isAxiosError } from "axios";
import api from "../api";
import {
  GetSkillsDTO,
  CreateSkillDTO,
  DeleteSkillDTO,
  AssignSkillDTO,
  RemoveSkillDTO,
} from "./DTO";

export const GetSkills = async (params: GetSkillsDTO.IParams) => {
  try {
    const { prefix, token } = params;
    const response = await api.get<GetSkillsDTO.IResponse>(
      `/${prefix}/skills`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      skills: response.data.skill,
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

export const CreateSkill = async (params: CreateSkillDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateSkillDTO.IResponse>("/admins/skill", {
      params: restParams,
      headers: { Authorization: token },
    });

    return {
      success: true,
      message: "MESSAGE",
      skill: response.data.skill,
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

export const DeleteSkill = async (params: DeleteSkillDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteSkillDTO.IResponse>(
      `/admins/skill/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      skill: response.data.skill,
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

export const AssignSkill = async (params: AssignSkillDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<AssignSkillDTO.IResponse>(
      "/candidates/skill",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      skill: response.data.skill,
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

export const RemoveSkill = async (params: RemoveSkillDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.delete<RemoveSkillDTO.IResponse>(
      `/candidates/skill/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      skill: response.data.skill,
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
