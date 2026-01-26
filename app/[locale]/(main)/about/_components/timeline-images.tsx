"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type Props = {
  imageUrls: string[];
  alt: string;
  className?: string;
};

export function TimelineImages({ imageUrls, alt, className }: Props) {
  if (imageUrls.length === 0) {
    return null;
  }

  if (imageUrls.length === 1) {
    return (
      <div className={className}>
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={imageUrls[0]}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
            unoptimized
          />
        </div>
      </div>
    );
  }

  return (
    <Carousel className={className} opts={{ loop: true }}>
      <CarouselContent>
        {imageUrls.map((url, index) => (
          <CarouselItem key={url}>
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <Image
                src={url}
                alt={`${alt} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
                unoptimized
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
