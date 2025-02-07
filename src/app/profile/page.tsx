"use client";
import axios from "axios";
import Link from "next/link";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-5 w-[400px] border border-gray-100 rounded-xl h-[300px] flex flex-col transition duration-500 delay-5000 ease-in-out hover:-translate-y-1 hover:shadow-gray-500 hover:shadow-lg">
        <h1 className="text-3xl  font-bold text-center decoration-none mb-4">
          Profile
        </h1>

        <h2 className="p-3 rounded text-center text-xl">
          {data === "nothing" ? (
            "Click button to get username"
          ) : (
            <Link href={"/profile/${data"}>{data}</Link>
          )}
        </h2>
        <div className="mt-10 flex flex-col justify-center items-center">
          <button
            onClick={getUserDetails}
            className="w-full p-2 mb-4 mr-10 ml-10 text-black border border-gray-900 rounded-lg bg-slate-300 focus:outline:none focus:border-gray-400 hover:translate-y-1 hover:scale-105"
          >
            Get User Details
          </button>
          <button
            onClick={logout}
            className="p-2 mb-4 mr-10 ml-10 text-black border border-gray-900 rounded-lg bg-slate-300 focus:outline:none focus:border-gray-400 hover:translate-y-1 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
