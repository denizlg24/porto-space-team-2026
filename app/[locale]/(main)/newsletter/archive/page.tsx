import { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";
import { GridBackground } from "@/components/ui/grid-background";
import { Button } from "@/components/ui/button";
import { getPublicNewsletters } from "@/lib/actions/newsletters";
import { Link } from "@/components/locale/link";
import { FileText, ExternalLink, ArrowLeft } from "lucide-react";

export const revalidate = 604800;

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const content = getIntlayer("newsletter-archive-page", locale);
  const multilingualUrls = getMultilingualUrls("/newsletter/archive");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/newsletter/archive" },
    },
  };
};

const ArchivePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("newsletter-archive-page", locale);
  const newsletters = await getPublicNewsletters();

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

        <section className="w-full max-w-5xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/newsletter">
                <ArrowLeft className="size-4 mr-2" />
                {content.backToNewsletter}
              </Link>
            </Button>
          </div>

          {newsletters.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {content.noNewsletters}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newsletters.map((newsletter) => (
                <a
                  key={newsletter.id}
                  href={newsletter.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 rounded-md border hover:border-primary/50 transition-colors"
                >
                  <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                    <FileText className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium group-hover:text-primary transition-colors mb-1">
                      {newsletter.title[locale as "en" | "pt"]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(newsletter.createdAt).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </IntlayerServerProvider>
  );
};

export default ArchivePage;
