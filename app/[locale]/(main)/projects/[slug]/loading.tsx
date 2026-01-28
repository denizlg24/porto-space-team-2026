import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ProjectDetailLoading() {
  return (
    <main className="flex flex-col gap-8 min-h-screen items-center px-4 md:pt-32 sm:pt-28 pt-16 pb-16">
      <div className="w-full max-w-5xl">
        <Skeleton className="h-5 w-32" />
      </div>

      <section className="w-full max-w-5xl mx-auto text-center py-8">
        <Skeleton className="h-24 w-24 mx-auto mb-6 rounded-lg" />
        <Skeleton className="h-10 w-64 mx-auto mb-6" />
        <div className="space-y-3 max-w-2xl mx-auto">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4 mx-auto" />
        </div>
      </section>

      <Separator className="max-w-5xl" />

      <section className="w-full max-w-5xl mx-auto py-8">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-10 w-20 mx-auto mb-2" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </section>

      <Separator className="max-w-5xl" />

      <section className="w-full max-w-5xl mx-auto py-8">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-56 mb-8" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <Skeleton className="aspect-3/4 w-full max-w-xs mx-auto rounded-lg" />
          </div>

          <div className="lg:w-2/3 space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-6 border rounded-lg">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl" />

      <section className="w-full max-w-5xl mx-auto py-8">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="flex gap-4 overflow-hidden">
          <Skeleton className="aspect-video w-full max-w-2xl shrink-0 rounded-lg" />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-2 w-2 rounded-full" />
          ))}
        </div>
      </section>
    </main>
  );
}
