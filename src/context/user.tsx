//NATIVE
import React, { createContext, useEffect, useState } from "react";
//LIBRARIES

//COMPONENTS
import { LoggedUser } from "../services/register";
//STYLES

//UTILS
import * as CONSTANTS from "../utils/constants/constants"

type User = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  newsletter: boolean;
  role: "ti" | "admin" | "user";
  photo_url: string;
};

type State = {
  user: User | null;
  token: string | null
};

type UserContext = {
  user: User | null;
  token: string | null
  autoLogin: () => void,
  updateUser: (user: User, token: string) => void;
  logout: () => void;
  isAdmin: () => boolean
};

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContext>({
  user: null,
  token: null,
  autoLogin: () => {},
  updateUser: () => {},
  logout: () => {},
  isAdmin: () => false
});

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<State>({
    user: null,
    token: null
  });

  const autoLogin = async () => {
    const token = localStorage.getItem("ibc-tf-token");

    if (!token) return cleanUser();

    const { success, user } = await LoggedUser({ token });

    if (!success) return cleanUser();

    if (success && user) {
      updateUser(user, token);
    }
  };

  const updateUser = (user: User, token: string) => {
    localStorage.setItem("ibc-tf-token", token);
    setState({
      user,
      token
    });
  };

  const cleanUser = () => {
    localStorage.removeItem("ibc-tf-token");

    setState({
      user: null,
      token: null
    });
  };

  const isAdmin = () => {
    const role = state.user?.role
    if(!role) {
      return false
    }
    return CONSTANTS.ADMIN_ONLY.includes(role)
  }

  useEffect(() => {
    if (!state.user) {
      autoLogin();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        token: state.token,
        autoLogin,
        updateUser,
        logout: cleanUser,
        isAdmin
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
