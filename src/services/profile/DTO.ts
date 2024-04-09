type Profile = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

type CandidateProfile = {
  id: number;
  candidate_id: number;
  profile_id: number;
  created_at: Date;
  updated_at: Date;
};

export namespace GetProfilesDTO {
  export interface IParams {
    token: string;
  }
  export interface IResponse {
    message: string;
    profile: Profile[];
  }
}

export namespace CreateProfileDTO {
  export interface IParams {
    title: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    profile: Profile;
  }
}

export namespace DeleteProfileDTO {
  export interface IParams {
    id: string;
    token: string;
  }
  export interface IResponse {
    message: string;
    profile: Profile;
  }
}

export namespace AssignProfileDTO {
  export interface IParams {
    user_id: number;
    profile_id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    candidateProfile: CandidateProfile;
  }
}

export namespace RemoveProfileDTO {
  export interface IParams {
    user_id: number;
    candidate_profile_id: number;
    token: string;
  }
  export interface IResponse {
    message: string;
    candidateProfile: CandidateProfile;
  }
}
