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
      <div>
        <div>
          <button className="text-primary underline-offset-4 hover:underline">
            Token
          </button>
        </div>
        <div className="w-[300px] sm:w-[350px]">
          <header className="spave-y-1">
            <h1 className="2xl">Reset Password</h1>
            <p>Enter new password</p>
          </header>
          <div className="grid gap-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={password.length > 0 ? false : true}
              onClick={changePassword}
            >
              {loading ? (
                <svg className="animate-spin">Processing</svg>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
