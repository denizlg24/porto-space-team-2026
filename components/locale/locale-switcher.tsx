"use client";

import type { FC } from "react";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const LocaleSwitcher: FC<{ className?: string }> = ({ className }) => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
          <DropdownMenuItem key={localeItem} asChild>
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              onClick={() => setLocale(localeItem)}
              replace
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
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
