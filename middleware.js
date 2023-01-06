import jwt_decode from "jwt-decode";
import { NextResponse } from "next/server";

export async function middleware(req, res) {
  // check if user has cookie
  const token = req.cookies.get("OursiteJWT")?.value;
  if (token) {
    // The user is authenticated
    const decoded = await jwt_decode(token);
    return NextResponse.next();
  }
  // the user is notAuthenticated redirect Login page 
  const loginUrl = req.nextUrl.origin + "/Login";
  return NextResponse.redirect(loginUrl);
}

// route page authenticated check
export const config = {
  matcher: [
    "/dash/:path*",
    // "/dash/:path*",
    "/MyProfile/:path*",
    "/OrganizationProfile/:path*",
    "/Users/:path*",
    "/Funder/:path*",
    "/Receipt/:path*",
    "/Project/:path*",
    "/Budget/:path*",
    "/Gantt-chart/:path*",
  ],
};
