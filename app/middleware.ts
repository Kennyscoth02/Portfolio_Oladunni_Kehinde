import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// This middleware used to live under app/models; Next looks for middleware in
// the root of the app folder (or project root). Copy it here and keep the
// old file for reference.
export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("token");
  const token = cookie?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard"],
};
