import { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("home-page", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1>{content.title}</h1>
    </IntlayerServerProvider>
  );
};

export default Page;