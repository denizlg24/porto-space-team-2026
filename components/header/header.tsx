"use client";

import { useState, useEffect } from "react";
import { useIntlayer } from "next-intlayer";
import { Link } from "@/components/locale/link";
import { LocaleSwitcher } from "@/components/locale/locale-switcher";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import logo from "@/public/logo-black.png";

const navLinks = [
  { key: "about", href: "/about" },
  { key: "project", href: "/project" },
  { key: "sponsors", href: "/sponsors" },
  { key: "competitions", href: "/competitions" },
  { key: "newsletter", href: "/newsletter" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const content = useIntlayer("header");

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link href="/" className="relative z-10 flex items-center">
            <Image src={logo} className="h-12 w-auto aspect-square object-contain" alt="Logo Porto Space Team"/>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.key} href={link.href}>
                  {content.nav[link.key as keyof typeof content.nav]}
                </NavLink>
              ))}
            </nav>

            <div className="mx-2 h-4 w-px bg-border/60" />

            <LocaleSwitcher />
            <ThemeSwitcher />

            <Button asChild className="ml-2 group">
              <Link href="/join">
                {content.cta}
                <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeSwitcher />
            <LocaleSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-10"
            >
              <span
                className={cn(
                  "absolute transition-all duration-200",
                  isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )}
              >
                <Menu className="size-5" />
              </span>
              <span
                className={cn(
                  "absolute transition-all duration-200",
                  isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )}
              >
                <X className="size-5" />
              </span>
              <span className="sr-only">
                {isOpen ? content.closeMenu : content.menu}
              </span>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          "transition-all duration-300 ease-out",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={cn(
            "absolute left-0 right-0 top-16 sm:top-20",
            "bg-background border-b border-border/40",
            "transition-all duration-300 ease-out",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <nav className="flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-4 text-sm font-medium tracking-wide text-foreground transition-colors",
                  "hover:bg-muted/50",
                  "border-b border-border/20",
                  "transition-all duration-300 ease-out",
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <span>{content.nav[link.key as keyof typeof content.nav]}</span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-4">
            <Button asChild className="w-full justify-center group">
              <Link href="/join" onClick={() => setIsOpen(false)}>
                {content.cta}
                <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
