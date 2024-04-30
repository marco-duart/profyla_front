import { useEffect, useState } from "react";

import { useUserContext } from "../user/use-user-context";
import {
  DeleteCompany,
  GetCompanies,
  CreateCompany,
  UpdateCompany,
  GetCompany,
} from "../../services/company/index";

import { Company } from "../../services/company/DTO";

type State = {
  companies: undefined | Company[];
};

const INITIAL_STATE = {
  companies: undefined,
};

export type CreateCompanyData = {
  company_name: string;
  business_name: string;
  cnpj: string;
  sector: string;
  company_size: number;
  company_location: string;
};

export type UpdateCompanyData = {
  id: number;
  business_name: string;
  sector: string;
  company_size: number;
  company_location: string;
};

export type DeleteCompanyData = {
  id: number;
};

export const useCompanyCrud = () => {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const { token } = useUserContext();

  const fetchCompanies = async () => {
    if (!token) {
      return;
    }

    const { companies } = await GetCompanies({ token });
    setState({ companies });
  };

  const createCompany = async (data: CreateCompanyData) => {
    if (!token) {
      return;
    }

    const params = { ...data, token };
    await CreateCompany(params);
    fetchCompanies();
  };

  const deleteCompany = async (data: DeleteCompanyData) => {
    if (!token) {
      return;
    }

    const params = { ...data, token };
    await DeleteCompany(params);
    fetchCompanies();
  };

  const updateCompany = async (data: UpdateCompanyData) => {
    if (!token) {
      return;
    }

    const params = { ...data, token };
    await UpdateCompany(params);
    fetchCompanies();
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return {
    companies: state.companies,
    createCompany,
    deleteCompany,
    updateCompany,
  };
};
