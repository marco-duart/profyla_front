export namespace AdminCandidate {
  export type AssessmentSummary = {
    profile_label: string;
    primary: string;
    completed_at: string;
  } | null;

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
    created_at?: string;
    updated_at?: string;
    curriculum_url?: string | null;
    disc_assessment: AssessmentSummary;
    eneagrama_assessment: AssessmentSummary;
  };
}
