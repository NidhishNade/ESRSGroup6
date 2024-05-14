"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import Aos from "aos";
import "aos/dist/aos.css";
import Login from "./login/page";
import SignUp from "./signup/page";

const Register = () => {
  const { loginState } = useContext(AppContext);

  useEffect(() => {
    Aos.init();
  }, [loginState]);
  
  return (
    <React.Fragment>
      <div className="w-full bg-color3 h-screen flex flex-row justify-center p-5">
        <div className="w-full md:w-1/2 flex justify-center">
          {loginState ? <Login /> : <SignUp />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
