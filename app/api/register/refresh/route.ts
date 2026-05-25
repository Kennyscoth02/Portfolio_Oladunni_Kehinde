import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const cookie = req.cookies.get("refreshToken");
  const token = cookie?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Missing refresh token" },
      { status: 401 },
    );
  }

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET!) as {
      id: string;
    };
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const newRefresh = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET!, {
      expiresIn: "7d",
    });

    user.refreshToken = newRefresh;
    await user.save();

    const res = NextResponse.json({ accessToken });
    res.cookies.set("refreshToken", newRefresh, {
      httpOnly: true,
      path: "/api/register/refresh",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 },
    );
  }
}
