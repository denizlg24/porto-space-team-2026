import { Suspense } from "react";
import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getHomePageContent } from "@/lib/actions/content";
import { ContentManager } from "./_components/content-manager";
import { ContentManagerSkeleton } from "./_components/content-manager-skeleton";

async function ContentPageContent({ locale }: { locale: string }) {
  const content = getIntlayer("admin-content-page", locale);
  const homeContent = await getHomePageContent();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      <ContentManager initialHomeContent={homeContent} />
    </div>
  );
}

const ContentPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<ContentManagerSkeleton />}>
      <ContentPageContent locale={locale} />
    </Suspense>
  );
};

export default ContentPage;
