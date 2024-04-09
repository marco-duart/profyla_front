type Candidate = {
  id: number;
  name: string;
  email: string;
  phone_number1: string;
  phone_number2: string;
  employee: boolean;
  resume: string;
  birthplace: string;
  gender: string;
  birthdate: Date;
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
  first_question: string;
  second_question: string;
  third_question: string;
  fourth_question: string;
  fifth_question: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
};

export namespace GetCandidateDTO {
  export interface IParams {
    prefix: string;
    id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    candidate: Candidate;
  }
}

export namespace GetCandidatesDTO {
  export interface IParams {
    page: number;
    page_size: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    candidates: Candidate[];
    pageable: {
      offset: number;
      page: number;
      page_size: number;
      total_page: number;
      total_item: number;
      paged: number;
    };
  }
}

export namespace CreateCandidateDTO {
  export interface IParams {
    phone_number1: string;
    phone_number2: string;
    employee: boolean;
    resume: string;
    birthplace: string;
    gender: string;
    birthdate: Date;
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
    first_question: string;
    second_question: string;
    third_question: string;
    fourth_question: string;
    fifth_question: string;
    curriculum: any;
    token: string;
  }
  export interface IResponse {
    message: string;
    candidate: Candidate;
  }
}
