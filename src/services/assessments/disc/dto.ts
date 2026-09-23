export namespace DiscQuestions {
  export type Item = { id: string; text: string };
  export type Response = Item[];
}

export namespace DiscResult {
  export type Dimensions = { D: number; I: number; S: number; C: number };

  export type Profile = {
    primary: keyof Dimensions;
    secondary: keyof Dimensions;
    label: string;
    gap: number;
  };

  export type Quality = {
    neutral_rate: number;
    extreme_rate: number;
    low_differentiation: boolean;
  };

  export type Attempt = {
    id: number;
    assessment_version: string;
    dimensions: Dimensions;
    traits: Record<string, number>;
    profile: Profile;
    quality: Quality;
    completed_at: string;
  };

  export type Response = {
    latest: Attempt | null;
    history: Attempt[];
  };
}

export namespace SubmitDisc {
  export type Params = { answers: Record<string, string> };
  export type Response = DiscResult.Response;
}
