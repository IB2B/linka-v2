import { PageSkeletonHeader } from "@/components/dashboard/page-skeleton-header";

export default function InboxLoading() {
  return (
    <>
      <PageSkeletonHeader />
      <div className="h-[calc(100vh-7rem)] animate-pulse rounded-xl border bg-card" />
    </>
  );
}
