import type { Metadata } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { LocalPromiseParams, NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { GridBackground } from "@/components/ui/grid-background";
import { PortoSpaceTeamLogo } from "@/components/ui/logo";
import { SignInForm } from "./_components/sign-in-form";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("sign-in-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/sign-in");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/sign-in" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("sign-in-page", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="px-4 pt-8 sm:pt-10 md:pt-12 min-h-screen">
        <GridBackground className="max-w-7xl mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="max-w-md w-full flex flex-col gap-12 items-center mx-auto pb-12">
          <PortoSpaceTeamLogo />
          <div className="flex flex-col gap-2 items-start w-full">
            <h3 className="text-xs text-primary text-left w-full uppercase">
              {content.authRequired}
            </h3>
            <h1 className="font-bold text-3xl">{content.title}</h1>
            <p className="text-muted-foreground text-sm">
              {content.description}
            </p>
            <SignInForm className="mt-8" />
          </div>
        </div>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
