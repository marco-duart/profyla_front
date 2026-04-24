export namespace AdminExam {
  export type Alternative = {
    id: number;
    text: string;
    correct: boolean;
  };

  export type Question = {
    id: number;
    text: string;
    question_type: string;
    alternatives: Alternative[];
  };

  export type Item = {
    id: number;
    title: string;
    description: string;
    department: string;
    theme_url?: string;
    questions?: Question[];
  };

  export type UpsertParams = {
    title: string;
    description: string;
    department: string;
  };

  export type CreateQuestionParams = {
    text: string;
    question_type: string;
    alternatives_attributes: Array<{ text: string; correct: boolean }>;
  };
}
