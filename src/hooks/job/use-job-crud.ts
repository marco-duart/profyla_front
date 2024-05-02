import { useState } from "react";

import { useUserContext } from "../user/use-user-context";
import { CreateJobPosting, DeleteJobPosting, GetJobPosting, GetJobPostings, UpdateJobPosting } from "../../services/job-posting/index";

import { JobPosting } from "../../services/job-posting/DTO";

type State = {
  jobPostings: undefined | JobPosting[];
};

const INITIAL_STATE = {
  jobPostings: undefined,
};

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
  start_date?: string;
  end_date?: string;
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
  start_date?: string;
  end_date?: string;
};

export type DeleteJobData = {
  id: number;
};

export const useJobPostingCrud = () => {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const [companyId, setCompanyId] = useState<number>(0);
  const { token } = useUserContext();

  const fetchJobPostings = async (company_id: number) => {
    if (!token || !company_id) {
      return;
    }
    setCompanyId(company_id)

    const params = { company_id, token}
    const { jobPostings } = await GetJobPostings(params);
    setState({ jobPostings });
  };

  const createJobPosting = async (data: CreateJobData) => {
    if (!token || !companyId) {
      return;
    }

    const params = { ...data, token };
    await CreateJobPosting(params);
    fetchJobPostings(companyId);
  };

  const deleteJobPosting = async (data: DeleteJobData) => {
    if (!token || !companyId) {
      return;
    }

    const params = { ...data, token };
    await DeleteJobPosting(params);
    fetchJobPostings(companyId);
  };

  const updateJobPosting = async (data: UpdateJobData) => {
    if (!token || !companyId) {
      return;
    }

    const params = { ...data, token };
    await UpdateJobPosting(params);
    fetchJobPostings(companyId);
  };

  return {
    jobPostings: state.jobPostings,
    fetchJobPostings,
    createJobPosting,
    deleteJobPosting,
    updateJobPosting,
  };
};
