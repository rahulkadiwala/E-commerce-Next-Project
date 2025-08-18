"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckOutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setaddress] = useState({
    fullname: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  const isAddressValid = Object.values(address).every(
    (val) => val.trim() !== ""
  );

  const handlePlaceOrder = async () => {
    if (!isAddressValid) {
      alert("Please complete address info");
      return;
    }

    const order = {
      items: cart.map((item) => ({
        productId: "123",
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total,
      address: {
        fullname: address.fullname,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: parseInt(address.zip),
      },
    };
    console.log(order);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        clearCart();
        alert("Order placed successfully!");
        router.push("/");
      } else {
        const error = await res.json();
        alert("Failed: " + error.error);
      }
    } catch (error) {
      alert("Something went wrong placing order.");
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="mx-w-6xl mx-auto px-4 py-10">
        {/* Progress Bar */}
        <div className="flex justify-center space-x-8 mb-8">
          {["Items", "Address", "Payment"].map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className={`w-6 h-6 flex  items-center justify-center rounded-full text-sm font-bold ${
                  step >= index + 1
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={step >= index + 1 ? "font-medium" : "text-gray-500"}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* step 1 items */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Review your Items</h2>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price} * {item.quantity}
                  </p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between font-semibold border-t pt-4">
              <p>Total:</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <button
              className="bg-black text-white px-6 py-2 rounded mt-6"
              onClick={() => setStep(2)}
            >
              Continue to Address
            </button>
          </div>
        )}

        {/* Step 2: address */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
              Enter Shipping Address
            </h2>
            <input
              placeholder="Enter fullName..."
              value={address.fullname}
              onChange={(e) =>
                setaddress({ ...address, fullname: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Enter Street Address..."
              value={address.street}
              onChange={(e) =>
                setaddress({ ...address, street: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Enter State..."
                value={address.state}
                onChange={(e) =>
                  setaddress({ ...address, state: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Enter City..."
                value={address.city}
                onChange={(e) =>
                  setaddress({ ...address, city: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <input
              placeholder="Enter Pincode..."
              value={address.zip}
              onChange={(e) => setaddress({ ...address, zip: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-between mt-6">
              <button
                className="text-sm text-gray-600 underline hover:cursor-pointer"
                onClick={() => setStep(1)}
              >
                Back to Item
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!isAddressValid}
                className="bg-black text-white px-6 py-2 rounded disabled:opacity-50 hover:cursor-pointer"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}
        {/* Step:3 Payment */}
        {step === 3 && (
          <div className="grid-col-1 md:grid-col-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <div>
                <h3 className="font-medium">Products:</h3>
                {cart.map((item) => (
                  <p key={item._id} className="text-sm">
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>
              <div>
                <h3 className="font-medium">Shipping To:</h3>
                <p className="text-sm">{address.fullname}</p>
                <p className="text-sm">{address.street}</p>
                <p className="text-sm">
                  {address.city}, {address.state} {address.zip}
                </p>
              </div>
            </div>

            <div className="border rounded p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Credit / Debit Card</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payment" />
                  <span>PayPal</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payment" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
              <div className="mt-6 flex justify-between font-semibold">
                <p>Total:</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <button
                className="w-full mt-6 bg-black text-white py-2 rounded"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
