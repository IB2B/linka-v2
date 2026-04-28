import type { ComponentProps, ReactNode } from "react";

import type { Input } from "@/components/ui/input";

export type PasswordFieldProps = Omit<ComponentProps<typeof Input>, "type"> & {
  label: string;
  labelAction?: ReactNode;
};
