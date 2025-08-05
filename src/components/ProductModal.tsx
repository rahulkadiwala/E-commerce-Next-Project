"use client";

import { useCartStore } from "@/store/cartStore";
import * as Dialog from "@radix-ui/react-dialog";
import { Product } from "@/types";
import React from "react";
import { X } from "lucide-react";

interface ModelProp {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, open, onClose }: ModelProp) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40">
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <Dialog.Close asChild>
                <button onClick={onClose}>
                  <X />
                </button>
              </Dialog.Close>
            </div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="font-semibold text-lg mb-4">${product.price}</p>
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800" onClick={() => addToCart(product)}>
                Add to Cart
            </button>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
