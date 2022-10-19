import React from "react";
import { useState, createContext, ReactNode, useEffect } from "react";
import { AuthFirebase } from "../firebase/AuthFirebase";

type AuthProviderProps = {
  children: ReactNode;
};

export type User = {
  id?: string;
  name?: string;
  avatar?: string;
  email?: string;
};

type AuthContextType = {
  googleAuth: () => void;
  logout: () => void;
  getCurrentUser: () => any
  currentUser?: User;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  useEffect(() => {
    AuthFirebase.onUserSession(handleCurrentUser);
  }, []);

  const handleCurrentUser = (user?: User, error?: any) => {
    setCurrentUser(user);
    if (error?.message) {
      alert("  Credenciais inválidas.  ");
      setInvalidEmail(true);
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
      setInvalidEmail(false);
    }
  };

  const googleAuth = () => {
    try {
      AuthFirebase.googleAuth();
    } catch (error: any) {
      throw alert("There was a problem logging in");
    }
  };

  const logout = async () => {
    try {
      await AuthFirebase.logout();
    } catch (error: any) {
      throw alert("There was a problem logging out");
    }
  };

  const getCurrentUser = async () => {
    try {
      return await AuthFirebase.getCurrentUser()
    } catch (error: any) {
      throw new alert('There was a problem rescuing the user')
    }
  }


  const ProviderValues = {
    googleAuth,
    logout,
    getCurrentUser,
    currentUser,
    invalidPassword,
    invalidEmail,
  };

  return (
    <AuthContext.Provider value={ProviderValues}>
      {children}
    </AuthContext.Provider>
  );
};
