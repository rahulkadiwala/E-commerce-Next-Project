import { OrderDocument } from "@/types";
import mongoose, { Schema } from "mongoose";

const OrderSchema: Schema = new Schema<OrderDocument>(
  {
    userId: {
      type: String,
      required: false,
    },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    address: {
      fullname: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: Number, required: true },
      state: { type: String, required: true },
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<OrderDocument>("Order", OrderSchema);
