import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { authProxy } from "./middleware/auth";

export const proxy = multipleProxies([intlayerProxy, authProxy]);

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};