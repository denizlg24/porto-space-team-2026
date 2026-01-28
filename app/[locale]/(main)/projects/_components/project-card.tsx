import Image from "next/image";
import { Link } from "@/components/locale/link";
import { ArrowRight } from "lucide-react";
import type { ProjectData } from "@/lib/actions/projects";

type Props = {
  project: ProjectData;
  locale: string;
  learnMoreText: string;
};

export function ProjectCard({ project, locale, learnMoreText }: Props) {
  const name = locale === "pt" ? project.name.pt : project.name.en;
  const description =
    locale === "pt" ? project.description.pt : project.description.en;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block w-fit"
    >
      <div className="absolute -inset-3 border border-primary/20 pointer-events-none transition-colors group-hover:border-primary/40" />
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary transition-all group-hover:w-5 group-hover:h-5" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary transition-all group-hover:w-5 group-hover:h-5" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary transition-all group-hover:w-5 group-hover:h-5" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary transition-all group-hover:w-5 group-hover:h-5" />
      <div className="relative bg-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden bg-muted mx-auto sm:mx-0">
            <Image
              src={project.logo}
              alt={name}
              fill
              className="object-contain p-2"
              sizes="96px"
              unoptimized
            />
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-lg sm:text-xl transition-colors group-hover:text-primary">
              {name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
              {description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              {learnMoreText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
