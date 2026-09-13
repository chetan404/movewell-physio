import { NextRequest, NextResponse } from "next/server";
import { computeAdminToken } from "@/lib/adminAuth";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const expected = await computeAdminToken(process.env.ADMIN_SESSION_SECRET!);
  const cookie = request.cookies.get("admin_session")?.value;

  if (cookie !== expected) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
