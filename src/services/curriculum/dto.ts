export namespace CurriculumData {
  export type Document = {
    id: number;
    document_name: string;
    document_number: string;
    issue_date?: string;
    location?: string;
    image_url?: string | null;
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
    achievements?: string;
    reference_name?: string;
    reference_phone?: string;
  };

  export type LinkItem = {
    id: number;
    title: string;
    link: string;
  };

  export type SkillItem = {
    id: number;
    skill_id: number;
    title: string;
  };

  export type KnowledgeItem = {
    id: number;
    knowledge_id: number;
    title: string;
  };

  export type Profile = {
    id: number;
    phone_number1?: string;
    phone_number2?: string;
    employee?: boolean;
    resume?: string;
    birthplace?: string;
    gender?: string;
    birthdate?: string;
    marital_status?: string;
    address_neighborhood?: string;
    address_city?: string;
    mother_name?: string;
    spouse_name?: string;
    number_of_children?: number;
    residence_status?: string;
    possessions?: string;
    other_incomes?: boolean;
    relatives_in_company?: boolean;
    pcd?: string;
    smoker?: boolean;
    alcohol_consumer?: boolean;
    medication_user?: boolean;
    first_question?: string;
    second_question?: string;
    third_question?: string;
    fourth_question?: string;
    fifth_question?: string;
  };

  export type Response = {
    candidate_profile: Profile | null;
    curriculum_file: { filename: string; byte_size: number; url: string } | null;
    documents: Document[];
    academic_histories: AcademicHistory[];
    employment_histories: EmploymentHistory[];
    professional_links: LinkItem[];
    social_links: LinkItem[];
    skills: SkillItem[];
    knowledges: KnowledgeItem[];
    profiles: { id: number; title: string }[];
  };
}

export namespace CreateAcademic {
  export type Params = {
    title: string;
    institution?: string;
    degree?: string;
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

export namespace CreateDocument {
  export type Params = {
    document_name: string;
    document_number: string;
    issue_date?: string;
    location?: string;
    image?: File;
  };
}

export namespace CatalogItem {
  export type Item = {
    id: number;
    title: string;
  };
}

// WP-42: importação do currículo a partir do PDF (rascunho -> revisão -> aplicar).
export namespace CurriculumImport {
  export type Confidence = "high" | "medium" | "low";
  export type ProfileField =
    | "phone_number1"
    | "phone_number2"
    | "address_city"
    | "address_neighborhood"
    | "birthplace"
    | "birthdate"
    | "employee"
    | "resume";

  export type ProfileItem = {
    field: ProfileField;
    value: string | boolean;
    current: string | boolean | null;
    confidence: Confidence;
    selected: boolean;
  };

  export type EmploymentData = {
    company_name: string | null;
    position: string | null;
    start_date: string | null;
    end_date: string | null;
    achievements: string | null;
  };

  export type AcademicData = {
    title: string | null;
    institution: string | null;
    degree: string | null;
    start_date: string | null;
    end_date: string | null;
  };

  export type LinkData = { title: string; link: string };

  export type ListItem<T> = {
    key: string;
    confidence: Confidence;
    selected: boolean;
    missing: string[];
    warnings: string[];
    data: T;
  };

  export type CatalogEntry = { skill_id?: number; knowledge_id?: number; title: string; selected: boolean };

  export type Draft = {
    run_id: number;
    source: {
      filename: string;
      pages_read: number;
      truncated: boolean;
      columns_detected: boolean;
      headings_found: boolean;
      parser_version: string;
      skipped_duplicates: number;
      notes: string[];
    };
    profile: ProfileItem[];
    employment_histories: ListItem<EmploymentData>[];
    academic_histories: ListItem<AcademicData>[];
    professional_links: ListItem<LinkData>[];
    social_links: ListItem<LinkData>[];
    skills: CatalogEntry[];
    knowledges: CatalogEntry[];
    unmatched_terms: string[];
  };

  export type ApplyItem<T> = { data: T; edited: boolean };

  export type ApplyPayload = {
    run_id: number;
    profile: Partial<Record<ProfileField, string | boolean>>;
    employment_histories: ApplyItem<EmploymentData>[];
    academic_histories: ApplyItem<AcademicData>[];
    professional_links: ApplyItem<LinkData>[];
    social_links: ApplyItem<LinkData>[];
    skill_ids: number[];
    knowledge_ids: number[];
  };
}
