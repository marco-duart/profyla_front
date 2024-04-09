import { isAxiosError } from "axios";
import api from "../api";
import {
  GetDocumentDTO,
  GetDocumentsDTO,
  CreateDocumentDTO,
  UpdateDocumentDTO,
  DeleteDocumentDTO,
} from "./DTO";

export const GetDocument = async (params: GetDocumentDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.get<GetDocumentDTO.IResponse>(
      `/candidates/document/${id}`,
      { headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      document: response.data.document,
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

export const GetDocuments = async (params: GetDocumentsDTO.IParams) => {
  try {
    const { token } = params;
    const response = await api.get<GetDocumentsDTO.IResponse>(
      "/candidates/documents",
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      documents: response.data.document,
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

export const CreateDocument = async (params: CreateDocumentDTO.IParams) => {
  try {
    const { token, ...restParams } = params;
    const response = await api.post<CreateDocumentDTO.IResponse>(
      "/candidates/document",
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      document: response.data.document,
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

export const UpdateDocument = async (params: UpdateDocumentDTO.IParams) => {
  try {
    const { id, token, ...restParams } = params;
    const response = await api.patch<UpdateDocumentDTO.IResponse>(
      `/candidates/document/${id}`,
      { params: restParams, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      document: response.data.document,
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

export const DeleteDocument = async (params: DeleteDocumentDTO.IParams) => {
  try {
    const { id, token } = params;
    const response = await api.delete<DeleteDocumentDTO.IResponse>(
      `/candidates/document/${id}`,
      { params, headers: { Authorization: token } }
    );

    return {
      success: true,
      message: "MESSAGE",
      document: response.data.document,
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
