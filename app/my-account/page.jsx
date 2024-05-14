"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  let changePasswordLink = "/change-password/";
  if (typeof window !== "undefined") {
    const username = window.localStorage.getItem("username");
    changePasswordLink += username;
  }

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://ticketing-backend-iiyn.onrender.com/userdetails?username=${localStorage.getItem(
        "username"
      )}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const user = JSON.parse(result);
        document.getElementById("name").value = user.firstname + user.lastname;
        document.getElementById("email").value = user.email;
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-color3 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-color5">
          Your Profile
        </h2>
        <div className="flex flex-col items-center">
          <Image
            src="/assets/user.svg"
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-200 mb-4"
            width={24}
            height={24}
          />
        </div>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled
            />
          </div>

          <div className="w-full flex justify-around">
            <Link
              href={changePasswordLink}
              className="mt-4 inline-block bg-color4 text-color2 px-6 py-2 rounded hover:bg-color3 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
              Change Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
