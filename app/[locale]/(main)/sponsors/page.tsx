import { Suspense } from "react";
import type { Metadata } from "next";
import { LocalPromiseParams, NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { getPublicSponsorsData } from "@/lib/actions/sponsors";
import { SponsorsDisplay } from "./_components/sponsors-display";
import { SponsorsDisplaySkeleton } from "./_components/sponsors-display-skeleton";
import { GridBackground } from "@/components/ui/grid-background";
// import { Separator } from "@/components/ui/separator";
// import Image from "next/image";

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

  const groupedSponsors = data.sponsors
    .filter((sponsor) => !!sponsor.project)
    .reduce(
      (acc, sponsor) => {
        if (!acc[sponsor.project!.name]) {
          acc[sponsor.project!.name] = [];
        }
        acc[sponsor.project!.name].push(sponsor);
        return acc;
      },
      {} as Record<string, typeof data.sponsors>,
    );

  const commonSponsors = data.sponsors.filter((sponsor) => !sponsor.project);

  if (data.categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground text-lg">{content.noSponsors}</p>
      </div>
    );
  }

  return (
    <>
      {groupedSponsors &&
        Object.keys(groupedSponsors).map((projectName) => {
          return (
            <div key={projectName} className="w-full max-w-5xl mx-auto mt-16">
              <h2 className="md:text-4xl sm:text-2xl text-xl text-primary font-bold mb-8 text-center flex flex-col items-center justify-center gap-4 w-full max-w-3xs pb-2 border-b-2 mx-auto">
                {/* <Image
                  alt={projectName}
                  src={groupedSponsors[projectName][0].project!.logo!}
                  width={36}
                  height={36}
                  className="object-contain"
                /> */}
                {projectName}
              </h2>
              <SponsorsDisplay
                categories={data.categories}
                sponsors={groupedSponsors[projectName]}
                partnersLabel={String(content.partners)}
                visitWebsiteLabel={String(content.visitWebsite)}
              />
            </div>
          );
        })}
      {commonSponsors.length > 0 && (
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {content.commonSponsors}
          </h2>
          <SponsorsDisplay
            categories={data.categories}
            sponsors={commonSponsors}
            partnersLabel={String(content.partners)}
            visitWebsiteLabel={String(content.visitWebsite)}
          />
        </div>
      )}
    </>
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
            <GridBackground className="-z-10 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
            <p className="text-primary text-xs mb-2">{content.subtitle}</p>
            <h1 className="sm:text-4xl text-3xl font-bold mb-4">
              {content.title}
            </h1>
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
