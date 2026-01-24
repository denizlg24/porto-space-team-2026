import { Skeleton } from "@/components/ui/skeleton";

export function SponsorsManagerSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>
      <Skeleton className="h-10 w-64" />
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-8" />
            </div>
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-12 w-12 rounded" />
              <Skeleton className="h-12 w-12 rounded" />
              <Skeleton className="h-12 w-12 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
