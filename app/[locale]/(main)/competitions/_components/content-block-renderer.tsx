import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import { CarouselBlockClient } from "./carousel-block-client";
import type {
  ContentBlock,
  LocalizedString,
} from "@/models/CompetitionSection";

type Props = {
  block: ContentBlock;
  locale: string;
};

function getLocalizedText(text: LocalizedString, locale: string): string {
  return locale === "pt" ? text.pt : text.en;
}

const sizeClasses: Record<string, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl md:text-5xl",
};

const alignClasses: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const colorClasses: Record<string, string> = {
  default: "text-foreground",
  primary: "text-primary",
  muted: "text-muted-foreground",
  accent: "text-accent-foreground",
  destructive: "text-destructive",
};

const objectFitClasses: Record<string, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  none: "object-none",
};

const maxWidthClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full",
};

const spacerSizeClasses: Record<string, string> = {
  xs: "h-2",
  sm: "h-4",
  md: "h-8",
  lg: "h-12",
  xl: "h-16",
  "2xl": "h-24",
};

const flexAlignClasses: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

function TextBlockRenderer({ block, locale }: { block: ContentBlock; locale: string }) {
  const data = block.text;
  if (!data) return null;

  const text = getLocalizedText(data.content, locale);
  const sizeClass = sizeClasses[data.size ?? "md"];
  const alignClass = alignClasses[data.align ?? "left"];
  const colorClass = colorClasses[data.color ?? "default"] ?? "text-foreground";

  switch (data.textType) {
    case "label":
      return (
        <p className={cn("text-xs text-primary uppercase tracking-wide", alignClass)}>
          {text}
        </p>
      );
    case "heading":
      return (
        <h2
          className={cn(
            "font-bold",
            sizeClass,
            alignClass,
            colorClass,
            data.bold && "font-black"
          )}
        >
          {text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          className={cn(
            sizeClass,
            alignClass,
            data.color ? colorClass : "text-muted-foreground",
            data.bold && "font-semibold"
          )}
        >
          {text}
        </p>
      );
    default:
      return null;
  }
}

function ImageBlockRenderer({ block, locale }: { block: ContentBlock; locale: string }) {
  const data = block.image;
  if (!data) return null;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden mx-auto",
        maxWidthClasses[data.maxWidth ?? "full"],
        data.rounded && "rounded-lg",
        data.aspectRatio === "video" && "aspect-video",
        data.aspectRatio === "square" && "aspect-square",
        data.aspectRatio === "4/5" && "aspect-4/5",
        data.aspectRatio === "3/4" && "aspect-3/4",
        data.aspectRatio === "16/9" && "aspect-video"
      )}
    >
      <Image
        src={data.url}
        alt={getLocalizedText(data.alt, locale)}
        fill
        className={cn("object-cover", objectFitClasses[data.objectFit ?? "cover"])}
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
      />
    </div>
  );
}

function ImageFrameBlockRenderer({ block, locale }: { block: ContentBlock; locale: string }) {
  const data = block.imageFrame;
  if (!data) return null;

  return (
    <ImageFrame
      src={data.url}
      alt={getLocalizedText(data.alt, locale)}
      aspectRatio={data.aspectRatio ?? "video"}
      className={maxWidthClasses[data.maxWidth ?? "lg"]}
      imageClassName={objectFitClasses[data.objectFit ?? "cover"]}
    />
  );
}

function ButtonBlockRenderer({ block, locale }: { block: ContentBlock; locale: string }) {
  const data = block.button;
  if (!data) return null;

  const isExternal = data.url.startsWith("http");
  const ButtonWrapper = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href: data.url, target: "_blank", rel: "noopener noreferrer" }
    : { href: data.url };

  const button = (
    <Button
      variant={data.variant ?? "default"}
      size={data.size ?? "default"}
      className={cn(data.fullWidth && "w-full")}
      asChild
    >
      <ButtonWrapper {...linkProps}>
        {getLocalizedText(data.text, locale)}
      </ButtonWrapper>
    </Button>
  );

  if (data.align || data.fullWidth) {
    return (
      <div className={cn("flex", flexAlignClasses[data.align ?? "left"], data.fullWidth && "w-full")}>
        {button}
      </div>
    );
  }

  return button;
}

function ButtonGroupBlockRenderer({ block, locale }: { block: ContentBlock; locale: string }) {
  const data = block.buttonGroup;
  if (!data || !data.buttons || data.buttons.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-4", flexAlignClasses[data.align ?? "left"])}>
      {data.buttons.map((btn, index) => {
        const isExternal = btn.url.startsWith("http");
        const ButtonWrapper = isExternal ? "a" : Link;
        const linkProps = isExternal
          ? { href: btn.url, target: "_blank", rel: "noopener noreferrer" }
          : { href: btn.url };

        return (
          <Button
            key={index}
            variant={btn.variant ?? "default"}
            size={btn.size ?? "default"}
            asChild
          >
            <ButtonWrapper {...linkProps}>
              {getLocalizedText(btn.text, locale)}
            </ButtonWrapper>
          </Button>
        );
      })}
    </div>
  );
}

function SpacerBlockRenderer({ block }: { block: ContentBlock }) {
  const data = block.spacer;
  if (!data) return null;

  return <div className={spacerSizeClasses[data.size ?? "md"]} aria-hidden="true" />;
}

function CarouselBlockRenderer({ block, locale }: { block: ContentBlock; locale: string }) {
  const data = block.carousel;
  if (!data || !data.images || data.images.length === 0) return null;

  const images = data.images.map((img) => ({
    url: img.url,
    alt: locale === "pt" ? img.alt.pt : img.alt.en,
  }));

  return (
    <CarouselBlockClient
      images={images}
      aspectRatio={data.aspectRatio ?? "video"}
      maxWidth={data.maxWidth ?? "full"}
    />
  );
}

export function ContentBlockRenderer({ block, locale }: Props) {
  switch (block.blockType) {
    case "text":
      return <TextBlockRenderer block={block} locale={locale} />;
    case "image":
      return <ImageBlockRenderer block={block} locale={locale} />;
    case "imageFrame":
      return <ImageFrameBlockRenderer block={block} locale={locale} />;
    case "carousel":
      return <CarouselBlockRenderer block={block} locale={locale} />;
    case "button":
      return <ButtonBlockRenderer block={block} locale={locale} />;
    case "buttonGroup":
      return <ButtonGroupBlockRenderer block={block} locale={locale} />;
    case "spacer":
      return <SpacerBlockRenderer block={block} />;
    default:
      return null;
  }
}

export function ContentBlocksRenderer({
  blocks,
  locale,
  className,
}: {
  blocks: ContentBlock[];
  locale: string;
  className?: string;
}) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {blocks.map((block, index) => (
        <ContentBlockRenderer key={index} block={block} locale={locale} />
      ))}
    </div>
  );
}
