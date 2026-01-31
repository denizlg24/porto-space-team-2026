"use client";

import { useState, useEffect } from "react";
import { ClientLink } from "@/components/locale/client-link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  key: string;
  href: string;
  label: string;
};

interface MobileMenuProps {
  navLinks: NavItem[];
  ctaLabel: string;
  menuLabel: string;
  closeMenuLabel: string;
  locale: string;
}

export function MobileMenu({
  navLinks,
  ctaLabel,
  menuLabel,
  closeMenuLabel,
  locale,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 lg:hidden"
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
        <span className="sr-only">{isOpen ? closeMenuLabel : menuLabel}</span>
      </Button>

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
              <ClientLink
                key={link.key}
                href={link.href}
                locale={locale}
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
                <span>{link.label}</span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </ClientLink>
            ))}
          </nav>

          <div className="p-4">
            <Button asChild className="w-full justify-center group">
              <ClientLink href="/apply" locale={locale} onClick={() => setIsOpen(false)}>
                {ctaLabel}
                <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
              </ClientLink>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
