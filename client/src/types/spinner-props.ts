import type { ComponentProps } from "react";

export type SpinnerProps = ComponentProps<"svg"> & {
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
};
