import { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";
import { GridBackground } from "@/components/ui/grid-background";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/components/locale/link";
import { ExternalLinkIcon, XCircle } from "lucide-react";
import { ApplicationContainer } from "./_components/application-container";
import { SearchApplicationForm } from "./_components/search-application-form";
import { getApplicationsOpen } from "@/lib/actions/content";

export const revalidate = 604800;

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("apply-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/apply");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/apply" },
    },
    openGraph: {
      url: localizedUrl,
      title: metadata.title,
      description: metadata.description,
    },
  };
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("apply-page", locale);
  const applicationsOpen = await getApplicationsOpen();

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="flex flex-col gap-12 min-h-screen items-center px-4 md:pt-32 sm:pt-28 pt-16">
        <section className="w-full relative max-w-5xl mx-auto text-center py-12">
          <GridBackground className="-z-10 mask-[radial-gradient(ellipse_at_center,black_25%,transparent_75%)] opacity-7" />
          <h2 className="text-xs text-primary mb-4">{content.hero.tag}</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {content.hero.title}{" "}
            <span className="text-primary">{content.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content.hero.description}
          </p>
          <h3 className="sm:text-xl text-lg mt-4">
            {content.hero.contactLink}{" "}
            <Link
              className="inline-block text-primary underline"
              href="/#contact"
            >
              {content.hero.contactLinkText}
              <ExternalLinkIcon className="ml-1 -translate-y-0.5 w-4 h-4 inline-block" />
            </Link>
          </h3>
        </section>
        <Separator className="max-w-5xl" />
        <section className="w-full flex flex-col items-start text-left max-w-5xl mx-auto">
          <p className="text-xs text-primary">{content.applicationStatus.label}</p>
          <h2 className="sm:text-xl text-lg font-bold mt-2">
            {content.applicationStatus.alreadyApplied}
          </h2>
          <h3 className="text-sm text-muted-foreground mt-2">{content.applicationStatus.description}</h3>
          <div className="w-full flex flex-row items-center gap-2 mx-auto mt-6">
            <SearchApplicationForm/>
          </div>
        </section>
        <Separator className="max-w-5xl" />
        {applicationsOpen ? (
          <ApplicationContainer locale={locale as "en" | "pt"} />
        ) : (
          <section className="w-full max-w-5xl mx-auto pb-12">
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-lg border border-dashed">
              <XCircle className="size-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">
                {content.closed.title}
              </h2>
              <p className="text-muted-foreground max-w-md">
                {content.closed.description}
              </p>
            </div>
          </section>
        )}
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
