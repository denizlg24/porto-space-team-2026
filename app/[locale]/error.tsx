"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { getIntlayer, getLocalizedUrl } from "intlayer";
import { GridBackground } from "@/components/ui/grid-background";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const content = getIntlayer("error-page", locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="px-4 pt-16 sm:pt-24 md:pt-32 min-h-screen pb-12">
      <GridBackground className="-z-10 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="relative mx-auto max-w-2xl">
        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 sm:-top-12">
          <span className="select-none text-[12rem] font-bold leading-none text-destructive/20 sm:text-[16rem] md:text-[20rem]">
            {content.heading}
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 pt-20 text-center sm:pt-28 md:pt-36">
          <div className="flex items-center gap-2 border border-destructive/40 bg-destructive/10 px-3 py-1.5">
            <div className="size-2 animate-pulse rounded-full bg-destructive" />
            <span className="text-xs font-medium tracking-widest text-destructive">
              {content.error} {content.heading}
            </span>
          </div>

          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            {content.title}
          </h1>

          <p className="max-w-md text-sm text-muted-foreground">
            {content.description}
          </p>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={reset}
              className="group inline-flex items-center gap-2 border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-xs font-medium tracking-wide text-destructive transition-colors hover:bg-destructive/20"
            >
              <RotateCcw className="size-3.5 transition-transform group-hover:rotate-[-30deg]" />
              {content.tryAgain}
            </button>

            <Link
              href={getLocalizedUrl("/", locale)}
              className="group inline-flex items-center gap-2 border border-border/60 bg-background px-4 py-2.5 text-xs font-medium tracking-wide text-foreground transition-colors hover:bg-muted/50"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              {content.backHome}
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-full mt-12 h-32 w-px -translate-x-1/2 bg-linear-to-b from-destructive/40 to-transparent" />
      </div>
    </main>
  );
}
