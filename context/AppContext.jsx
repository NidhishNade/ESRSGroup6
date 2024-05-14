"use client";
import React, { useState, createContext } from "react";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {


  const [isLogin, setIsLogin] = useState(() => {
    if (typeof window !== "undefined") {
      const isUserLoggedIn = window.localStorage.getItem("isUserLoggedIn");
      return isUserLoggedIn === "true";
    }
    return false;
  });
  const [loginState, setLoginState] = useState(true);

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        loginState,
        setLoginState,
      }}>
      <div>{children}</div>
    </AppContext.Provider>
  );
};
