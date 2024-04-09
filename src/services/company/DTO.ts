type Company = {
  id: number;
  company_name: string;
  cnpj: string;
  sector: string;
  company_size: number;
  company_location: string;
  created_at: Date;
  updated_at: Date;
};

export namespace GetCompanyDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    company: Company;
  }
}

export namespace GetCompaniesDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    companies: Company[];
  }
}

export namespace CreateCompanyDTO {
  export interface IParams {
    company_name: string;
    cnpj: string;
    sector: string;
    company_size: number;
    company_location: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    company: Company;
  }
}

export namespace UpdateCompanyDTO {
  export interface IParams {
    company_name?: string;
    cnpj?: string;
    sector?: string;
    company_size?: number;
    company_location?: string;
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    company: Company;
  }
}

export namespace DeleteCompanyDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    company: Company;
  }
}
