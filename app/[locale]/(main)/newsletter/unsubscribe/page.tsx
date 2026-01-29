import { IntlayerServerProvider } from "next-intlayer/server";
import { GridBackground } from "@/components/ui/grid-background";
import { UnsubscribeHandler } from "./_components/unsubscribe-handler";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}

const UnsubscribePage = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;
  const { token } = await searchParams;

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="flex flex-col gap-12 min-h-screen items-center px-4">
        <section className="w-full relative max-w-lg mx-auto text-center py-12">
          <GridBackground className="-z-10 mask-[radial-gradient(ellipse_at_center,black_25%,transparent_75%)] opacity-7" />
          <UnsubscribeHandler token={token} />
        </section>
      </main>
    </IntlayerServerProvider>
  );
};

export default UnsubscribePage;
