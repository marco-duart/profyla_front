import { GetCompanies } from "../../services/company/index"
import { useEffect, useState } from "react";
import { Company } from "../../services/company/DTO";
import { useUserContext } from "../../hooks/use-user-context";

type State = {
  companies: null | Company[];
};

const INITIAL_STATE = {
  companies: null
}

export const useFetchCompanies = () => {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const { token } = useUserContext()
  
  const fetch = async () => {
    setState((prev) => ({ ...prev, loading: true }));

    if(!token) {
      return
    }
    const { companies } = await GetCompanies({token});
    if (companies) {
      setState({companies});
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    companies: state.companies
  };
};
