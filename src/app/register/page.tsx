"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register",{
      method:"POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json();
    console.log(data)

    if (!res.ok) {
      setError(data.error || "Registration failed");
    } else {
      alert("Registration complete")
      router.push("/login");
    }

  }

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
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
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
