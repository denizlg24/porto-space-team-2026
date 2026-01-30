"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { SponsorCategoryItem, SponsorItem } from "@/lib/actions/sponsors";
import { getLocalizedUrl } from "intlayer";

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
  locale: string;
}

const LOGO_SIZES: Record<number, number> = {
  0: 140,
  1: 100,
  2: 96,
};

const CAROUSEL_ITEM_CLASSES: Record<number, string> = {
  0: "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4",
  1: "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5",
  2: "basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
};

const MAX_VISIBLE: Record<number, number> = {
  0: 4,
  1: 5,
  2: 6,
};

function getLogoSize(categoryIndex: number) {
  return LOGO_SIZES[Math.min(categoryIndex, 2)] ?? LOGO_SIZES[2];
}

function getCarouselItemClass(categoryIndex: number) {
  return (
    CAROUSEL_ITEM_CLASSES[Math.min(categoryIndex, 2)] ??
    CAROUSEL_ITEM_CLASSES[2]
  );
}

function getMaxVisible(categoryIndex: number) {
  return MAX_VISIBLE[Math.min(categoryIndex, 2)] ?? MAX_VISIBLE[2];
}

interface CategorySectionProps {
  category: SponsorCategoryItem;
  categorySponsors: SponsorItem[];
  categoryIndex: number;
  partnersLabel: string;
  visitWebsiteLabel: string;
  locale: string;
}

function CategorySection({
  category,
  categorySponsors,
  categoryIndex,
  partnersLabel,
  visitWebsiteLabel,
  locale,
}: CategorySectionProps) {
  const logoSize = getLogoSize(categoryIndex);
  const carouselItemClass = getCarouselItemClass(categoryIndex);
  const maxVisible = getMaxVisible(categoryIndex);

  const needsCarousel = categorySponsors.length > maxVisible;

  const renderSponsorLink = (sponsor: SponsorItem) => (
    <div
      key={sponsor.id}
      className={
        "relative"
      }
    >
      <Link
        href={sponsor.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ width: logoSize + 24 }}
        className="group flex flex-col items-center gap-1 p-3 transition-all hover:bg-muted/50 "
        title={`${sponsor.name} - ${visitWebsiteLabel}`}
      >
        <SponsorImage
          src={sponsor.imageUrl}
          alt={sponsor.name}
          size={logoSize}
        />
        <span className="text-xs text-muted-foreground text-center break-after-all mx-auto w-full">
          {sponsor.name}
        </span>
      </Link>
      {sponsor.project && (
        <Link
          href={getLocalizedUrl(`/projects/${sponsor.project.slug}`, locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-1 right-1 opacity-85 hover:opacity-100 transition-opacity"
        >
          <Image
            src={sponsor.project.logo}
            alt={sponsor.project.name}
            width={24}
            height={24}
          />
        </Link>
      )}
    </div>
  );

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

      {needsCarousel ? (
        <div className="px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {categorySponsors.map((sponsor) => (
                <CarouselItem key={sponsor.id} className={carouselItemClass}>
                  {renderSponsorLink(sponsor)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {categorySponsors.map(renderSponsorLink)}
        </div>
      )}
    </section>
  );
}

export function SponsorsDisplay({
  categories,
  sponsors,
  partnersLabel,
  visitWebsiteLabel,
  locale,
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
            locale={locale}
          />
        ),
      )}
    </div>
  );
}
