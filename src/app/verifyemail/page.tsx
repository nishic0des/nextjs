"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function verifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-5 w-[700px] border border-gray-100 rounded-xl h-[300px] flex flex-col transition duration-500 delay-5000 ease-in-out hover:-translate-y-1 hover:shadow-gray-500 hover:shadow-lg justify-center items-center">
        {" "}
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2  text-white text-lg">
          {token ? `${token}` : "No token"}
        </h2>
        {verified && (
          <div>
            <h2 className="text-2xl ">Email Verified</h2>
            <Link
              href="/login"
              className="p-2 mb-4 mr-10 ml-10 text-black border border-gray-900 rounded-lg bg-slate-300 focus:outline:none focus:border-gray-400 hover:translate-y-1 hover:scale-105"
            >
              Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl text-red-500 text-center mb-5 rounded-lg text-black">
              Error
            </h2>
            <Link
              href="/login"
              className="p-2 mb-4 mt-10 mr-10 ml-10 text-white border border-gray-300 rounded-lg bg-slate-800 focus:outline:none focus:border-gray-400 hover:translate-y-1 hover:scale-105"
            >
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
