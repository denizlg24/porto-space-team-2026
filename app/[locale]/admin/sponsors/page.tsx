import { Suspense } from "react";
import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getCategories, getSponsors } from "@/lib/actions/sponsors";
import { getProjects } from "@/lib/actions/projects";
import { SponsorsManager } from "./_components/sponsors-manager";
import { SponsorsManagerSkeleton } from "./_components/sponsors-manager-skeleton";

async function SponsorsContent({ locale }: { locale: string }) {
  const content = getIntlayer("admin-sponsors-page", locale);
  const [categoriesResult, sponsorsResult, projectsResult] = await Promise.all([
    getCategories(),
    getSponsors(),
    getProjects(),
  ]);

  const categories = categoriesResult.success ? categoriesResult.data : [];
  const sponsors = sponsorsResult.success ? sponsorsResult.data : [];
  const projects = projectsResult.success ? projectsResult.data : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      <SponsorsManager
        initialCategories={categories}
        initialSponsors={sponsors}
        projects={projects}
      />
    </div>
  );
}

const SponsorsPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<SponsorsManagerSkeleton />}>
      <SponsorsContent locale={locale} />
    </Suspense>
  );
};

export default SponsorsPage;
