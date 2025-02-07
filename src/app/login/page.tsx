"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="p-5 w-[400px] border border-gray-100 rounded-xl h-[400px] flex flex-col transition duration-500 delay-5000 ease-in-out hover:-translate-y-1 hover:shadow-gray-500 hover:shadow-lg">
        <h1 className="text-3xl font-bold text-center decoration-none mb-4">
          {loading ? "Processing" : "Login"}
        </h1>

        <label htmlFor="email" className="m-2 mb-1 mr-1">
          Email:
        </label>
        <input
          className="p-2 border border-gray-300 ml-1 rounded-lg mb-8 focus:outline-none focus:border-gray-400 bg-gray-800 focus:-translate-y-0.2"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your Email"
        />
        <label htmlFor="password" className="m-2 mb-1 mr-1">
          Password:
        </label>
        <input
          className="p-2 border border-gray-300 ml-1 rounded-lg mb-4 focus:outline-none focus:border-gray-400 bg-gray-800 focus:-translate-y-0.5"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <Link
          className="text-right mt-0 mb-2 text-xs text-slate-500 hover:underline hover:text-slate-300"
          href="/forgotpassword"
        >
          Forgot Password
        </Link>
        <button
          onClick={onLogin}
          className="p-2 mb-4 mr-10 ml-10 text-black border border-gray-900 rounded-lg bg-slate-300 focus:outline:none focus:border-gray-400 hover:translate-y-1 hover:scale-105"
        >
          Login
        </button>
        <p className="text-center text-sm">
          Dont't have an account?{" "}
          <Link href="/signup" className="text-gray-100 underline">
            Sign up
          </Link>{" "}
          instead.
        </p>
      </div>
    </div>
  );
}
