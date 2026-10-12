export namespace Metrics {
  export type StageMetric = {
    title: string;
    reached: number;
    conversion_percent: number;
    average_days: number | null;
  };

  export type Response = {
    filters: { from: string | null; to: string | null; hiring_process_id: number | null };
    totals: { applications: number; hired: number };
    time_to_hire_days: number | null;
    stages: StageMetric[];
    by_hiring_process: { hiring_process_id: number; job_title: string; applications: number }[];
  };

  export type Filters = { from?: string; to?: string; hiring_process_id?: string };
}
