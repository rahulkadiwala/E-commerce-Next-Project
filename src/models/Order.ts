import mongoose, { Document, Schema } from "mongoose";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderAddress {
  fullname: string;
  street: string;
  city: string;
  zip: number;
  state: string;
}

export interface OrderDocument extends Document {
  userId?: string;
  items: OrderItem[];
  address: OrderAddress;
  total: number;
  status: "processing" | "shipped" | "delivered";
  createdAt: Date;
}

const OrderSchema: Schema = new Schema<OrderDocument>({
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
},{timestamps: true});

export const Order = mongoose.models.Order || mongoose.model<OrderDocument>("Order", OrderSchema);
