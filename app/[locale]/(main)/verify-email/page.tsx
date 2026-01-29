import type { Metadata } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { LocalPromiseParams } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { GridBackground } from "@/components/ui/grid-background";
import { PortoSpaceTeamLogo } from "@/components/ui/logo";
import { VerifyEmailResult } from "./_components/verify-email-result";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("verify-email-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/verify-email");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/verify-email" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const Page = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;
  const { token } = await searchParams;

  let error: string | undefined;

  if (token) {
    try {
      await auth.api.verifyEmail({ query: { token } });
    } catch {
      error = "INVALID_TOKEN";
    }
  } else {
    error = "NO_TOKEN";
  }

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="px-4 pt-8 sm:pt-10 md:pt-12 min-h-screen">
        <GridBackground className="max-w-7xl mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="max-w-md w-full flex flex-col gap-12 items-center mx-auto pb-12">
          <PortoSpaceTeamLogo />
          <VerifyEmailResult error={error as string | undefined} />
        </div>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;
