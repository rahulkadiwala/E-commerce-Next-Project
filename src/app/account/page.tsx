"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [user, setUser] = useState(null);

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
  );
}
