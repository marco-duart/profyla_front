import { isAxiosError } from "axios";
import api from "../api";
import {
  GetCompanyDTO,
  GetCompaniesDTO,
  CreateCompanyDTO,
  UpdateCompanyDTO,
  DeleteCompanyDTO,
} from "./DTO";

export const GetCompany = async (params: GetCompanyDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.get<GetCompanyDTO.IResponse>(
      `/admins/company/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      company: response.data.company,
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

export const GetCompanies = async (params: GetCompaniesDTO.IParams) => {
  try {
    const { token } = params;
    const response = await api.get<GetCompaniesDTO.IResponse>(
      "/admins/companies",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      companies: response.data.companies,
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

export const CreateCompany = async (params: CreateCompanyDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateCompanyDTO.IResponse>(
      "/admins/company",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      company: response.data.company,
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

export const UpdateCompany = async (params: UpdateCompanyDTO.IParams) => {
  try {
    const { id, token, ...restParams } = params;
    const response = await api.patch<UpdateCompanyDTO.IResponse>(
      `/admins/company/${id}`,
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      company: response.data.company,
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

export const DeleteCompany = async (params: DeleteCompanyDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteCompanyDTO.IResponse>(
      `/admins/company/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      company: response.data.company,
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
