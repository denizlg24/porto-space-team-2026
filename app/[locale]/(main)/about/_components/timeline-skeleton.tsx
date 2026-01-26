import { Skeleton } from "@/components/ui/skeleton";

export function TimelineSkeleton() {
  return (
    <section className="w-full max-w-5xl mx-auto py-12">
      <Skeleton className="h-3 w-24 mb-4" />
      <Skeleton className="h-8 w-32 mb-12" />
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-border hidden md:block" />
        <div className="space-y-12 md:space-y-16">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-muted border-4 border-background z-10 hidden md:block" />
              <div className="flex-1 w-full md:w-auto">
                <div className="relative w-full mx-auto max-w-lg h-fit">
                  <div className="absolute -inset-3 border border-muted/20 pointer-events-none" />
                  <Skeleton className="aspect-video w-full" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left space-y-3">
                <Skeleton className="h-6 w-16 mx-auto md:mx-0" />
                <Skeleton className="h-6 w-48 mx-auto md:mx-0" />
                <Skeleton className="h-4 w-64 mx-auto md:mx-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
