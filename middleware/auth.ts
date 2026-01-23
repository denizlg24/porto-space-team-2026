import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const authProxy = async (req: NextRequest) => {
  if (!req.url.toLowerCase().includes("admin")) return NextResponse.next();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const localeCookie = req.cookies.get("INTLAYER_LOCALE")?.value ?? "en";
    return NextResponse.redirect(new URL(`/${localeCookie}/sign-in`, req.url));
  }

  return NextResponse.next();
};
