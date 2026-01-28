import { cn } from "@/lib/utils";
import type { ProjectData } from "@/lib/actions/projects";

type Props = {
  project: ProjectData;
  locale: string;
  label: string;
};

export function ProjectStats({ project, locale, label }: Props) {
  const { stats } = project;

  if (!stats || stats.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto py-12">
      <h2 className="text-xs text-primary mb-8 text-center">{label}</h2>
      <div
        className={cn(
          "grid sm:gap-8 gap-2",
          stats.length === 1 && "grid-cols-1",
          stats.length === 2 && "grid-cols-2",
          stats.length === 3 && "grid-cols-3",
          stats.length >= 4 && "grid-cols-2 md:grid-cols-4"
        )}
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center space-y-2">
            <p className="text-4xl md:text-5xl font-bold text-primary">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">
              {locale === "pt" ? stat.label.pt : stat.label.en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
