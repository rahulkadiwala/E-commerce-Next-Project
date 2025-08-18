"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));

    //order logic ... . .. ..
  }, []);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto mt-10">
        {user ? (
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <div>
            <center>
              Login to view Account
              <Link
                className="bg-gray-700 text-white px-4 py-2 mt-5 hover:bg-gray-900 rounded ml-6"
                href={"/login"}
              >
                Login
              </Link>
            </center>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
