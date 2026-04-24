export namespace HomeData {
  export type Application = {
    id: number;
    stage_id: number;
    stage_title: string;
    hiring_process_id: number;
    job_title: string;
    company_name: string;
    terminal_state: boolean;
    created_at: string;
    updated_at: string;
  };

  export type Notification = {
    id: number;
    title: string;
    notification_type: string;
    message: string;
    created_at: string;
  };

  export type Opportunity = {
    hiring_process_id: number;
    status: string;
    initial_stage_id: number | null;
    initial_stage_title: string | null;
    job: {
      id: number;
      title: string;
      company_name: string;
      modality: string;
      salary: string;
      job_location: string;
    };
    already_applied: boolean;
  };

  export type Response = {
    profile_completion: number;
    outstanding_actions_count: number;
    latest_applications: Application[];
    notifications: Notification[];
    opportunities: Opportunity[];
  };
}
