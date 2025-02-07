"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-5 w-[400px] border border-gray-100 rounded-xl h-[450px] flex flex-col transition duration-500 delay-5000 ease-in-out hover:-translate-y-1 hover:shadow-gray-500 hover:shadow-lg">
        <h1 className="text-3xl font-bold text-center decoration-none mb-4">
          {loading ? "Processing" : "Sign Up"}
        </h1>

        <label htmlFor="username" className="m-2 mb-1 mr-1">
          Username:
        </label>
        <input
          className="p-2 border border-gray-300 ml-1 rounded-lg mb-4 focus:outline-none focus:border-gray-400 bg-gray-800 focus:-translate-y-0.5"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          required
        />
        <label htmlFor="email" className="m-2 mb-1 mr-1">
          Email:
        </label>
        <input
          className="p-2 border border-gray-300 ml-1 rounded-lg mb-4 focus:outline-none focus:border-gray-400 bg-gray-800 focus:-translate-y-0.5"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          required
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
          required
        />

        <button
          onClick={onSignup}
          className="p-2 mb-4 mr-10 ml-10 text-black border border-gray-900 rounded-lg bg-slate-300 focus:outline:none focus:border-gray-400 hover:translate-y-1 hover:scale-105"
        >
          Sign Up
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-100 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
