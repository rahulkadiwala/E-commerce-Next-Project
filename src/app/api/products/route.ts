import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    let products;
    if (query) {
      products = await Product.find({
        name: { $regex: query, $options: "i" },
      });
    } else {
      products = await Product.find().limit(6);
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "No product found" },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", details: error.message || String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const newProduct = await Product.create(body);

    return NextResponse.json(
      { message: "Product has been created", product: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", details: error.message || String(error) },
      { status: 500 }
    );
  }
}
