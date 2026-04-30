import { Skeleton } from "@/components/ui/skeleton";
import { PageSkeletonHeader } from "@/components/dashboard/page-skeleton-header";

export default function Loading() {
  return (
    <div className="space-y-4">
      <PageSkeletonHeader titleW="w-48" descW="w-96" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Skeleton className="h-96 xl:col-span-2" />
        <Skeleton className="h-96" />
      </div>
    </div>
  );
}
