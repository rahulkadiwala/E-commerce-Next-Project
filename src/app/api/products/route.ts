import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (query) {
      const product = await Product.find({
        name: { $regex: query, $options: "i" },
      });
      return NextResponse.json(product, { status: 200 });
    } else {
      const product = await Product.find().limit(6);
      if (product.length === 0) {
        return NextResponse.json(
          { message: "no product found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "server error", details: error },
      { status: 501 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newProduct = await Product.create(body);
    await newProduct.save();
    return NextResponse.json(
      { message: "Product hs been created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "server error", details: error },
      { status: 501 }
    );
  }
}
