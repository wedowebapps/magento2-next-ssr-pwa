import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const protectedRoute = [
    "account-information",
    "address-book",
    "order-history",
  ];
  let verify = req.cookies.get("WEDOCOMMERCE_COOKIE_PERSISTENCE__auth_token");
  let url = req.url;

  const currentURL = url.split("/")[3];

  if (!verify && protectedRoute.includes(currentURL)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
