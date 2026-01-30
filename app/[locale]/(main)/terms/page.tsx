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
  const metadata = getIntlayer("terms-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/terms");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/terms" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("terms-page", locale);

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
          <h2 className="text-xs text-primary mb-4">
            {content.acceptance.label}
          </h2>
          <h3 className="text-3xl font-bold mb-8">{content.acceptance.title}</h3>
          <div className="space-y-4 text-muted-foreground max-w-3xl">
            <p>{content.acceptance.paragraph1}</p>
            <p>{content.acceptance.paragraph2}</p>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">{content.use.label}</h2>
          <h3 className="text-3xl font-bold mb-8">{content.use.title}</h3>
          <div className="space-y-6 max-w-3xl">
            <p className="text-muted-foreground">{content.use.intro}</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.use.items.rights}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.use.items.restrict}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.use.items.harm}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {content.use.items.illegal}
              </li>
            </ul>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">
            {content.intellectual.label}
          </h2>
          <h3 className="text-3xl font-bold mb-8">
            {content.intellectual.title}
          </h3>
          <div className="space-y-4 text-muted-foreground max-w-3xl">
            <p>{content.intellectual.paragraph1}</p>
            <p>{content.intellectual.paragraph2}</p>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">
            {content.services.label}
          </h2>
          <h3 className="text-3xl font-bold mb-8">{content.services.title}</h3>
          <div className="space-y-4 max-w-3xl">
            <div className="border border-border/60 p-6">
              <h4 className="text-lg font-semibold mb-3">
                {content.services.newsletter.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {content.services.newsletter.description}
              </p>
            </div>

            <div className="border border-border/60 p-6">
              <h4 className="text-lg font-semibold mb-3">
                {content.services.contact.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {content.services.contact.description}
              </p>
            </div>

            <div className="border border-border/60 p-6">
              <h4 className="text-lg font-semibold mb-3">
                {content.services.membership.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {content.services.membership.description}
              </p>
            </div>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">
            {content.disclaimer.label}
          </h2>
          <h3 className="text-3xl font-bold mb-8">{content.disclaimer.title}</h3>
          <div className="space-y-4 text-muted-foreground max-w-3xl">
            <p>{content.disclaimer.paragraph1}</p>
            <p>{content.disclaimer.paragraph2}</p>
          </div>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">{content.links.label}</h2>
          <h3 className="text-3xl font-bold mb-8">{content.links.title}</h3>
          <p className="text-muted-foreground max-w-3xl">
            {content.links.description}
          </p>
        </section>

        <Separator className="max-w-5xl" />

        <section className="w-full max-w-5xl mx-auto py-12">
          <h2 className="text-xs text-primary mb-4">
            {content.governing.label}
          </h2>
          <h3 className="text-3xl font-bold mb-8">{content.governing.title}</h3>
          <p className="text-muted-foreground max-w-3xl">
            {content.governing.description}
          </p>
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
