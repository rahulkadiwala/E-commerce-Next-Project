import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Raw body:", body);
    const { username, email, password } = body;
    console.log("username:", username, "email:", email, "password:", password);

    await connectDB();

    const isUserNameTaken = await User.findOne({ username });
    if (isUserNameTaken) {
      return NextResponse.json(
        { message: "UserName already taken" },
        { status: 400 }
      );
    }
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}
