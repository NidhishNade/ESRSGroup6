"use client";
import React, { useContext, useEffect, useState } from "react";
import Login from "./login/page";
import SignUp from "./signup/page";
import { InfoContext } from "@/context/infoContext";
import Aos from "aos";
import "aos/dist/aos.css";
const Register = () => {
  const { loginState } = useContext(InfoContext);
  useEffect(() => {
    Aos.init();
  }, [loginState]);
  return (
    <React.Fragment>
      <div className="w-full flex flex-row justify-center p-5">
        <div className="w-1/2 flex justify-center">
          <img
            src="assets/images/login.png"
            alt="Login Image"
            width={500}
            height={500}
          />
        </div>
        <div className="w-1/2 flex justify-center">
          {loginState ? <Login /> : <SignUp />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
