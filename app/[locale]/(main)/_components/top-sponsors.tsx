import Image from "next/image";
import { getIntlayer } from "intlayer";
import { getTopSponsors } from "@/lib/actions/sponsors";
import { Link } from "@/components/locale/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type Props = {
  locale: string;
};

export async function TopSponsors({ locale }: Props) {
  const data = await getTopSponsors();
  const content = getIntlayer("home-page", locale);

  if (!data.category || data.sponsors.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-5xl my-8 mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xs text-primary mb-2">{content.sponsors.label}</h2>
        <h3
          style={{
            fontSize: data.category.titleStyle.fontSize,
            fontWeight: data.category.titleStyle.fontWeight,
          }}
        >
          <span
            className="dark:hidden"
            style={{ color: data.category.titleStyle.colorLight }}
          >
            {data.category.name}
          </span>
          <span
            className="hidden dark:inline"
            style={{ color: data.category.titleStyle.colorDark }}
          >
            {data.category.name}
          </span>
        </h3>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
        {data.sponsors.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:bg-muted/50"
          >
            <div className="relative w-[140px] h-[140px]">
              <Image
                src={sponsor.imageUrl}
                alt={sponsor.name}
                fill
                className="object-contain transition-all duration-300 group-hover:scale-105"
                sizes="140px"
                unoptimized
              />
            </div>
            <span className="text-sm text-muted-foreground text-center">
              {sponsor.name}
            </span>
          </a>
        ))}
      </div>

      <div className="text-center">
        <Button asChild variant="outline" className="group">
          <Link href="/sponsors">
            {content.sponsors.viewAll}
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
