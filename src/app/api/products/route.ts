import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";



export async function getAllProducts(){
    try {
        await connectDB();
        const product = await Product.find();
        if(product.length === 0){
            return NextResponse.json({message:"no product found"}, {status: 404})
        }
        return NextResponse.json(product, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "server error", details: error}, {status: 501})
    }
}

export async function createNewProduct(req:Request){
    try {
        await connectDB();
        const body = await req.json();
        const newProduct = await Product.create(body);
        await newProduct.save();
        return NextResponse.json({message: "Product hs been created"}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({error: "server error", details: error}, {status: 501})
    }
}

export async function GET() {
    return await getAllProducts();
  }
  
  export async function POST(req: Request) {
    return await createNewProduct(req);
  }