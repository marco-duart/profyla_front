export namespace EneagramaQuestions {
  export type Item = { id: string; text: string };
  export type Response = Item[];
}

export namespace EneagramaResult {
  export type Types = {
    E1: number; E2: number; E3: number; E4: number; E5: number;
    E6: number; E7: number; E8: number; E9: number;
  };

  export type Centers = { instinctive: number; emotional: number; mental: number };

  export type Profile = {
    primary: keyof Types;
    primary_score: number;
    secondary: keyof Types;
    secondary_score: number;
    gap: number;
    wing: keyof Types | null;
    wing_gap: number;
    label: string;
  };

  export type Quality = {
    neutral_rate: number;
    extreme_rate: number;
    low_differentiation: boolean;
  };

  export type Attempt = {
    id: number;
    assessment_version: string;
    types: Types;
    traits: Record<string, number>;
    centers: Centers;
    profile: Profile;
    quality: Quality;
    completed_at: string;
  };

  export type Response = {
    latest: Attempt | null;
    history: Attempt[];
  };
}

export namespace SubmitEneagrama {
  export type Params = { answers: Record<string, string> };
  export type Response = EneagramaResult.Response;
}
