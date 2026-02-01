import { getIntlayer } from "intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { LocalPromiseParams } from "next-intlayer";
import { getInterviewSlots } from "@/lib/actions/interview-slots";
import { InterviewSlotsManager } from "./_components/interview-slots-manager";

export default async function InterviewSlotsPage({ params }: LocalPromiseParams) {
  const { locale } = await params;
  const content = getIntlayer("admin-interview-slots-page", locale);

  const result = await getInterviewSlots();
  const slots = result.success ? result.data : [];

  return (
    <IntlayerServerProvider locale={locale}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{content.title}</h1>
          <p className="text-muted-foreground mt-1">{content.description}</p>
        </div>

        <InterviewSlotsManager initialSlots={slots} />
      </div>
    </IntlayerServerProvider>
  );
}
