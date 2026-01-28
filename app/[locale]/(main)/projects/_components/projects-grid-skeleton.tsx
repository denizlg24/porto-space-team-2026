import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-4">
            <Skeleton className="h-24 w-24 mx-auto mb-4 rounded-lg" />
            <Skeleton className="h-6 w-32 mx-auto" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5 mx-auto" />
              <Skeleton className="h-4 w-3/5 mx-auto" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
