import { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";
import { GridBackground } from "@/components/ui/grid-background";
import { Separator } from "@/components/ui/separator";

export const revalidate = 604800;

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("privacy-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/privacy");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/privacy" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("privacy-page", locale);

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
          <p className="text-xs text-muted-foreground mt-4">
            {content.hero.lastUpdated}
          </p>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">{content.overview.label}</h2>
          <h3 className="text-3xl font-bold mb-8">{content.overview.title}</h3>
          <div className="space-y-4 text-muted-foreground max-w-3xl">
            <p>{content.overview.paragraph1}</p>
            <p>{content.overview.paragraph2}</p>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">
            {content.dataCollection.label}
          </h2>
          <h3 className="text-3xl font-bold mb-8">
            {content.dataCollection.title}
          </h3>
          <div className="space-y-8 max-w-3xl">
            <p className="text-muted-foreground">{content.dataCollection.intro}</p>

            <div className="space-y-6">
              <div className="border border-border/60 p-6">
                <h4 className="text-lg font-semibold mb-3">
                  {content.dataCollection.newsletter.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {content.dataCollection.newsletter.description}
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
                  <li>{content.dataCollection.newsletter.items.name}</li>
                  <li>{content.dataCollection.newsletter.items.email}</li>
                  <li>{content.dataCollection.newsletter.items.dob}</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  {content.dataCollection.newsletter.purpose}
                </p>
              </div>

              <div className="border border-border/60 p-6">
                <h4 className="text-lg font-semibold mb-3">
                  {content.dataCollection.contact.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {content.dataCollection.contact.description}
                </p>
              </div>

              <div className="border border-border/60 p-6">
                <h4 className="text-lg font-semibold mb-3">
                  {content.dataCollection.join.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {content.dataCollection.join.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">{content.cookies.label}</h2>
          <h3 className="text-3xl font-bold mb-8">{content.cookies.title}</h3>
          <div className="space-y-6 max-w-3xl">
            <p className="text-muted-foreground">{content.cookies.intro}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-border/60 p-6">
                <h4 className="text-lg font-semibold mb-3">
                  {content.cookies.theme.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {content.cookies.theme.description}
                </p>
              </div>

              <div className="border border-border/60 p-6">
                <h4 className="text-lg font-semibold mb-3">
                  {content.cookies.token.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {content.cookies.token.description}
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground border-l-2 border-primary pl-4">
              {content.cookies.noCookies}
            </p>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">{content.rights.label}</h2>
          <h3 className="text-3xl font-bold mb-8">{content.rights.title}</h3>
          <div className="space-y-6 max-w-3xl">
            <p className="text-muted-foreground">{content.rights.intro}</p>

            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.rights.items.access}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.rights.items.rectification}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.rights.items.erasure}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.rights.items.restriction}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.rights.items.portability}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.rights.items.object}
              </li>
            </ul>

            <p className="text-sm text-muted-foreground">
              {content.rights.unsubscribe}
            </p>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12 pb-24">
          <h2 className="text-xs text-primary mb-4">{content.contact.label}</h2>
          <h3 className="text-3xl font-bold mb-8">{content.contact.title}</h3>
          <p className="text-muted-foreground max-w-3xl">
            {content.contact.description}
          </p>
        </section>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
