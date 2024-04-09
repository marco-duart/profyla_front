import { isAxiosError } from "axios";
import api from "../api";
import {
  GetJobPostingDTO,
  GetJobPostingsDTO,
  CreateJobPostingDTO,
  UpdateJobPostingDTO,
  DeleteJobPostingDTO,
} from "./DTO";

export const GetJobPosting = async (params: GetJobPostingDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.get<GetJobPostingDTO.IResponse>(
      `/admins/job/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      jobPosting: response.data.job,
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

export const GetJobPostings = async (params: GetJobPostingsDTO.IParams) => {
  try {
    const { token } = params;
    const response = await api.get<GetJobPostingsDTO.IResponse>(
      "/admins/jobs",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      jobPostings: response.data.jobs,
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

export const CreateJobPosting = async (params: CreateJobPostingDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateJobPostingDTO.IResponse>(
      "/admins/job",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      jobPosting: response.data.job,
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

export const UpdateJobPosting = async (params: UpdateJobPostingDTO.IParams) => {
  try {
    const { id, token, ...restParams } = params;
    const response = await api.patch<UpdateJobPostingDTO.IResponse>(
      `/admins/job/${id}`,
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      jobPosting: response.data.job,
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

export const DeleteJobPosting = async (params: DeleteJobPostingDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteJobPostingDTO.IResponse>(
      `/admins/job/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      jobPosting: response.data.job,
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
