import { cn } from "@/lib/utils";
import { ContentBlocksRenderer } from "./content-block-renderer";
import type { CompetitionSectionData } from "@/lib/actions/competitions";

type Props = {
  section: CompetitionSectionData;
  locale: string;
};

export function SectionTwoColumn({ section, locale }: Props) {
  const { leftBlocks, rightBlocks, layout, fullWidth } = section.content;
  const isImageLeft = layout !== "imageRight";

  const hasLeftContent = leftBlocks && leftBlocks.length > 0;
  const hasRightContent = rightBlocks && rightBlocks.length > 0;

  if (!hasLeftContent && !hasRightContent) return null;

  return (
    <section className={cn("w-full", fullWidth ? "" : "max-w-5xl mx-auto px-4")}>
      <div
        className={cn(
          "grid gap-8 md:gap-12 items-center",
          "grid-cols-1 md:grid-cols-2",
          !isImageLeft && "md:[&>*:first-child]:order-2"
        )}
      >
        <div className="w-full">
          {hasLeftContent && (
            <ContentBlocksRenderer blocks={leftBlocks} locale={locale} />
          )}
        </div>
        <div className="w-full">
          {hasRightContent && (
            <ContentBlocksRenderer blocks={rightBlocks} locale={locale} />
          )}
        </div>
      </div>
    </section>
  );
}
