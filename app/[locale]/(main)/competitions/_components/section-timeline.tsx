import { cn } from "@/lib/utils";
import type { LocalizedString } from "@/models/CompetitionSection";
import type { CompetitionSectionData } from "@/lib/actions/competitions";

type Props = {
  section: CompetitionSectionData;
  locale: string;
};

function getLocalizedText(text: LocalizedString, locale: string): string {
  return locale === "pt" ? text.pt : text.en;
}

export function SectionTimeline({ section, locale }: Props) {
  const { timelineItems, fullWidth } = section.content;

  if (!timelineItems || timelineItems.length === 0) return null;

  return (
    <section className={cn("w-full", fullWidth ? "" : "max-w-5xl mx-auto px-4")}>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8",
                index % 2 === 0 ? "md:text-right" : ""
              )}
            >
              <div
                className={cn(
                  "hidden md:block",
                  index % 2 === 0 ? "md:pr-8" : "md:order-2 md:pl-8"
                )}
              >
                <div
                  className={cn(
                    "space-y-2",
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}
                >
                  <p className="text-sm font-semibold text-primary">
                    {item.year}
                  </p>
                  <h3 className="text-xl font-bold">
                    {getLocalizedText(item.title, locale)}
                  </h3>
                  <p className="text-muted-foreground">
                    {getLocalizedText(item.description, locale)}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "hidden md:block",
                  index % 2 === 0 ? "md:order-2" : ""
                )}
              />
              <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center md:-translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="md:hidden space-y-2">
                <p className="text-sm font-semibold text-primary">
                  {item.year}
                </p>
                <h3 className="text-xl font-bold">
                  {getLocalizedText(item.title, locale)}
                </h3>
                <p className="text-muted-foreground">
                  {getLocalizedText(item.description, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
