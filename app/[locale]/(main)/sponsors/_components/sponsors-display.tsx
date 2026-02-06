"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { SponsorCategoryItem, SponsorItem } from "@/lib/actions/sponsors";

const AUTOPLAY_DELAY = 4000;

interface SponsorImageProps {
  src: string;
  alt: string;
  size: number;
}

function SponsorImage({ src, alt, size }: SponsorImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      {isLoading && <Skeleton className="absolute inset-0 rounded-md" />}
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-contain transition-all duration-300 group-hover:scale-105",
          isLoading ? "opacity-0" : "opacity-100",
        )}
        sizes={`${size}px`}
        unoptimized
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

interface SponsorsDisplayProps {
  categories: SponsorCategoryItem[];
  sponsors: SponsorItem[];
  partnersLabel: string;
  visitWebsiteLabel: string;
}

const LOGO_SIZES: Record<number, number> = {
  0: 140,
  1: 100,
  2: 96,
};

function getLogoSize(categoryIndex: number) {
  return LOGO_SIZES[Math.min(categoryIndex, 2)] ?? LOGO_SIZES[2];
}

interface CategorySectionProps {
  category: SponsorCategoryItem;
  categorySponsors: SponsorItem[];
  categoryIndex: number;
  partnersLabel: string;
  visitWebsiteLabel: string;
}

function CategorySection({
  category,
  categorySponsors,
  categoryIndex,
  partnersLabel,
  visitWebsiteLabel,
}: CategorySectionProps) {
  const logoSize = getLogoSize(categoryIndex);
  const itemWidth = logoSize + 48;

  const [api, setApi] = useState<CarouselApi>();
  const [canScroll, setCanScroll] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  const startAutoplay = useCallback(() => {
    if (!api || !canScroll) return;

    autoplayRef.current = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, AUTOPLAY_DELAY);
  }, [api, canScroll]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    if (!api) return;

    const updateCanScroll = () => {
      const scrollable = api.canScrollPrev() || api.canScrollNext();
      setCanScroll(scrollable);
    };

    updateCanScroll();
    api.on("reInit", updateCanScroll);
    api.on("resize", updateCanScroll);

    return () => {
      api.off("reInit", updateCanScroll);
      api.off("resize", updateCanScroll);
    };
  }, [api]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  return (
    <section className="space-y-6">
      <h2 className="text-center flex flex-col items-center gap-0 flex-wrap">
        <span
          style={{
            fontSize: category.titleStyle.fontSize,
            fontWeight: category.titleStyle.fontWeight,
          }}
          className="dark:hidden"
        >
          <span style={{ color: category.titleStyle.colorLight }}>
            {category.name}
          </span>
        </span>
        <span
          style={{
            fontSize: category.titleStyle.fontSize,
            fontWeight: category.titleStyle.fontWeight,
          }}
          className="hidden dark:inline"
        >
          <span style={{ color: category.titleStyle.colorDark }}>
            {category.name}
          </span>
        </span>
        <span className="text-muted-foreground font-normal text-lg">
          {partnersLabel}
        </span>
      </h2>

      <div
        className="px-6 relative"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <Carousel
          opts={{
            align: "center",
            containScroll:"keepSnaps",
            loop: canScroll,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent
            className={cn("-ml-4", !canScroll && "justify-center")}
          >
            {categorySponsors.map((sponsor) => (
              <CarouselItem
                key={sponsor.id}
                className="pl-4"
                style={{ flex: `0 0 ${itemWidth}px` }}
              >
                <Link
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-1 p-3 transition-all hover:bg-muted/50 rounded-lg"
                  title={`${sponsor.name} - ${visitWebsiteLabel}`}
                >
                  <SponsorImage
                    src={sponsor.imageUrl}
                    alt={sponsor.name}
                    size={logoSize}
                  />
                  <span className="text-xs text-muted-foreground text-center w-full">
                    {sponsor.name}
                  </span>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          {canScroll && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
          </>
        )}
          {canScroll && (
            <>
              <CarouselPrevious className="-left-9"/>
              <CarouselNext className="-right-9"/>
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
}

export function SponsorsDisplay({
  categories,
  sponsors,
  partnersLabel,
  visitWebsiteLabel,
}: SponsorsDisplayProps) {
  const groupedSponsors = categories
    .map((category) => ({
      category,
      sponsors: sponsors
        .filter((s) => s.categoryId === category.id)
        .sort((a, b) => a.order - b.order),
    }))
    .filter((g) => g.sponsors.length > 0);

  return (
    <div className="space-y-8">
      {groupedSponsors.map(
        ({ category, sponsors: categorySponsors }, index) => (
          <CategorySection
            key={category.id}
            category={category}
            categorySponsors={categorySponsors}
            categoryIndex={index}
            partnersLabel={partnersLabel}
            visitWebsiteLabel={visitWebsiteLabel}
          />
        ),
      )}
    </div>
  );
}
