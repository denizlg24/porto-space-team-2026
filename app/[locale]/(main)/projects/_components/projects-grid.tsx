import { getPublicProjects } from "@/lib/actions/projects";
import { ProjectCard } from "./project-card";

type Props = {
  locale: string;
  emptyMessage: string;
  learnMoreText: string;
};

export async function ProjectsGrid({ locale, emptyMessage, learnMoreText }: Props) {
  const projects = await getPublicProjects();

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-12 py-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          locale={locale}
          learnMoreText={learnMoreText}
        />
      ))}
    </div>
  );
}
