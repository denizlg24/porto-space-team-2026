"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { MediaFrame } from "@/components/ui/media-frame";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectMediaData } from "@/lib/actions/projects";

type Props = {
  media: ProjectMediaData[];
  locale: string;
  className?: string;
};

export function ProjectMediaCarousel({ media, locale, className }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (media.length === 0) return null;

  const currentMedia = media[selectedIndex];
  const tags = currentMedia?.tags || [];

  return (
    <div className={cn("w-full", className)}>
      <div className="relative md:px-16 w-full">
        <div className="overflow-hidden py-4 w-full" ref={emblaRef}>
          <div className="flex w-full">
            {media.map((item) => {
              const alt = locale === "pt" ? item.alt.pt : item.alt.en;
              return (
                <div
                  key={item.id}
                  className="flex-[0_0_100%] min-w-0 px-3 w-full"
                >
                  <MediaFrame
                    type={item.type}
                    src={item.url}
                    alt={alt || "Media"}
                    aspectRatio="16/9"
                    className="max-w-full! w-full"
                  >
                    {tags.length > 0 && (
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                        {tags.map((tag, tagIndex) => {
                          const tagText = locale === "pt" ? tag.pt : tag.en;
                          if (!tagText) return null;
                          return (
                            <span
                              key={tagIndex}
                              className={cn(
                                "font-mono text-xs sm:px-2 px-1 sm:py-1 py-0.5 border",
                                tagIndex === 0
                                  ? "text-primary/80 bg-background/80 border-primary/30"
                                  : "text-muted-foreground bg-background/80 border-border"
                              )}
                            >
                              {tagText}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </MediaFrame>
                </div>
              );
            })}
          </div>
        </div>

        {media.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon-sm"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {media.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === selectedIndex
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
