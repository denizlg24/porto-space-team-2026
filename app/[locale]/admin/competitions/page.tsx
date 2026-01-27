import { Suspense } from "react";
import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getCompetitionSections } from "@/lib/actions/competitions";
import { CompetitionsManager } from "./_components/competitions-manager";
import { CompetitionsManagerSkeleton } from "./_components/competitions-manager-skeleton";

async function CompetitionsContent({ locale }: { locale: string }) {
  const content = getIntlayer("admin-competitions-page", locale);
  const result = await getCompetitionSections();
  const sections = result.success ? result.data : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      <CompetitionsManager initialSections={sections} />
    </div>
  );
}

const CompetitionsPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<CompetitionsManagerSkeleton />}>
      <CompetitionsContent locale={locale} />
    </Suspense>
  );
};

export default CompetitionsPage;
