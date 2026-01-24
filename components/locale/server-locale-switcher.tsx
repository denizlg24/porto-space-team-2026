"use client";

import type { FC } from "react";
import { getLocaleName, Locales } from "intlayer";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { changeLocale } from "@/lib/actions/locale";

interface LocaleSwitcherProps {
  locale: string;
  className?: string;
}

const availableLocales = [Locales.ENGLISH, Locales.PORTUGUESE];

export const ServerLocaleSwitcher: FC<LocaleSwitcherProps> = ({
  locale,
  className,
}) => {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  const handleLocaleChange = async (newLocale: string) => {
    if (newLocale === locale) return;
    await changeLocale(pathWithoutLocale, newLocale);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-1.5 text-xs font-medium tracking-wide text-muted-foreground hover:text-foreground",
            className
          )}
        >
          <Globe className="size-3.5" />
          <span className="uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-35">
        {availableLocales.map((localeItem) => (
          <DropdownMenuItem
            key={localeItem}
            onClick={() => handleLocaleChange(localeItem)}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between gap-3",
              locale === localeItem && "bg-muted"
            )}
          >
            <span className="text-xs tracking-wide capitalize">
              {getLocaleName(localeItem, locale)}
            </span>
            <span className="text-[10px] uppercase text-muted-foreground">
              {localeItem}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
