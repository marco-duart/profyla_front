export namespace Scorecard {
  export type Criterion = { id: number; name: string };

  export type Entry = {
    id: number;
    evaluator_user_id: number;
    evaluator_name: string | null;
    comment: string | null;
    average: number | null;
    updated_at: string;
    scores: { criterion_id: number; score: number }[];
  };

  export type Detail = {
    interview_id: number;
    criteria: Criterion[];
    scorecards: Entry[];
    average: number | null;
  };

  export type Summary = { average: number | null; evaluations: number };
}
