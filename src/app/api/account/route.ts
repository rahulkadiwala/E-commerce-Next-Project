import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ mesage: "Unauthorize" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ message: "Authorized", user: decoded });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", details: error },
      { status: 500 }
    );
  }
}
