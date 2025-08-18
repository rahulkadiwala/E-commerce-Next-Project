export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

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
  _id?: string;
  userId?: string;
  items: OrderItem[];
  address: OrderAddress;
  total: number;
  status: "processing" | "shipped" | "delivered";
  createdAt: Date;
}
