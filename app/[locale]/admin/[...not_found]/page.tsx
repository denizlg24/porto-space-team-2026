import type { Metadata } from "next";
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from "intlayer";
import { LocalPromiseParams, NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GridBackground } from "@/components/ui/grid-background";

export const revalidate = 604800;

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("not-found-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const NotFoundPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("not-found-page", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="px-4 pt-16 sm:pt-24 md:pt-32 min-h-screen pb-12">
        <GridBackground className="-z-10 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="relative mx-auto max-w-2xl">
          <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 sm:-top-12">
            <span className="select-none text-[12rem] font-bold leading-none text-muted/20 sm:text-[16rem] md:text-[20rem]">
              {content.heading}
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 pt-20 text-center sm:pt-28 md:pt-36">
            <div className="flex items-center gap-2 border border-border/60 bg-muted/30 px-3 py-1.5">
              <div className="size-2 animate-pulse rounded-full bg-primary" />
              <span className="text-xs font-medium tracking-widest text-muted-foreground">
                {content.error} {content.heading}
              </span>
            </div>

            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              {content.title}
            </h1>

            <p className="max-w-md text-sm text-muted-foreground">
              {content.description}
            </p>

            <Link
              href={getLocalizedUrl("/admin", locale)}
              className="group mt-4 inline-flex items-center gap-2 border border-border/60 bg-background px-4 py-2.5 text-xs font-medium tracking-wide text-foreground transition-colors hover:bg-muted/50"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              {content.backHome}
            </Link>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-full mt-12 h-32 w-px -translate-x-1/2 bg-linear-to-b from-border/40 to-transparent" />
        </div>
      </main>
    </IntlayerServerProvider>
  );
};

export default NotFoundPage;
