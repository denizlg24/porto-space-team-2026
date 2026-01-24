import { Skeleton } from "@/components/ui/skeleton";

export function SponsorsDisplaySkeleton() {
  return (
    <div className="space-y-16">
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-6">
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex justify-center gap-8">
            {[0, 1, 2].map((j) => (
              <Skeleton
                key={j}
                className="rounded-lg"
                style={{
                  width: `${180 - i * 30}px`,
                  height: `${120 - i * 20}px`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
