import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not exist" }, { status: 404 });
    }
    const verifyPassword = bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    const { password: _password, ...userData } = user.toObject();

    return NextResponse.json(
      { message: "Login successfull", token, user: userData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", deails: error },
      { status: 500 }
    );
  }
}
