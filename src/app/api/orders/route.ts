import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { NextResponse } from "next/server";



async function newOrder(data: any) {
    const newOrder = new Order(data);
    return await newOrder.save();
  }
  
  export async function POST(req: Request) {
    try {
      await connectDB();
      const body = await req.json();
      const order = await newOrder(body);
  
      return NextResponse.json({ message: "Order placed", order }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }

  export async function GET(req:Request,res:Response){
    try {
      const {searchParams} = new URL(req.url);
      const userId = searchParams.get("userId");

      await connectDB();
      const orderData = await Order.find(userId ? {userId} : {});
      return NextResponse.json(orderData);
    } catch (error) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
  