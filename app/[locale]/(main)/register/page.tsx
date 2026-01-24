import type { Metadata } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { LocalPromiseParams, NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { GridBackground } from "@/components/ui/grid-background";
import { PortoSpaceTeamLogo } from "@/components/ui/logo";
import { RegisterProcess } from "./_components/register-process";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("register-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/register");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/register" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="px-4 pt-8 sm:pt-10 md:pt-12 min-h-screen">
        <GridBackground className="max-w-7xl mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="max-w-md w-full flex flex-col gap-12 items-center mx-auto pb-12">
          <PortoSpaceTeamLogo />
          <RegisterProcess />
        </div>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
