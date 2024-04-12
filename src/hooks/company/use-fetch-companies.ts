import { GetCompanies } from "../../services/company/index"
import { useEffect, useState } from "react";
import { Company } from "../../services/company/DTO";

type State = {
  companies: null | Company[];
};

type Props = {
  token: string
}

const INITIAL_STATE = {
  companies: null
}

export const useFetchCompanies = ({ token }: Props) => {
  const [state, setState] = useState<State>(INITIAL_STATE);

  const fetch = async () => {
    setState((prev) => ({ ...prev, loading: true }));
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
