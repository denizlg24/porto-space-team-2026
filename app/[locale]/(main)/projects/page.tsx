import { Suspense } from "react";
import { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";
import { GridBackground } from "@/components/ui/grid-background";
import { Separator } from "@/components/ui/separator";
import { ProjectsGrid } from "./_components/projects-grid";
import { ProjectsGridSkeleton } from "./_components/projects-grid-skeleton";

export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("projects-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/projects");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/projects" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("projects-page", locale);

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
          <h2 className="text-xs text-primary mb-4">{content.projects.label}</h2>
          <h3 className="text-3xl font-bold mb-8">{content.projects.title}</h3>
          <Suspense fallback={<ProjectsGridSkeleton />}>
            <ProjectsGrid
              locale={locale}
              emptyMessage={content.projects.empty}
              learnMoreText={content.projects.learnMore}
            />
          </Suspense>
        </section>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
