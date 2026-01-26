import { Suspense } from "react";
import { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";
import { GridBackground } from "@/components/ui/grid-background";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Timeline } from "./_components/timeline";
import { TimelineSkeleton } from "./_components/timeline-skeleton";
import { TeamPictureFrame } from "../_components/team-picture-frame";

export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("about-page", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="flex flex-col gap-12 min-h-screen items-center px-4 md:pt-32 sm:pt-28 pt-16">
        <section className="w-full relative max-w-5xl mx-auto text-center py-12">
          <GridBackground className="-z-10 mask-[radial-gradient(ellipse_at_center,black_25%,transparent_75%)] opacity-7" />
          <h2 className="text-xs text-primary mb-4">{content.hero.label}</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {content.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content.hero.description}
          </p>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">{content.mission.label}</h2>
          <h3 className="text-3xl font-bold mb-8">{content.mission.title}</h3>
          <div className="space-y-4 text-muted-foreground max-w-3xl">
            <p>{content.mission.paragraph1}</p>
            <p>{content.mission.paragraph2}</p>
            <p>{content.mission.paragraph3}</p>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">{content.team.label}</h2>
          <h3 className="text-3xl font-bold mb-8">{content.team.title}</h3>
          <Suspense
            fallback={<Skeleton className="aspect-video max-w-3xl mx-auto" />}
          >
            <TeamPictureFrame
              alt={content.team.imageAlt}
              className="max-w-3xl mx-auto"
            />
          </Suspense>
        </section>

        <Separator className="max-w-5xl" />

        <Suspense fallback={<TimelineSkeleton />}>
          <Timeline locale={locale} />
        </Suspense>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
