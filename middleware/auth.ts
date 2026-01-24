import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export const authProxy = async (req: NextRequest) => {
  if (!req.url.toLowerCase().includes("admin")) return NextResponse.next();

  const session = getSessionCookie(req, {
    cookiePrefix: "porto_space_team",
  });

  console.log("MIDDLEWARE SESSION COOKIE:", session);
  console.log("MIDDLEWARE ALL COOKIES:", req.cookies.getAll().map(c => c.name));

  if (!session) {
    const localeCookie = req.cookies.get("INTLAYER_LOCALE")?.value ?? "en";
    return NextResponse.redirect(new URL(`/${localeCookie}/sign-in`, req.url));
  }

  // Explicitly forward the request with headers to ensure cookies are passed
  const response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  return response;
};
