//NATIVE
import React, { createContext, useEffect, useState } from "react";
//LIBRARIES

//COMPONENTS
import { LoggedUser } from "../services/register";
//STYLES

//UTILS

type User = {
  id: number;
  name: string;
  role: "ti" | "admin" | "user";
  photo_url: string;
};

type State = {
  user: User | null;
};

type UserContext = {
  user: User | null;
  updateUser: (user: User, token: string) => void;
  logout: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContext>({
  user: null,
  updateUser: () => {},
  logout: () => {},
});

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<State>({
    user: null,
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
    });
  };

  const cleanUser = () => {
    localStorage.removeItem("ibc-tf-token");

    setState({
      user: null,
    });
  };

  useEffect(() => {
    if (!state.user) {
      autoLogin();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        updateUser,
        logout: cleanUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
