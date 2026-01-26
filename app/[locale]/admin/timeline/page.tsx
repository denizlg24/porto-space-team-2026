import { Suspense } from "react";
import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getTimelineItems } from "@/lib/actions/timeline";
import { TimelineManager } from "./_components/timeline-manager";
import { TimelineManagerSkeleton } from "./_components/timeline-manager-skeleton";

async function TimelineContent({ locale }: { locale: string }) {
  const content = getIntlayer("admin-timeline-page", locale);
  const result = await getTimelineItems();
  const items = result.success ? result.data : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      <TimelineManager initialItems={items} />
    </div>
  );
}

const TimelinePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<TimelineManagerSkeleton />}>
      <TimelineContent locale={locale} />
    </Suspense>
  );
};

export default TimelinePage;
