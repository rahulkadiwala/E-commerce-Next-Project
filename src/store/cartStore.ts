import { Product } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItems extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItems[];
  addToCart: (product: Product) => void;
  removeFromCard: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist((set, get) => ({
    cart: [],
    addToCart: (product) => {
      const cart = get().cart;
      const existing = cart.find((item) => item._id === product._id);

      if (existing) {
        const updated = cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({ cart: updated });
      } else {
        set({ cart: [...cart, { ...product, quantity: 1 }] });
      }
    },
    removeFromCard: (id) => {
      const cart = get().cart.filter((item) => item._id !== id);
      set({ cart });
    },
    increaseQty: (id) => {
      const updated = get().cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      set({ cart: updated });
    },
    decreaseQty: (id) => {
      const updated = get()
        .cart.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      set({ cart: updated });
    },
    clearCart: () => {
      set({ cart: [] });
    },
  }),
  {
    name: "cart-storage",
  }
)
);
