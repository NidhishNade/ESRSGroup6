"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { isLogin } = useContext(AppContext);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("isUserLoggedIn");
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("userid");
      window.location.href = "/";
    }
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <nav className="bg-[#Ecf0f4] p-4 z-40">
      <div className="container mx-auto flex justify-between items-center xl:space-x-12">
        <div className="text-gray-950 text-xl font-bold">
          <Link href="/">
            <Image
              src="/assets/logo-color.png"
              alt="logo"
              height={250}
              width={250}
              className="rounded-md"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between space-x-4 xl:space-x-12">
          <div className="hidden md:flex space-x-8 xl:space-x-12">
            <Link href="/all-events" className="text-gray-950 hover:underline">
              All Events
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="focus:outline-none">
              <Image
                src="/assets/user.svg"
                alt="Profile Icon"
                className="w-8 h-8 rounded-lg p-1 border border-gray-950"
                width={8}
                height={8}
              />
            </button>
            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-lg z-20">
                <ul className="py-2">
                  {isLogin && (
                    <>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link
                          onClick={() =>
                            setProfileDropdownOpen(!profileDropdownOpen)
                          }
                          href="/my-account">
                          My Account
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link
                          onClick={() =>
                            setProfileDropdownOpen(!profileDropdownOpen)
                          }
                          href="/my-events">
                          My Events
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link onClick={handleLogout} href="/">
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                  {!isLogin && (
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link
                        onClick={() =>
                          setProfileDropdownOpen(!profileDropdownOpen)
                        }
                        href="/signIn">
                        Sign In
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block md:hidden focus:outline-none text-gray-950">
            {/* Menu Icon */}
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <Link href="/all-events" className="text-gray-950 hover:underline">
            All Events
          </Link>
        </div>
      )}
    </nav>
  );
}
