"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CompetitionSectionData } from "@/lib/actions/competitions";
import { SectionContent } from "@/app/[locale]/(main)/competitions/_components/section-content";
import { SectionTwoColumn } from "@/app/[locale]/(main)/competitions/_components/section-two-column";
import { SectionStats } from "@/app/[locale]/(main)/competitions/_components/section-stats";
import { SectionTimeline } from "@/app/[locale]/(main)/competitions/_components/section-timeline";

type Props = {
  sections: CompetitionSectionData[];
};

export function SectionsPreview({ sections }: Props) {
  const content = useIntlayer("admin-competitions-page");
  const [isOpen, setIsOpen] = useState(false);
  const [previewLocale, setPreviewLocale] = useState<"en" | "pt">("en");

  const visibleSections = sections.filter((s) => s.visible);

  const renderSection = (section: CompetitionSectionData) => {
    switch (section.type) {
      case "content":
        return <SectionContent section={section} locale={previewLocale} />;
      case "twoColumn":
        return <SectionTwoColumn section={section} locale={previewLocale} />;
      case "stats":
        return <SectionStats section={section} locale={previewLocale} />;
      case "timeline":
        return <SectionTimeline section={section} locale={previewLocale} />;
      default:
        return null;
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{content.preview.title}</CardTitle>
              <CardDescription>{content.preview.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={previewLocale}
                onValueChange={(v) => setPreviewLocale(v as "en" | "pt")}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    {content.form.languages.english}
                  </SelectItem>
                  <SelectItem value="pt">
                    {content.form.languages.portuguese}
                  </SelectItem>
                </SelectContent>
              </Select>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  {isOpen ? (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" />
                      {content.preview.hidePreview}
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      {content.preview.showPreview}
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {visibleSections.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {content.preview.emptyState}
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden bg-background">
                <div className="max-h-150 overflow-y-auto">
                  <div className="flex flex-col gap-12 px-4 md:px-8 py-8">
                    {visibleSections.map((section) => (
                      <div key={section.id}>{renderSection(section)}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
