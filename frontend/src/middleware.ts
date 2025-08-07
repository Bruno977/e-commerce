import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/actions/decrypt";

const routePatterns = {
  admin: {
    protected: /^\/admin\/(dashboard|categorias|produtos)/,
    public: /^\/admin\/login/,
  },
  client: {
    protected: /^\/client\/(profile|orders|settings)/,
    public: /^\/client\/login/,
  },
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    const isProtectedRoute = routePatterns.admin.protected.test(path);
    const isPublicRoute = routePatterns.admin.public.test(path);

    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.access_token) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
    if (isPublicRoute && session?.access_token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
