import { getPublicCompetitionSections } from "@/lib/actions/competitions";
import { SectionContent } from "./section-content";
import { SectionTwoColumn } from "./section-two-column";
import { SectionStats } from "./section-stats";
import { SectionTimeline } from "./section-timeline";

type Props = {
  locale: string;
};

export async function SectionsRenderer({ locale }: Props) {
  const sections = await getPublicCompetitionSections();

  if (sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case "content":
            return (
              <SectionContent key={section.id} section={section} locale={locale} />
            );
          case "twoColumn":
            return (
              <SectionTwoColumn key={section.id} section={section} locale={locale} />
            );
          case "stats":
            return (
              <SectionStats key={section.id} section={section} locale={locale} />
            );
          case "timeline":
            return (
              <SectionTimeline key={section.id} section={section} locale={locale} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
