"use client";

import { ProductList } from "@/components/ProductList";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Search Products</h1>

      <div className="flex justify-center mb-10 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full max-w-md px-4 py-2 border rounded"
        />
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length > 0 ? (
        <ProductList products={data} />
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
}
