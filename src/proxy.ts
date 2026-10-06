import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// Keeps signed-out visitors away from the admin panel. Every admin page and
// server action also re-checks the session (lib/auth.ts), this is the first gate.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const userId = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (userId) return NextResponse.next();

  if (pathname.startsWith("/admin/upload")) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
