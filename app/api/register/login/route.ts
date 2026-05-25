import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const match = await user.comparePassword(password);
  if (!match) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET!, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken;
  await user.save();

  const res = NextResponse.json({ accessToken });
  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/api/register/refresh",
    maxAge: 7 * 24 * 60 * 60, // one week
  });
  return res;
}
