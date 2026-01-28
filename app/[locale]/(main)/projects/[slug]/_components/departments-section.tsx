"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectData } from "@/lib/actions/projects";
import { DepartmentCard } from "./department-card";

type Props = {
  project: ProjectData;
  locale: string;
  sectionLabel: string;
  sectionTitle: string;
};

export function DepartmentsSection({
  project,
  locale,
  sectionLabel,
  sectionTitle,
}: Props) {
  const { departments, projectImage, projectImageAlt } = project;
  const [activeDepartmentId, setActiveDepartmentId] = useState<string | null>(
    departments[0]?.id || null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (departments.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-department-id");
          if (id) setActiveDepartmentId(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const departmentElements = document.querySelectorAll("[data-department-id]");
    departmentElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [departments]);

  const scrollToDepartment = (departmentId: string) => {
    const element = document.getElementById(`department-${departmentId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (departments.length === 0) return null;

  const imageAlt =
    locale === "pt" ? projectImageAlt.pt : projectImageAlt.en;

  return (
    <section className="w-full max-w-7xl mx-auto py-12">
      <div className="text-center mb-12 px-4">
        <h2 className="text-xs text-primary mb-4">{sectionLabel}</h2>
        <h3 className="text-3xl font-bold">{sectionTitle}</h3>
      </div>

      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row gap-8 lg:gap-12"
      >
        {projectImage && (
          <div className="lg:w-1/3 lg:sticky lg:top-48 lg:self-start">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 border border-primary/20 pointer-events-none" />
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />

              <div className="relative aspect-3/4 bg-muted">
                <Image
                  src={projectImage}
                  alt={imageAlt || "Project"}
                  fill
                  className="object-contain scale-95"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              </div>

              <nav className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full hidden lg:flex flex-col gap-2 pl-4">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => scrollToDepartment(dept.id)}
                    className={cn(
                      "w-3 h-8 transition-all duration-300 border",
                      activeDepartmentId === dept.id
                        ? "bg-primary border-primary w-4"
                        : "bg-transparent border-primary/50 hover:border-primary hover:bg-primary/20"
                    )}
                    aria-label={locale === "pt" ? dept.title.pt : dept.title.en}
                    title={locale === "pt" ? dept.title.pt : dept.title.en}
                  />
                ))}
              </nav>
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col gap-8 px-4 lg:px-0",
            projectImage ? "lg:w-2/3" : "w-full max-w-3xl mx-auto"
          )}
        >
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              locale={locale}
              isActive={activeDepartmentId === department.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
