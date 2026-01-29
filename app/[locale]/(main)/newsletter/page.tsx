import { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";
import { GridBackground } from "@/components/ui/grid-background";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SubscribeNewsletterButtonWrapper } from "./_components/subscribe-newsletter-button-wrapper";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getPublicNewsletters } from "@/lib/actions/newsletters";
import { Link } from "@/components/locale/link";
import { FileText, ExternalLink, ArrowRight } from "lucide-react";

export const revalidate = 604800;

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("newsletter-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/newsletter");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/newsletter" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("newsletter-page", locale);
  const newsletters = await getPublicNewsletters(6);

  const latestNewsletter = newsletters[0];
  const pastNewsletters = newsletters.slice(1, 6);

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="flex flex-col gap-12 min-h-screen items-center px-4 md:pt-32 sm:pt-28 pt-16 pb-16">
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

        <section className="w-full max-w-5xl mx-auto grid sm:grid-cols-2 items-center gap-x-8 gap-y-4">
          <div className="col-span-1 flex flex-col gap-2 items-start text-left">
            <p className="text-muted-foreground text-xs">
              {content.subscribe.label}
            </p>
            <h2 className="text-base">{content.subscribe.cta}</h2>
          </div>
          <div className="col-span-1 flex flex-row gap-1 items-center">
            <Suspense
              fallback={
                <>
                  <Skeleton className="h-8 w-[70%]" />
                  <Skeleton className="w-[30%] h-8" />
                </>
              }
            >
              <SubscribeNewsletterButtonWrapper locale={locale} />
            </Suspense>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xs text-primary mb-4">{content.editions.label}</h2>
            <h3 className="text-2xl md:text-3xl font-bold">
              {content.editions.title}
            </h3>
          </div>

          {newsletters.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {content.editions.noNewsletters}
            </div>
          ) : (
            <div className="space-y-8">
              {latestNewsletter && (
                <div className="rounded-md border p-6 bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">
                      {content.editions.latest}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-md bg-primary/10">
                        <FileText className="size-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-1">
                          {latestNewsletter.title[locale as "en" | "pt"]}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {content.editions.publishedOn}{" "}
                          {new Date(latestNewsletter.createdAt).toLocaleDateString(
                            locale,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <Button asChild>
                      <a
                        href={latestNewsletter.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {content.editions.viewPdf}
                        <ExternalLink className="size-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {pastNewsletters.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">
                    {content.editions.pastEditions}
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {pastNewsletters.map((newsletter) => (
                      <a
                        key={newsletter.id}
                        href={newsletter.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-4 rounded-md border hover:border-primary/50 transition-colors"
                      >
                        <FileText className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate group-hover:text-primary transition-colors">
                            {newsletter.title[locale as "en" | "pt"]}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(newsletter.createdAt).toLocaleDateString(
                              locale,
                              {
                                year: "numeric",
                                month: "short",
                              }
                            )}
                          </p>
                        </div>
                        <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {newsletters.length >= 6 && (
                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/newsletter/archive">
                      {content.editions.viewAll}
                      <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
