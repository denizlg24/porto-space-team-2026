import { getIntlayer } from "intlayer";
import { ServerLink } from "@/components/locale/server-link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Instagram, LogIn, Mail } from "lucide-react";
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
    href: "mailto:contact@portospaceteam.pt",
    icon: Mail,
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
            <ServerLink href="/" locale={locale} className="flex items-center gap-2">
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
