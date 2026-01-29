import { getIntlayer } from "intlayer";
import { ServerLink } from "@/components/locale/server-link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  LogIn,
  Mail,
  MapPin,
} from "lucide-react";
import logo from "@/public/logo-black.png";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { CurrentYear } from "./current-year";

const navLinkKeys = [
  { key: "about", href: "/about" },
  { key: "project", href: "/project" },
  { key: "sponsors", href: "/sponsors" },
  { key: "competitions", href: "/competitions" },
  { key: "newsletter", href: "/newsletter" },
  { key: "contact", href: "/contact" },
] as const;

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/portospaceteam",
    icon: Instagram,
  },
  {
    name: "Email",
    href: "mailto:geral@portospaceteam.pt",
    icon: Mail,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/portospaceteam",
    icon: Facebook,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/porto-space-team",
    icon: Linkedin,
  },
  {
    name: "Maps",
    href: "https://www.google.com/maps/place/Porto+Space+Team/@41.1781163,-8.5945483,15z/data=!4m6!3m5!1s0xd24657d6bcac819:0x58ab6feb15e61d9b!8m2!3d41.1781163!4d-8.5945483!16s%2Fg%2F11tfjwlz4z?entry=ttu",
    icon: MapPin,
  },
];

interface ServerFooterProps {
  locale: string;
}

export async function ServerFooter({ locale }: ServerFooterProps) {
  const content = getIntlayer("footer", locale);

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <ServerLink
              href="/"
              locale={locale}
              className="flex items-center gap-2"
            >
              <Image
                src={logo}
                className="h-12 w-auto aspect-square object-contain"
                alt="Logo Porto Space Team"
              />
              <div className="flex flex-col items-start justify-center text-left text-foreground font-sans">
                <h1 className="text-sm font-medium leading-none">
                  Porto Space Team
                </h1>
                <h2 className="text-xs text-muted-foreground">
                  <span className="text-primary">FEUP</span> Universidade do
                  Porto
                </h2>
              </div>
            </ServerLink>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              {content.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={social.name}
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {content.sections.navigation}
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinkKeys.map((link) => (
                <li key={link.key}>
                  <ServerLink
                    href={link.href}
                    locale={locale}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {content.nav[link.key as keyof typeof content.nav]}
                  </ServerLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {content.sections.legal}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <ServerLink
                  href="/privacy"
                  locale={locale}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {content.legal.privacy}
                </ServerLink>
              </li>
              <li>
                <ServerLink
                  href="/terms"
                  locale={locale}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {content.legal.terms}
                </ServerLink>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:items-center items-start justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy;{" "}
            <Suspense fallback="2026">
              <CurrentYear />
            </Suspense>{" "}
            Porto Space Team. {content.copyright}
          </p>
          <Button asChild variant={"link"} className="h-fit! p-0!">
            <ServerLink href={"/admin"} locale={locale} className="text-xs">
              Admin <LogIn />
            </ServerLink>
          </Button>
        </div>
      </div>
    </footer>
  );
}
