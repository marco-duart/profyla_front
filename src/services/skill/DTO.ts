type Skill = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

export namespace GetSkillsDTO {
  export interface IParams {
    prefix: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    skill: Skill[];
  }
}

export namespace CreateSkillDTO {
  export interface IParams {
    title: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    skill: Skill;
  }
}

export namespace DeleteSkillDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    skill: Skill;
  }
}

export namespace AssignSkillDTO {
  export interface IParams {
    candidate_skills_attributes: { skill_id: number }[];
    token: string;
  }
  export interface IResponse {
    message: string;
    skill: Skill;
  }
}

export namespace RemoveSkillDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    skill: Skill;
  }
}
