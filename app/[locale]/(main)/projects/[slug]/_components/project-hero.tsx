import Image from "next/image";
import { GridBackground } from "@/components/ui/grid-background";
import type { ProjectData } from "@/lib/actions/projects";

type Props = {
  project: ProjectData;
  locale: string;
};

export function ProjectHero({ project, locale }: Props) {
  const name = locale === "pt" ? project.name.pt : project.name.en;
  const heroDescription =
    locale === "pt" ? project.heroDescription.pt : project.heroDescription.en;

  return (
    <section className="w-full relative max-w-5xl mx-auto py-12">
      <GridBackground className="-z-10 mask-[radial-gradient(ellipse_at_center,black_25%,transparent_75%)] opacity-7" />
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="relative h-32 w-32 md:h-40 md:w-40 shrink-0 overflow-hidden bg-muted md:mr-auto">
          <Image
            src={project.logo}
            alt={name}
            fill
            className="object-contain p-4"
            sizes="160px"
            priority
            unoptimized
          />
        </div>
        <div className="text-center md:text-left flex-1 w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
          {heroDescription && (
            <p className="text-lg text-muted-foreground whitespace-pre-line max-w-5xl">
              {heroDescription}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
