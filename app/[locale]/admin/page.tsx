import type { Metadata } from "next";
import { LocalPromiseParams, NextPageIntlayer } from "next-intlayer";
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("admin-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/admin");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/admin" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

const AdminDashboardPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = getIntlayer("admin-sidebar", locale);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{content.nav.dashboard}</h1>
      <p className="text-muted-foreground">
        Welcome to the admin dashboard. Use the sidebar to navigate.
      </p>
    </div>
  );
};

export default AdminDashboardPage;
