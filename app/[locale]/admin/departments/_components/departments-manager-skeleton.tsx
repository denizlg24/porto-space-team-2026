import { Skeleton } from "@/components/ui/skeleton";

export function DepartmentsManagerSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-1 h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>
      <Skeleton className="h-4 w-64" />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4" />
              <div className="flex-1 flex items-center gap-4">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
