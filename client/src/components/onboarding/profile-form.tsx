"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { saveProfileAction, skipStepAction } from "@/app/onboarding/actions";

type Defaults = { firstName: string; lastName: string; jobTitle: string; industry: string };

export function ProfileForm({ defaultValues }: { defaultValues: Defaults }) {
  const router = useRouter();
  const [values, setValues] = useState(defaultValues);
  const [pending, setPending] = useState(false);

  const set = (k: keyof Defaults) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const r = await saveProfileAction(values);
    setPending(false);
    if (r.error) { toast.error(r.error); return; }
    router.push("/onboarding/company");
  }

  async function handleSkip() {
    await skipStepAction(2);
    router.push("/onboarding/company");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField id="firstName" label="First name" value={values.firstName} onChange={set("firstName")} />
        <FormField id="lastName" label="Last name" value={values.lastName} onChange={set("lastName")} />
      </div>
      <FormField id="jobTitle" label="Job title"
        placeholder="e.g. Founder, Product Manager, Designer"
        value={values.jobTitle} onChange={set("jobTitle")} />
      <FormField id="industry" label="Industry"
        placeholder="e.g. SaaS, Design, Marketing"
        value={values.industry} onChange={set("industry")} />
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleSkip}
          disabled={pending}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          Skip for now
        </button>
        <Button type="submit" size="sm" disabled={pending}>
          {pending && <Spinner size="xs" />} Continue
        </Button>
      </div>
    </form>
  );
}
