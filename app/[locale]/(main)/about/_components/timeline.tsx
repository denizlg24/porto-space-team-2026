import { getIntlayer } from "intlayer";
import { getPublicTimelineItems } from "@/lib/actions/timeline";
import { TimelineImages } from "./timeline-images";
import type { LocalizedString } from "@/models/TimelineItem";

type Props = {
  locale: string;
};

function getLocalizedText(text: LocalizedString, locale: string): string {
  return locale === "pt" ? text.pt : text.en;
}

export async function Timeline({ locale }: Props) {
  const content = getIntlayer("about-page", locale);
  const items = await getPublicTimelineItems();

  if (items.length === 0) {
    return (
      <section className="w-full max-w-5xl mx-auto py-12">
        <h2 className="text-xs text-primary mb-4">{content.timeline.label}</h2>
        <h3 className="text-3xl font-bold mb-8">{content.timeline.title}</h3>
        <p className="text-muted-foreground text-center py-12">
          {content.timeline.empty}
        </p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto py-12">
      <h2 className="text-xs text-primary mb-4">{content.timeline.label}</h2>
      <h3 className="text-3xl font-bold mb-12">{content.timeline.title}</h3>
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-border hidden md:block" />
        <div className="space-y-12 md:space-y-16">
          {items.map((item, index) => {
            const title = getLocalizedText(item.title, locale);
            const subtitle = getLocalizedText(item.subtitle, locale);

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 hidden md:block" />
                <div className="flex-1 w-full md:w-auto">
                  {item.imageUrls.length > 0 && (
                    <TimelineImages
                      imageUrls={item.imageUrls}
                      alt={title}
                      className={index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}
                    />
                  )}
                </div>
                <div
                  className={`flex-1 text-center md:text-left ${
                    index % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <span className="inline-block px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded mb-3">
                    {item.year}
                  </span>
                  <h4 className="text-xl font-bold mb-2">{title}</h4>
                  <p className="text-muted-foreground">{subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
