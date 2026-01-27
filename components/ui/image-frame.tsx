import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type AspectRatio = "video" | "square" | "4/5" | "3/4" | "16/9";

type Props = {
  src: string | StaticImageData;
  alt: string;
  aspectRatio?: AspectRatio;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  overlay?: boolean;
  children?: React.ReactNode;
};

const aspectRatioClasses: Record<AspectRatio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  "4/5": "aspect-4/5",
  "3/4": "aspect-3/4",
  "16/9": "aspect-video",
};

export function ImageFrame({
  src,
  alt,
  aspectRatio = "video",
  priority = false,
  className,
  imageClassName,
  overlay = false,
  children,
}: Props) {
  return (
    <div className={cn("relative w-full mx-auto max-w-lg h-fit", className)}>
      <div className="absolute -inset-3 border border-primary/20 pointer-events-none" />
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
      <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio])}>
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", imageClassName)}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 512px"
          unoptimized={typeof src === "string"}
        />
        {overlay && (
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        )}
        {children}
      </div>
    </div>
  );
}
