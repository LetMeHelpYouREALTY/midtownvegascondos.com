import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEFAULT_DOMAIN = "midtownvegascondos.com";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const domain =
    hostname.startsWith("localhost") || hostname.startsWith("127.0.0.1")
      ? DEFAULT_DOMAIN
      : hostname;
  const response = NextResponse.next();
  response.headers.set("x-domain", domain);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|videos|robots|sitemap).*)"],
};
