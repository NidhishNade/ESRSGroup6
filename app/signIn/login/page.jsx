"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const { setIsLogin, setLoginState } = useContext(AppContext);
  const [loginFormDetail, setLoginFormDetail] = useState({});

  const router = useRouter();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(loginFormDetail);
    const raw = JSON.stringify(loginFormDetail);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://ticketing-backend-iiyn.onrender.com/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        var ResultObj = JSON.parse(result);
        if (ResultObj.email === loginFormDetail.email) {
          window.localStorage.setItem("isUserLoggedIn", true);
          window.localStorage.setItem("username", ResultObj.username);
          window.localStorage.setItem("userid", ResultObj.userid);
          window.localStorage.setItem("email", ResultObj.email);

          setIsLogin(true);
          router.push("/");
        }else{
          toast({
            title: "Error!",
            description: "Invalid Email or Password",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error!",
          description: { error },
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <div
      data-aos="fade-left"
      className="w-4/6 bg-color2 h-4/6 my-auto flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <h6 className="mt-2 text-xl text-gray-900">
          Please Enter your details
        </h6>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {/* <div className="border-b-2 border-black my-2">
            <label htmlFor="UserName" className="sr-only">
              User Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
              placeholder="User Name"
              onChange={(e) => {
                setLoginFormDetail({
                  ...loginFormDetail,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div> */}

          <div className="border-b-2 border-black my-2">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => {
                setLoginFormDetail({
                  ...loginFormDetail,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>

          <div className="border-b-2 border-black my-2">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={(e) => {
                setLoginFormDetail({
                  ...loginFormDetail,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
        </div>

        {/* <div className="flex justify-end">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
        </div> */}

        <div className="w-full flex justify-around">
          <button
            type="submit"
            className="mt-4 inline-block bg-color4 text-color2 px-12 py-2 rounded hover:bg-color3 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
            Log in
          </button>
        </div>
      </form>
      <div className="mt-4">
        <p className="text-center">
          <span>Don&apos;t have an account? </span>
          <span>
            <button
              className="underline"
              onClick={() => {
                setLoginState((prev) => !prev);
              }}>
              Sign up
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
