export namespace CreateCandidateProfile {
  // Sensitive answers (LGPD) are optional: omit or send null to leave them blank.
  export type Params = {
    phone_number1: string;
    phone_number2: string;
    employee: boolean;
    resume: string;
    birthplace: string;
    gender: string;
    birthdate: string;
    marital_status?: string | null;
    address_neighborhood: string;
    address_city: string;
    mother_name?: string | null;
    spouse_name?: string | null;
    number_of_children?: number | null;
    residence_status: string;
    possessions?: string | null;
    other_incomes?: boolean | null;
    relatives_in_company?: boolean | null;
    pcd?: string | null;
    smoker?: boolean | null;
    alcohol_consumer?: boolean | null;
    medication_user?: boolean | null;
    first_question?: string;
    second_question?: string;
    third_question?: string;
    fourth_question?: string;
    fifth_question?: string;
  };

  export type Response = {
    message: string;
  };
}
