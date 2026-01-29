import { CompetitionSectionData } from "@/lib/actions/competitions";
import { SectionContent } from "../../../competitions/_components/section-content";
import { SectionStats } from "../../../competitions/_components/section-stats";
import { SectionTimeline } from "../../../competitions/_components/section-timeline";
import { SectionTwoColumn } from "../../../competitions/_components/section-two-column";

type Props = {
  locale: string;
  sections: CompetitionSectionData[];
};

export async function CustomSectionsRenderer({ locale, sections }: Props) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case "content":
            return (
              <SectionContent
                key={section.id}
                section={section}
                locale={locale}
              />
            );
          case "twoColumn":
            return (
              <SectionTwoColumn
                key={section.id}
                section={section}
                locale={locale}
              />
            );
          case "stats":
            return (
              <SectionStats
                key={section.id}
                section={section}
                locale={locale}
              />
            );
          case "timeline":
            return (
              <SectionTimeline
                key={section.id}
                section={section}
                locale={locale}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
