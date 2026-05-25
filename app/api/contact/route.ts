import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const message = await Message.create(body);
  return NextResponse.json({ success: true, message });
}
