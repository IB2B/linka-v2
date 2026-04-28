"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { FormSubmitButtonProps } from "@/types/form-submit-button-props";

export function FormSubmitButton({
  label,
  pending: pendingProp,
}: FormSubmitButtonProps) {
  const status = useFormStatus();
  const pending = pendingProp ?? status.pending;
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Spinner aria-hidden /> : null}
      {label}
    </Button>
  );
}
