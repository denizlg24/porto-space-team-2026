import { Suspense } from "react";
import {
  NextPageIntlayer,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";
import { GridBackground } from "@/components/ui/grid-background";
import { Link } from "@/components/locale/link";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroTeamPhoto from "@/public/hero-team.png";
import { CountdownCompetitionWrapper } from "./_components/countdown-to-competition-wrapper";
import { QuickStats } from "./_components/quick-stats";
import { TopSponsors } from "./_components/top-sponsors";
import { TeamPictureFrame } from "./_components/team-picture-frame";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ImageFrame } from "@/components/ui/image-frame";
import { ContactForm } from "./_components/contact-form";
export const revalidate = 604800;

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
        <Separator className="max-w-5xl"/>
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
        <Separator className="max-w-5xl"/>
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
            fallback={
              <Skeleton className="aspect-video w-full md:order-2 order-1" />
            }
          >
            <TeamPictureFrame
              alt={content.about.imageAlt}
              className="md:order-2 order-1"
            />
          </Suspense>
        </section>
        <Separator className="max-w-5xl"/>
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
        <Separator className="my-8 max-w-5xl" />
        <section
          id="contact"
          className="w-full max-w-5xl my-8 mx-auto grid md:grid-cols-2 grid-cols-1 pb-12 gap-6"
        >
          <div className="col-span-1 flex flex-col gap-4 items-start text-left">
            <p className="text-xs text-primary">{content.contact.label}</p>
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold">
              {content.contact.title}
            </h1>
            <h2 className="text-muted-foreground sm:text-lg text-sm">
              {content.contact.description}
            </h2>
            <div className="w-full flex flex-col gap-2 mt-4">
              <div className="flex flex-row items-stretch gap-2 justify-start">
                <div className="min-[420px]:w-12 min-[420px]:h-12 w-10 h-10 min-[420px]:p-3 p-2 border text-primary shrink-0">
                  <Mail className="w-full h-full" />
                </div>
                <div className="min-[420px]:h-12 h-10 flex flex-col justify-center gap-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    target="_blank"
                    href="mailto:operacoes@portospaceteam.pt"
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    operacoes@portospaceteam.pt
                  </a>
                </div>
              </div>
              <div className="flex flex-row items-stretch gap-2 justify-start">
                <div className="min-[420px]:w-12 min-[420px]:h-12 w-10 h-10 min-[420px]:p-3 p-2 border text-primary shrink-0">
                  <MapPin className="w-full h-full" />
                </div>
                <div className="min-[420px]:h-12 h-10 flex flex-col justify-center gap-1">
                  <p className="text-sm text-muted-foreground">
                    {content.contact.locationTitle}
                  </p>
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/Porto+Space+Team/@41.1781163,-8.5945483,15z/data=!4m6!3m5!1s0xd24657d6bcac819:0x58ab6feb15e61d9b!8m2!3d41.1781163!4d-8.5945483!16s%2Fg%2F11tfjwlz4z?entry=ttu"
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    {content.contact.location}
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 gap-y-4 w-full max-w-3xs mt-4">
              <p className="text-sm text-muted-foreground col-span-full">
                {content.contact.followUs}
              </p>
              {[
                {
                  name: "Instagram",
                  href: "https://instagram.com/portospaceteam",
                  icon: Instagram,
                },

                {
                  href: "https://www.facebook.com/portospaceteam",
                  icon: Facebook,
                },
                {
                  href: "https://www.linkedin.com/company/porto-space-team",
                  icon: Linkedin,
                },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  className="min-[420px]:w-12 min-[420px]:h-12 w-10 h-10 min-[420px]:p-3 p-2 border shrink-0"
                >
                  <social.icon className="w-full h-full text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-1 w-full bg-muted/10 sm:p-8 p-4 border">
              <ContactForm locale={locale}/>
          </div>
        </section>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
