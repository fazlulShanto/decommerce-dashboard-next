import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // Must be a base64-encoded string or similar

export async function middleware(req: NextRequest) {
  // Add debug log to confirm middleware is running
  // console.log("✅Middleware running for URL:", req.url);

  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL(req.nextUrl.hostname, req.url));
  }
  try {
    const { payload } = await jwtVerify(token, SECRET);
    // Attach the payload as a JSON string in a custom header
    const res = NextResponse.next();
    res.headers.set("x-token-info", JSON.stringify(payload));
    res.cookies.set("token", token);
    return res;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"], // Match dashboard and all its subpaths
};
