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

export function SectionStats({ section, locale }: Props) {
  const { stats, fullWidth } = section.content;

  if (!stats || stats.length === 0) return null;

  return (
    <section className={cn("w-full", fullWidth ? "" : "max-w-5xl mx-auto px-4")}>
      <div
        className={cn(
          "grid gap-8",
          stats.length === 1 && "grid-cols-1",
          stats.length === 2 && "grid-cols-2",
          stats.length === 3 && "grid-cols-3",
          stats.length >= 4 && "grid-cols-2 md:grid-cols-4"
        )}
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center space-y-2">
            <p className="text-4xl md:text-5xl font-bold text-primary">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">
              {getLocalizedText(stat.label, locale)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
