import { Suspense } from "react";
import { NextPageIntlayer } from "next-intlayer";
import { getIntlayer } from "intlayer";
import { getProjects } from "@/lib/actions/projects";
import { ProjectsManager } from "./_components/projects-manager";
import { ProjectsManagerSkeleton } from "./_components/projects-manager-skeleton";

async function ProjectsContent({ locale }: { locale: string }) {
  const content = getIntlayer("admin-projects-page", locale);
  const result = await getProjects();
  const projects = result.success ? result.data : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      <ProjectsManager initialProjects={projects} />
    </div>
  );
}

const ProjectsPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <Suspense fallback={<ProjectsManagerSkeleton />}>
      <ProjectsContent locale={locale} />
    </Suspense>
  );
};

export default ProjectsPage;
