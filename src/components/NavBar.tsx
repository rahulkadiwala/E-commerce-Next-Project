"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CartDrawer } from "./CartDrawer";

export const NavBar = () => {
  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center shadow-md bg-white sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold">
        My Store
      </Link>
      <div className="flex gap-6 items-center text-sm font-medium">
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>
        <div className="flex items-center gap-6">
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
