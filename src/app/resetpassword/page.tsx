"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      console.log("Set token successfully");
    }
  }, [searchParams]);

  const changePassword = async () => {
    if (!token) {
      toast.error("invalid or missing token.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      toast.success("Password changed successfully", response.data.message);
      setPassword("");
      console.log("Password changed successfully");

      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 container">
      <div className="p-5 w-[400px] border border-gray-100 rounded-xl h-[300px] flex flex-col transition duration-500 delay-5000 ease-in-out hover:-translate-y-1 hover:shadow-gray-500 justify-center items-center hover:shadow-lg">
        <div>
          <p className="p-2 mb-4 mr-10 ml-10 text-black border w-[200px] justify-center items-center text-center border-gray-900 rounded-lg bg-slate-700">
            {token}
          </p>
        </div>
        <div className="w-[300px] sm:w-[350px]">
          <h1 className="text-3xl font-bold text-center decoration-none mb-4">
            Reset Password
          </h1>
          <p className="ml-[60px]">Enter new password:</p>

          <div className="flex flex-col p-3 m-4 mt-0 mb-0 ml-0 space-y-1 justify-center items-center">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border px-2 border-gray-300 ml-0 rounded-lg mb-4 bg-gray-700"
            />
            <button
              disabled={password.length > 0 ? false : true}
              onClick={changePassword}
              className="p-2 mb-4 mr-10 ml-10 text-black border w-full border-gray-900 rounded-lg bg-slate-300 focus:outline:none focus:border-gray-400 hover:translate-y-1 hover:scale-105"
            >
              {loading ? "Processing" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
