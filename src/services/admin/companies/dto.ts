export namespace AdminCompany {
  export type Item = {
    id: number;
    company_name: string;
    cnpj: string;
    sector: string;
    company_size: number;
    company_location: string;
    logo_url?: string;
    created_at?: string;
    updated_at?: string;
  };

  export type ListResponse = {
    companies: Item[];
  };

  export type UpsertParams = {
    company_name: string;
    cnpj: string;
    sector: string;
    company_size: number;
    company_location: string;
  };
}
