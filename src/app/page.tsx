"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-gray-200">
        Welcome to my first website!
      </h1>
      <p className="text-gray-400 mt-2">Sign up to know a secret</p>
      <button
        onClick={() => router.push("/signup")}
        className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-200 hover:-translate-y-1 hover:scale-110"
      >
        Sign Up
      </button>
    </div>
  );
}
