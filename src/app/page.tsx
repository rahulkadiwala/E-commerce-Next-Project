import { ProductCard } from "@/components/ProductCard";
import { ProductList } from "@/components/ProductList";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/types";
import { useState } from "react";

async function getProduct(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export default async function Home() {
  const products = await getProduct();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <ProductList products={products}/>
    </main>
  );
}
