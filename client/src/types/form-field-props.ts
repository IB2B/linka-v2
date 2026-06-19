import type * as React from "react";

import type { Input } from "@/components/ui/input";

export type FormFieldProps = React.ComponentProps<typeof Input> & {
  label: React.ReactNode;
  labelAction?: React.ReactNode;
};
