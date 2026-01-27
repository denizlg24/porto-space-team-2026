"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type CarouselBlockClientProps = {
  images: { url: string; alt: string }[];
  aspectRatio: "video" | "square" | "4/5" | "3/4" | "16/9";
  maxWidth: "sm" | "md" | "lg" | "xl" | "full";
};

const maxWidthClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full",
};

const aspectRatioClasses: Record<string, string> = {
  video: "aspect-video",
  square: "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-video",
};

export function CarouselBlockClient({
  images,
  aspectRatio,
  maxWidth,
}: CarouselBlockClientProps) {
  if (images.length === 0) return null;

  return (
    <div className={cn("mx-auto w-full", maxWidthClasses[maxWidth])}>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className={cn(
                  "relative w-full overflow-hidden",
                  aspectRatioClasses[aspectRatio]
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover w-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2"/>
          </>
        )}
      </Carousel>
    </div>
  );
}
