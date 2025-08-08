"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import React from "react";

interface productProp {
  product: Product;
  onClick?: ()=> void;
}

export const ProductCard = ({ product,onClick }: productProp) => {
  const addToCart = useCartStore((state) => state.addToCart)
  return (
    <div className="border rounded-lg shadow p-4 hover:shadow-lg transition" onClick={onClick}>
      <img src={product.image} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="font-bold mt-1">${product.price}</div>
      <button onClick={(e) => { e.stopPropagation(); addToCart(product)}} className="mt-2 bg-black text-white px-3 py-1 rounded hover:opacity-90">Add to Cart</button>
    </div>
  );
};
