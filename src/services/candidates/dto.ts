export namespace CreateCandidateProfile {
  export type Params = {
    phone_number1: string;
    phone_number2: string;
    employee: boolean;
    resume: string;
    birthplace: string;
    gender: string;
    birthdate: string;
    marital_status: string;
    address_neighborhood: string;
    address_city: string;
    mother_name: string;
    spouse_name: string;
    number_of_children: number;
    residence_status: string;
    possessions: string;
    other_incomes: boolean;
    relatives_in_company: boolean;
    pcd: string;
    smoker: boolean;
    alcohol_consumer: boolean;
    medication_user: boolean;
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
