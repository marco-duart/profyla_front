type Knowledge = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

export namespace GetKnowledgesDTO {
  export interface IParams {
    prefix: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    knowledge: Knowledge[];
  }
}

export namespace CreateKnowledgeDTO {
  export interface IParams {
    title: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    knowledge: Knowledge;
  }
}

export namespace DeleteKnowledgeDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    knowledge: Knowledge;
  }
}

export namespace AssignKnowledgeDTO {
  export interface IParams {
    candidate_knowledges_attributes: { knowledge_id: number }[];
    token: string;
  }
  export interface IResponse {
    message: string;
    knowledge: Knowledge;
  }
}

export namespace RemoveKnowledgeDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    knowledge: Knowledge;
  }
}
