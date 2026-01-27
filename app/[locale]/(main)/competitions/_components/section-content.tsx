import { cn } from "@/lib/utils";
import { ContentBlocksRenderer } from "./content-block-renderer";
import type { CompetitionSectionData } from "@/lib/actions/competitions";

type Props = {
  section: CompetitionSectionData;
  locale: string;
};

const alignClasses: Record<string, string> = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};

export function SectionContent({ section, locale }: Props) {
  const { blocks, fullWidth, align } = section.content;

  if (!blocks || blocks.length === 0) return null;

  return (
    <section
      className={cn(
        "w-full",
        fullWidth ? "" : "max-w-5xl mx-auto px-4",
        "flex flex-col",
        alignClasses[align ?? "left"]
      )}
    >
      <ContentBlocksRenderer blocks={blocks} locale={locale} />
    </section>
  );
}
