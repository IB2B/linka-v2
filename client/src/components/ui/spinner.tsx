import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SpinnerProps } from "@/types/spinner-props";

const SIZE_CLASS = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;

export function Spinner({
  size = "md",
  label = "Loading",
  className,
  ...props
}: SpinnerProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label={label}
      className={cn("animate-spin", SIZE_CLASS[size], className)}
      {...props}
    />
  );
}
