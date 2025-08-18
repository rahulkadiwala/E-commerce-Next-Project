"use client";

import { OrderDocument, OrderItem } from "@/types";
import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token") || "{}");
    if (user._id) {
      fetch(`/api/orders?userId=${user._id}`)
        .then((res) => res.json())
        .then(setOrders);
    }
  }, []);
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length > 0 ? (
        orders.map((order: OrderDocument) => (
          <div key={order._id} className="border p-4 mb-4 rounded">
            <p>
              <strong>Status:</strong>
              {order.status}
            </p>
            <p>
              <strong>Total:</strong>
              {order.total}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul className="pl-4 list-disc">
              {order?.items?.map((item: OrderItem) => (
                <li key={item.productId}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div>
          <h1>No Orders Found</h1>
        </div>
      )}
    </div>
  );
}
