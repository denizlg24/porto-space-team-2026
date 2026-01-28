import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ProjectsGridSkeleton } from "./_components/projects-grid-skeleton";

export default function ProjectsLoading() {
  return (
    <main className="flex flex-col gap-12 min-h-screen items-center px-4 md:pt-32 sm:pt-28 pt-16">
      <section className="w-full relative max-w-5xl mx-auto text-center py-12">
        <Skeleton className="h-4 w-24 mx-auto mb-4" />
        <Skeleton className="h-12 w-80 mx-auto mb-6" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </section>

      <Separator className="max-w-5xl" />

      <section className="w-full max-w-5xl mx-auto py-12">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-8 w-64 mb-8" />
        <ProjectsGridSkeleton />
      </section>
    </main>
  );
}
