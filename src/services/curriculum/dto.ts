export namespace CurriculumData {
  export type Document = {
    id: number;
    document_name: string;
    document_number: string;
    issue_date?: string;
    location?: string;
  };

  export type AcademicHistory = {
    id: number;
    title: string;
    institution: string;
    degree: string;
    start_date?: string;
    end_date?: string;
  };

  export type EmploymentHistory = {
    id: number;
    company_name: string;
    position: string;
    salary?: string;
    start_date?: string;
    end_date?: string;
    leaving_reason?: string;
  };

  export type LinkItem = {
    id: number;
    title: string;
    link: string;
  };

  export type Response = {
    candidate_profile: {
      id: number;
      resume: string;
      address_city: string;
      address_neighborhood: string;
    };
    documents: Document[];
    academic_histories: AcademicHistory[];
    employment_histories: EmploymentHistory[];
    professional_links: LinkItem[];
    social_links: LinkItem[];
    skills: { id: number; title: string }[];
    knowledges: { id: number; title: string }[];
    profiles: { id: number; title: string }[];
  };
}

export namespace CreateAcademic {
  export type Params = {
    title: string;
    institution: string;
    degree: string;
    start_date?: string;
    end_date?: string;
  };
}

export namespace CreateEmployment {
  export type Params = {
    company_name: string;
    position: string;
    salary?: string;
    start_date?: string;
    end_date?: string;
    leaving_reason?: string;
    achievements?: string;
    reference_name?: string;
    reference_phone?: string;
  };
}

export namespace CreateLink {
  export type Params = {
    title: string;
    link: string;
  };
}
