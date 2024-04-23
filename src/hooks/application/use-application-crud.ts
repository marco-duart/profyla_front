import { useEffect, useState } from "react";

import { useUserContext } from "../use-user-context";
import {
  GetApplication,
  GetApplications,
} from "../../services/applicationStatus";

import { ApplicationShow } from "../../services/applicationStatus/DTO";

type State = {
  applications: undefined | ApplicationShow[];
};

const INITIAL_STATE = {
  applications: undefined,
};

export const useApplicationCrud = (prefix: string) => {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const { token } = useUserContext();

  const fetchApplication = async () => {
    if (!token) {
      return;
    }
    const { applications } = await GetApplications({ prefix, token });
    console.log(applications);
    setState({ applications });
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return {
    applications: state.applications,
  };
};
