import { Skeleton } from "@/components/ui/skeleton";
import { PageSkeletonHeader } from "@/components/dashboard/page-skeleton-header";

export default function Loading() {
  return (
    <div className="space-y-6">
      <PageSkeletonHeader titleW="w-48" descW="w-72" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-md" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-md" />
    </div>
  );
}
