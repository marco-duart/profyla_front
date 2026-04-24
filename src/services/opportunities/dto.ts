export namespace OpportunityList {
  export type Item = {
    hiring_process_id: number;
    status: string;
    initial_stage_id: number | null;
    initial_stage_title: string | null;
    stages_count: number;
    already_applied: boolean;
    job: {
      id: number;
      title: string;
      description: string;
      requirements: string;
      job_location: string;
      modality: string;
      regime: string;
      salary: string;
      work_schedule: string;
      company_name: string;
    };
  };

  export type Response = Item[];
}

export namespace OpportunityDetail {
  export type Response = OpportunityList.Item;
}
