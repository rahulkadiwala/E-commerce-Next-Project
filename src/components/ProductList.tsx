"use client";

import { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";

export const ProductList = ({ products }: { products: Product[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};
