import { useEffect, useState } from "react";

import { useUserContext } from "../use-user-context";
import { CreateJobPosting, DeleteJobPosting, GetJobPosting, GetJobPostings, UpdateJobPosting } from "../../services/jobPosting/index";

import { JobPosting } from "../../services/jobPosting/DTO";

type State = {
  jobPostings: undefined | JobPosting[];
};

const INITIAL_STATE = {
  jobPostings: undefined,
};

// export type GetJobsData = {
//   company_id: number;
// }

export type CreateJobData = {
  company_id: number;
  title: string;
  description: string;
  requirements: string;
  job_location: string;
  regime: string;
  modality: string;
  salary: string;
  work_schedule: string;
  start_date: Date;
  end_date: Date;
};

export type UpdateJobData = {
  id: number;
  company_id: number;
  title: string;
  description: string;
  requirements: string;
  job_location: string;
  regime: string;
  modality: string;
  salary: string;
  work_schedule: string;
  start_date: Date;
  end_date: Date;
};

export type DeleteJobData = {
  id: number;
};

export const useJobPostingCrud = (company_id?: number) => {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const { token } = useUserContext();

  const fetchCompanies = async () => {
    if (!token || !company_id) {
      return;
    }

    const params = { company_id, token}
    const { jobPostings } = await GetJobPostings(params);
    setState({ jobPostings });
  };

  const createJobPosting = async (data: CreateJobData) => {
    if (!token) {
      return;
    }

    const params = { ...data, token };
    await CreateJobPosting(params);
    fetchCompanies();
  };

  const deleteJobPosting = async (data: DeleteJobData) => {
    if (!token) {
      return;
    }

    const params = { ...data, token };
    await DeleteJobPosting(params);
    fetchCompanies();
  };

  const updateJobPosting = async (data: UpdateJobData) => {
    if (!token) {
      return;
    }

    const params = { ...data, token };
    await UpdateJobPosting(params);
    fetchCompanies();
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return {
    jobPostings: state.jobPostings,
    createJobPosting,
    deleteJobPosting,
    updateJobPosting,
  };
};
