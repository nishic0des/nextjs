"use client";

import axios from "axios";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  useEffect(() => {
    if (token) {
      const verifyUserEmail = async () => {
        try {
          await axios.post("/api/users/verifyemail", { token });
          setVerified(true);
        } catch (error: any) {
          setError(true);
          console.log(error.response?.data);
        }
      };

      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-5 w-[700px] border border-gray-100 rounded-xl h-[300px] flex flex-col transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-gray-500 hover:shadow-lg justify-center items-center">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 text-white text-lg">{token ? token : "No token"}</h2>

        {verified && (
          <div>
            <h2 className="text-2xl">Email Verified</h2>
            <Link
              href="/login"
              className="p-2 mb-4 text-black border border-gray-900 rounded-lg bg-slate-300 hover:translate-y-1 hover:scale-105"
            >
              Login
            </Link>
          </div>
        )}

        {error && (
          <div>
            <h2 className="text-2xl text-red-500 text-center mb-5">Error</h2>
            <Link
              href="/login"
              className="p-2 mb-4 mt-10 text-white border border-gray-300 rounded-lg bg-slate-800 hover:translate-y-1 hover:scale-105"
            >
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense>
      <VerifyEmailPage />
    </Suspense>
  );
}
