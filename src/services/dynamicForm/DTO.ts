type DynamicForm = {
  id: number;
  title: string;
  description: string;
  department: string;
  created_at: Date;
  updated_at: Date;
};

type DynamicFormDetail = {
  id: number;
  title: string;
  description: string;
  department: string;
  created_at: Date;
  updated_at: Date;
  questions: {
    id: number;
    question: string;
    response_type: string;
    created_at: Date;
    updated_at: Date;
    dynamic_form_id: number;
  }[];
};

export namespace GetDynamicFormDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    form: DynamicFormDetail;
  }
}

export namespace GetDynamicFormsDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    forms: DynamicForm[];
  }
}

export namespace CreateDynamicFormDTO {
  export interface IParams {
    title: string;
    description: string;
    department: string;
    theme: File;
    token: string;
  }
  export interface IResponse {
    message: string;
    form: DynamicForm;
  }
}

export namespace UpdateDynamicFormDTO {
  export interface IParams {
    title?: string;
    description?: string;
    department?: string;
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    form: DynamicForm;
  }
}

export namespace DeleteDynamicFormDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    form: DynamicForm;
  }
}
