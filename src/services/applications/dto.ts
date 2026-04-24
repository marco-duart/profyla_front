export namespace ListApplications {
  export type Item = {
    id: number;
    stage_id: number;
    created_at?: string;
    updated_at?: string;
    stage: string;
    job_name: string;
    company_name: string;
    job_location?: string;
    modality?: string;
    terminal_state: boolean;
    status_tone: "positive" | "negative" | "neutral";
  };

  export type Response = Item[];
}

export namespace CreateApplication {
  export type Params = {
    hiring_process_stage_id: number;
  };

  export type Response = {
    id: number;
    hiring_process_stage_id: number;
    candidate_id: number;
  };
}

export namespace ApplicationDetail {
  export type Interview = {
    id: number;
    date_time: string;
    interview_type: string;
    interviewer: string;
    interview_method: string;
    resume: string;
  };

  export type FormField = {
    id: number;
    question: string;
    response_type: "text" | "string" | "number" | "boolean" | "date";
  };

  export type ExamAlternative = {
    id: number;
    text: string;
  };

  export type ExamQuestion = {
    id: number;
    text: string;
    alternatives: ExamAlternative[];
  };

  export type Response = {
    application_id: number;
    job_name: string;
    company_name: string;
    job_location?: string;
    modality?: string;
    salary?: string;
    stage: string;
    stage_id: number;
    hiring_process_id: number;
    terminal_state: boolean;
    status_tone: "positive" | "negative" | "neutral";
    summary: string;
    interviews: Interview[];
    feedback: {
      specific_comment?: string;
      improvements?: string;
    } | null;
    tools: {
      dynamic_form_id: number | null;
      dynamic_exam_id: number | null;
      has_form: boolean;
      has_exam: boolean;
      form_already_submitted: boolean;
      exam_already_submitted: boolean;
      can_withdraw: boolean;
      can_respond_interview: boolean;
      form_fields: FormField[];
      exam_questions: ExamQuestion[];
    };
  };
}

export namespace SubmitFormResponse {
  export type Params = {
    application_status_id: number;
    dynamic_form_id: number;
    form_responses_attributes: Record<number, { response: string | number | boolean }>;
  };

  export type Response = {
    id: number;
  };
}

export namespace SubmitExamResponse {
  export type Params = {
    application_status_id: number;
    dynamic_exam_id: number;
    exam_responses_attributes: Array<{ question_id: number; alternative_id: number }>;
  };

  export type Response = {
    id: number;
  };
}

export namespace WithdrawApplication {
  export type Params = {
    feedback: string;
  };

  export type Response = {
    message: string;
  };
}

export namespace InterviewResponse {
  export type Params = {
    interview_id: number;
    response: "accept" | "reschedule" | "decline";
    suggested_datetime?: string;
    message?: string;
  };

  export type Response = {
    message: string;
  };
}
