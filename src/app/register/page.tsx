"use client";

import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); // clear old errors

    try {
      const data = await apiFetch("/api/auth/register", {
        method: "POST",
        body: formData, // ✅ don't stringify
      });

      console.log("API response:", data);

      alert("Registration complete");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          required
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
