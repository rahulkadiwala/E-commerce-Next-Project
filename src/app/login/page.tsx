"use client";

import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // clear previous error

    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: loginCredential, // ✅ no stringify, apiFetch does it
      });

      // res is already JSON (from your API)
      console.log("Login response:", res);

      // if your backend returns { token, user }
      localStorage.setItem("token", res.token);
      setUser(res.user);

      router.push("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={loginCredential.email}
          onChange={(e) =>
            setLoginCredential({ ...loginCredential, email: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={loginCredential.password}
          onChange={(e) =>
            setLoginCredential({ ...loginCredential, password: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
