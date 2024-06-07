// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/images|_next/webpack-hmr|images|favicon.ico|js|css).*)",
  ],
};
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");
  if (token?.value) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
