import type { Pagination } from "../pagination";

export namespace PublicJobs {
  export type Company = {
    id: number;
    name: string;
    sector: string | null;
    location: string | null;
    size: number | null;
    logo_url: string | null;
  };

  export type Summary = {
    id: number; // hiring process id (what a candidate applies to)
    title: string;
    modality: string | null;
    regime: string | null;
    location: string | null;
    salary: string | null;
    excerpt: string;
    company: Company;
  };

  export type Detail = Summary & {
    description: string;
    requirements: string;
    work_schedule: string | null;
    skills: string[];
    knowledges: string[];
    closes_on: string | null;
  };

  export type List = { records: Summary[]; pagination: Pagination };
  export type CompanyPage = { company: Company; jobs: Summary[]; pagination: Pagination };
}
