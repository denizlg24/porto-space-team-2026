import { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const revalidate = 604800;

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("home-page", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="min-h-screen lg:text-7xl md:text-6xl sm:text-4xl text-3xl font-black uppercase text-center">
        <h1 className="mt-12">{content.welcome}</h1>
      </main>
    </IntlayerServerProvider>
  );
};

export default Page;