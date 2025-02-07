"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("User found!");
      toast("Please chack your email and click on the verification link", {
        duration: 10000,
      });
    } catch (error: any) {
      toast.error("Enter valid email", error.message);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };
  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center min-h-screen p-4">
      <div className="p-5 w-[400px] border border-gray-100 rounded-xl h-[300px] flex flex-col transition duration-500 delay-5000 ease-in-out hover:-translate-y-1 hover:shadow-gray-500 hover:shadow-lg ">
        <header className="flex flex-col justify-center items-center p-3 m-4 mt-0 mb-0 space-y-1">
          <h1 className="text-3xl font-bold text-center decoration-none mb-4">
            Reset Password
          </h1>
          <p className="text-md align-left">
            Enter your email to reset password
          </p>
        </header>

        <label htmlFor="email" className="mr-1 m-2 mb-1 mr-1">
          Email:{" "}
        </label>
        <input
          type="email"
          required
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 ml-1 rounded-lg mb-8 focus:outline-none focus:border-gray-400 bg-gray-800 focus:-translate-y-0.2"
        />

        <footer className=" flex justify-between w-full">
          <button
            disabled={email.length > 0 ? false : true}
            onClick={verifyEmail}
            className="p-2 mb-4 mr-10 ml-10 text-black border w-full border-gray-900 rounded-lg bg-slate-300 focus:outline:none focus:border-gray-400 hover:translate-y-1 hover:scale-105"
          >
            {loading ? "Processing" : "Submit"}
          </button>
        </footer>
      </div>
    </div>
  );
}
