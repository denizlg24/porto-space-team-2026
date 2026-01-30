import { Suspense } from "react";
import type { Metadata } from "next";
import { LocalPromiseParams, NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { getPublicSponsorsData } from "@/lib/actions/sponsors";
import { SponsorsDisplay } from "./_components/sponsors-display";
import { SponsorsDisplaySkeleton } from "./_components/sponsors-display-skeleton";
import { GridBackground } from "@/components/ui/grid-background";

export const revalidate = 604800;

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("sponsors-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/sponsors");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/sponsors" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

async function SponsorsContent({ locale }: { locale: string }) {
  const content = getIntlayer("sponsors-page", locale);
  const data = await getPublicSponsorsData();

  if (data.categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground text-lg">{content.noSponsors}</p>
      </div>
    );
  }

  return (
    <SponsorsDisplay
      categories={data.categories}
      sponsors={data.sponsors}
      partnersLabel={String(content.partners)}
      visitWebsiteLabel={String(content.visitWebsite)}
      locale={locale}
    />
  );
}

const SponsorsPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("sponsors-page", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12 relative">
            <GridBackground className="-z-10 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"/>
            <p className="text-primary text-xs mb-2">{content.subtitle}</p>
            <h1 className="sm:text-4xl text-3xl font-bold mb-4">{content.title}</h1>
            <p className="text-muted-foreground sm:text-lg max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>

          <Suspense fallback={<SponsorsDisplaySkeleton />}>
            <SponsorsContent locale={locale} />
          </Suspense>
        </div>
      </main>
    </IntlayerServerProvider>
  );
};

export default SponsorsPage;
