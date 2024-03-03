"use client";
import React, { useState, createContext } from "react";
export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [loginState,setLoginState] = useState(false);


  return (
    <InfoContext.Provider value={{ loginState, setLoginState }}>
      <div>{children}</div>
    </InfoContext.Provider>
  );
};
