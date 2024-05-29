import { useEffect, useState } from "react";

import { useUserContext } from "../use-user-context";
import { GetAllCandidates } from "../../services/candidate/index"
import { CandidateDetail } from "../../services/candidate/DTO"

type State = {
  candidates: CandidateDetail[] | undefined;
  pageable?: {
    offset: number | undefined;
    page: number | undefined;
    page_size: number | undefined;
    total_page: number | undefined;
    total_item: number | undefined;
    paged: number | undefined;
    };
};

const INITIAL_STATE = {
  candidates: undefined,
  pageable: {
    offset: undefined,
    page: undefined,
    page_size: undefined,
    total_page: undefined,
    total_item: undefined,
    paged: undefined
    }
};



export const useGetCandidates = () => {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const { token } = useUserContext();

  const fetchCandidates = async () => {
    if(!token) {
      return
    }
    const params = { token, filters: {} }
    const { candidates } = await GetAllCandidates(params)
    console.log(candidates)
    setState({ candidates })
  };

 
  useEffect(() => {
    fetchCandidates();
  }, []);

  return {
    candidates: state.candidates
  };
};
