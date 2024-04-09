type DynamicExam = {
  id: number;
  title: string;
  description: string;
  department: string;
  created_at: Date;
  updated_at: Date;
};

type DynamicExamDetail = {
  id: number;
  title: string;
  description: string;
  department: string;
  created_at: Date;
  updated_at: Date;
  questions: {
    id: number;
    text: string;
    question_type: string;
    created_at: Date;
    updated_at: Date;
    alternatives: {
      id: number;
      correct: boolean;
      text: string;
      created_at: Date;
      updated_at: Date;
      exam_question_id: number;
    }[];
  }[];
};

export namespace GetDynamicExamDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    exam: DynamicExamDetail;
  }
}

export namespace GetDynamicExamsDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    exams: DynamicExam[];
  }
}

export namespace CreateDynamicExamDTO {
  export interface IParams {
    title: string;
    description: string;
    department: string;
    theme: File;
    token: string;
  }
  export interface IResponse {
    message: string;
    exam: DynamicExam;
  }
}

export namespace UpdateDynamicExamDTO {
  export interface IParams {
    title?: string;
    description?: string;
    department?: string;
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    exam: DynamicExam;
  }
}

export namespace DeleteDynamicExamDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    exam: DynamicExam;
  }
}
