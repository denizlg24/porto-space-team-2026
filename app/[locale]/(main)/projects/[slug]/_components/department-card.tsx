import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectDepartmentData } from "@/lib/actions/projects";

type Props = {
  department: ProjectDepartmentData;
  locale: string;
  isActive?: boolean;
};

export function DepartmentCard({ department, locale, isActive }: Props) {
  const title = locale === "pt" ? department.title.pt : department.title.en;
  const description =
    locale === "pt" ? department.description.pt : department.description.en;

  return (
    <article
      id={`department-${department.id}`}
      data-department-id={department.id}
      className={cn(
        "relative p-6 border transition-all duration-300",
        isActive
          ? "border-primary bg-primary/5 opacity-100"
          : "border-border bg-card hover:border-primary/50 opacity-50"
      )}
    >
      <div className="absolute -inset-px pointer-events-none">
        <div
          className={cn(
            "absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 transition-colors",
            isActive ? "border-primary" : "border-primary/50"
          )}
        />
        <div
          className={cn(
            "absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 transition-colors",
            isActive ? "border-primary" : "border-primary/50"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 transition-colors",
            isActive ? "border-primary" : "border-primary/50"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 transition-colors",
            isActive ? "border-primary" : "border-primary/50"
          )}
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <p className="text-muted-foreground whitespace-pre-line mb-4">
        {description}
      </p>

      {department.bulletPoints.length > 0 && (
        <ul className="space-y-2 mb-4 pt-4 border-t">
          {department.bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-primary">•</span>
              <span>{locale === "pt" ? point.pt : point.en}</span>
            </li>
          ))}
        </ul>
      )}

      {department.gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 border-t">
          {department.gallery.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video overflow-hidden bg-muted"
            >
              <Image
                src={image.url}
                alt={locale === "pt" ? image.alt.pt : image.alt.en}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 200px"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
