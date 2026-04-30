import { Skeleton } from "@/components/ui/skeleton";

type Props = { titleW?: string; descW?: string };

export function PageSkeletonHeader({ titleW = "w-40", descW = "w-80" }: Props) {
  return (
    <>
      <Skeleton className={`h-8 ${titleW}`} />
      <Skeleton className={`h-4 ${descW}`} />
    </>
  );
}
