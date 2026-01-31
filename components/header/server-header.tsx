import { getIntlayer } from "intlayer";
import { ServerLink } from "@/components/locale/server-link";
import { ServerNavLink } from "@/components/ui/server-nav-link";
import { ServerLocaleSwitcher } from "@/components/locale/server-locale-switcher";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { MobileMenu } from "./mobile-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo-black.png";

const navLinkKeys = [
  { key: "about", href: "/about" },
  { key: "project", href: "/projects" },
  { key: "sponsors", href: "/sponsors" },
  { key: "competitions", href: "/competitions" },
  { key: "newsletter", href: "/newsletter" },
] as const;

interface ServerHeaderProps {
  locale: string;
}

export async function ServerHeader({ locale }: ServerHeaderProps) {
  const content = getIntlayer("header", locale);

  const navLinks = navLinkKeys.map((link) => ({
    key: link.key,
    href: link.href,
    label: String(content.nav[link.key as keyof typeof content.nav]),
  }));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <ServerLink
            href="/"
            locale={locale}
            className="relative z-10 flex items-center gap-1"
          >
            <Image
              src={logo}
              className="h-12 w-auto aspect-square object-contain"
              alt="Logo Porto Space Team"
            />
            <div className="sm:flex hidden flex-col items-start justify-center text-left text-foreground font-sans h-full mt-1">
              <h1 className="text-sm leading-none">Porto Space Team</h1>
              <h2 className="text-xs">
                <span className="text-primary">FEUP</span> Universidade do Porto
              </h2>
            </div>
          </ServerLink>

          <div className="hidden items-center gap-1 lg:flex">
            <nav className="flex items-center gap-1">
              {navLinkKeys.map((link) => (
                <ServerNavLink key={link.key} href={link.href} locale={locale}>
                  {content.nav[link.key as keyof typeof content.nav]}
                </ServerNavLink>
              ))}
            </nav>

            <div className="mx-2 h-4 w-px bg-border/60" />

            <ServerLocaleSwitcher locale={locale} />
            <ThemeSwitcher />

            <Button asChild className="ml-2 group">
              <ServerLink href="/apply" locale={locale}>
                {content.cta}
                <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
              </ServerLink>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeSwitcher />
            <ServerLocaleSwitcher locale={locale} />
            <MobileMenu
              navLinks={navLinks}
              ctaLabel={String(content.cta)}
              menuLabel={String(content.menu)}
              closeMenuLabel={String(content.closeMenu)}
              locale={locale}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      </header>
    </>
  );
}
