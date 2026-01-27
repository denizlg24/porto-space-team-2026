import { Skeleton } from "@/components/ui/skeleton";

export function SectionsSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="aspect-video w-full max-w-3xl mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <Skeleton className="h-10 w-16 mx-auto" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
