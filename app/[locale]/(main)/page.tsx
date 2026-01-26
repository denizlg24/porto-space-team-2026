import { Suspense } from "react";
import { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";
import { GridBackground } from "@/components/ui/grid-background";
import { Link } from "@/components/locale/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroTeamPhoto from "@/public/hero-team.png";
import { CountdownCompetitionWrapper } from "./_components/countdown-to-competition-wrapper";
import { QuickStats } from "./_components/quick-stats";
import { TopSponsors } from "./_components/top-sponsors";
import { TeamPictureFrame } from "./_components/team-picture-frame";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ImageFrame } from "@/components/ui/image-frame";
export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("home-metadata", locale);
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

function CountdownSkeleton() {
  return (
    <>
      <div className="col-span-4 mb-3">
        <Skeleton className="h-3 w-40" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="text-center">
          <Skeleton className="h-8 md:h-10 w-12 mx-auto mb-1" />
          <Skeleton className="h-3 w-8 mx-auto" />
        </div>
      ))}
    </>
  );
}

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("home-page", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="flex flex-col gap-12 min-h-screen items-center px-4 md:pt-32 sm:pt-28 pt-16">
        <section className="w-full relative  grid md:grid-cols-2 grid-cols-1 max-w-5xl mx-auto gap-12 pb-12">
          <GridBackground className="-z-10 mask-[radial-gradient(ellipse_at_center,black_25%,transparent_75%)] opacity-7" />
          <div className="flex flex-col md:items-start items-center md:text-left text-center md:gap-8 gap-6 w-full">
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              <span className="text-foreground">{content.hero.titleLine1}</span>
              <br />
              <span className="text-foreground">{content.hero.titleLine2}</span>
              <br />
              <span className="text-primary">{content.hero.titleLine3}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              <span className="font-semibold">
                {content.hero.tagline.student}{" "}
                <span className="text-primary">
                  {content.hero.tagline.power}
                </span>
                . {content.hero.tagline.aerospace} {content.hero.tagline.real}{" "}
                <span className="text-primary">
                  {content.hero.tagline.impact}
                </span>
                .
              </span>
            </p>
            <div className="w-full max-w-3xs h-px bg-muted -my-4"></div>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              <span className="font-semibold text-primary">
                {content.hero.teamName}
              </span>
              <br />
              {content.hero.teamDescription}
            </p>
            <div className="flex flex-wrap gap-4 w-full">
              <Button asChild className="flex-1 grow h-12 uppercase group">
                <Link href="/projects">
                  {content.hero.viewProjects}
                  <ChevronRight />
                </Link>
              </Button>
              <Button
                asChild
                variant={"outline"}
                className="flex-1 grow h-12 uppercase group"
              >
                <Link href="/about">{content.hero.ourMission}</Link>
              </Button>
            </div>
          </div>

          <ImageFrame
            src={heroTeamPhoto}
            alt={content.image.alt}
            aspectRatio="4/5"
            priority
            overlay
          >
            <div className="absolute top-4 left-4 font-mono text-xs text-primary/80 bg-background/80 px-2 py-1 border border-primary/30">
              {content.image.badge}
            </div>
            <div className="absolute top-4 right-4 font-mono text-xs text-muted-foreground bg-background/80 px-2 py-1 border border-border">
              {content.image.event}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
              <div className="grid grid-cols-4 gap-4">
                <Suspense fallback={<CountdownSkeleton />}>
                  <CountdownCompetitionWrapper locale={locale} />
                </Suspense>
              </div>
            </div>
          </ImageFrame>
        </section>
        <Separator />
        <section className="w-full max-w-3xl mb-4 mt-4 mx-auto">
          <Suspense
            fallback={
              <div className="flex gap-8 w-full max-w-3xl justify-evenly mx-auto text-center">
                <div>
                  <Skeleton className="h-8 w-16 mx-auto mb-1" />
                  <Skeleton className="h-3 w-12 mx-auto" />
                </div>
                <div>
                  <Skeleton className="h-8 w-12 mx-auto mb-1" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                </div>
                <div>
                  <Skeleton className="h-8 w-8 mx-auto mb-1" />
                  <Skeleton className="h-3 w-14 mx-auto" />
                </div>
              </div>
            }
          >
            <QuickStats locale={locale} />
          </Suspense>
        </section>
        <Separator />
        <section className="w-full max-w-5xl my-8 mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col md:items-start md:text-left items-center text-left md:order-1 order-2">
            <h2 className="text-xs text-primary mb-4 w-full">
              {content.about.label}
            </h2>
            <h1 className="md:text-3xl sm:text-2xl text-xl font-bold mb-4 w-full">
              {content.about.title}
            </h1>
            <p className="text-muted-foreground sm:text-base text-sm mb-2">
              {content.about.paragraph1}
            </p>
            <p className="text-muted-foreground sm:text-base text-sm mb-2">
              {content.about.paragraph2}
            </p>
            <p className="text-muted-foreground sm:text-base text-sm mb-2">
              {content.about.paragraph3}
            </p>
          </div>
          <Suspense
            fallback={<Skeleton className="aspect-video w-full md:order-2 order-1" />}
          >
            <TeamPictureFrame
              alt={content.about.imageAlt}
              className="md:order-2 order-1"
            />
          </Suspense>
        </section>
        <Separator />
        <Suspense
          fallback={
            <section className="w-full max-w-5xl my-8 mx-auto">
              <div className="text-center mb-8">
                <Skeleton className="h-3 w-24 mx-auto mb-2" />
                <Skeleton className="h-10 w-48 mx-auto" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-4">
                    <Skeleton className="w-35 h-35 rounded-lg" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Skeleton className="h-10 w-40 mx-auto" />
              </div>
            </section>
          }
        >
          <TopSponsors locale={locale} />
        </Suspense>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
