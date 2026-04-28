"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormField } from "@/components/forms/form-field";
import { updateProfileAction } from "@/app/dashboard/settings/actions";

type Props = { firstName: string; lastName: string; email: string };

export function ProfileForm({ firstName, lastName, email }: Props) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateProfileAction(formData);
      if (result.error) toast.error(result.error);
      else toast.success("Profile updated.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="firstName" name="firstName" label="First name" defaultValue={firstName} required />
        <FormField id="lastName" name="lastName" label="Last name" defaultValue={lastName} required />
      </div>
      <FormField id="email" name="email" label="Email" type="email" defaultValue={email} disabled />
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={pending} className="gap-1.5 min-w-24">
          {pending && <Spinner size="xs" />}
          Save changes
        </Button>
      </div>
    </form>
  );
}
