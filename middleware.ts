import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8000",
  "https://core-admin-two.vercel.app/",
  "https://core-admin-two.vercel.app/api",
];

function getOrigin(req: NextRequest) {
  return req.headers.get("origin") ?? "";
}

export function middleware(req: NextRequest) {
  const origin = getOrigin(req);
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  const res = NextResponse.next();

  if (isAllowed) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: res.headers,
    });
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
