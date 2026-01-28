import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getIntlayer } from "intlayer";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/locale/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjectBySlugAdmin } from "@/lib/actions/projects";
import { ProjectContentEditor } from "./_components/project-content-editor";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function ProjectContentEditorSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-10 w-32 ml-auto" />
    </div>
  );
}

async function ProjectContentEditorWrapper({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const content = getIntlayer("admin-project-content-page", locale);
  const result = await getProjectBySlugAdmin(slug);

  if (!result.success) {
    notFound();
  }

  const project = result.data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.backToProjects}
        </Link>
        <h1 className="text-2xl font-bold">
          {content.title}: {project.name.en}
        </h1>
        <p className="text-muted-foreground">{content.description}</p>
      </div>
      <ProjectContentEditor project={project} />
    </div>
  );
}

export default async function ProjectContentPage({ params }: PageProps) {
  const { locale, slug } = await params;

  return (
    <Suspense fallback={<ProjectContentEditorSkeleton />}>
      <ProjectContentEditorWrapper locale={locale} slug={slug} />
    </Suspense>
  );
}
