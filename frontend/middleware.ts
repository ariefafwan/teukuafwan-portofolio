import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  // Blokir halaman login jika sudah login
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/auth/profile", req.url));
  }

  // Proteksi halaman di dalam /auth jika belum login
  if (pathname.startsWith("/auth") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/auth/:path*"],
};
