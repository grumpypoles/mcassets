import { auth } from "@/app/_lib/auth";

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const isProtected = ["/account", "/hiassets", "/reports"].some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/account/:path*", "/hiassets/:path*", "/reports/:path*", "/insurance/:path*"],
};