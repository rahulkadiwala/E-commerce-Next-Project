"use client";

import { useCartStore } from "@/store/cartStore";
import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, X } from "lucide-react";
import React from "react";

export const CartDrawer = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCard);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-1">
          🛒 Cart ({cart.length})
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg p-6 flex flex-col z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your cart</h2>
            <Dialog.Close asChild>
              <button>
                <X />
              </button>
            </Dialog.Close>
          </div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="flex-1 space-y-4 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="p-1 border rounded"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item._id)}
                        className="p-1 border rounded"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <p className="font-semibold">Total: ${total.toFixed(2)}</p>
            <button className="mt-3 w-full bg-black text-white py-2 rounded">
              Checkout
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
