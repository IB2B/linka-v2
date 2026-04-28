"use client";

import { useRef, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PasswordField } from "@/components/forms/password-field";
import { changePasswordAction } from "@/app/dashboard/settings/actions";

export function PasswordForm() {
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await changePasswordAction(formData);
      if (result.error) toast.error(result.error);
      else {
        toast.success("Password changed.");
        formRef.current?.reset();
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <PasswordField id="currentPassword" name="currentPassword" label="Current password" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <PasswordField id="newPassword" name="newPassword" label="New password" required />
        <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm new password" required />
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={pending} className="gap-1.5 min-w-32">
          {pending && <Spinner size="xs" />}
          Update password
        </Button>
      </div>
    </form>
  );
}
