import type { DiscResult } from "../../assessments/disc/dto";
import type { EneagramaResult } from "../../assessments/eneagrama/dto";

export namespace AdminCandidate {
  export type ListItem = {
    id: number;
    candidate_id: number;
    name: string;
    email: string;
    resume?: string;
    skills: string[];
    tags: string[];
    applications_count: number;
    disc_label: string | null;
    eneagrama_label: string | null;
  };

  export type Document = {
    id: number;
    document_name: string;
    document_number: string;
    issue_date?: string;
    location?: string;
    file_attached?: boolean;
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

  export type LinkItem = { id: number; title: string; link: string };
  export type TagItem = { id: number; title: string };

  export type ApplicationItem = {
    id: number;
    job_name: string;
    company_name: string;
    stage: string;
    status_tone: "positive" | "negative" | "neutral";
    terminal_state: boolean;
    match_score?: number | null;
    scorecard?: { average: number | null; evaluations: number };
    created_at: string;
  };

  export type Detail = {
    id: number;
    candidate_id: number;
    name: string;
    email: string;
    photo_url?: string | null;
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
    created_at?: string;
    updated_at?: string;
    curriculum_attached?: boolean;
    documents: Document[];
    academic_histories: AcademicHistory[];
    employment_histories: EmploymentHistory[];
    professional_links: LinkItem[];
    social_links: LinkItem[];
    skills: TagItem[];
    knowledges: TagItem[];
    tags?: string[];
    applications: ApplicationItem[];
    // null when the candidate withdrew the assessment consent (results are then hidden).
    disc_assessment: DiscResult.Response | null;
    eneagrama_assessment: EneagramaResult.Response | null;
  };
}
