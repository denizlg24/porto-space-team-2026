import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export const authProxy = async (req: NextRequest) => {
  if (!req.url.toLowerCase().includes("admin")) return NextResponse.next();
  const session = getSessionCookie(req,{
    cookiePrefix:"porto_space_team",
  })

  if (!session) {
    const localeCookie = req.cookies.get("INTLAYER_LOCALE")?.value ?? "en";
    return NextResponse.redirect(new URL(`/${localeCookie}/sign-in`, req.url));
  }

  return NextResponse.next();
};
