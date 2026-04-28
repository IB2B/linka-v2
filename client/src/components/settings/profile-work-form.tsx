"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormField } from "@/components/forms/form-field";
import { updateWorkProfileAction } from "@/app/dashboard/settings/actions";
import { INDUSTRIES } from "@/lib/industries";

type Props = {
  jobTitle: string;
  companyName: string;
  industry: string;
  headline: string;
};

export function ProfileWorkForm(props: Props) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateWorkProfileAction(formData);
      if (result.error) toast.error(result.error);
      else toast.success("Work profile updated.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="jobTitle" name="jobTitle" label="Job title" defaultValue={props.jobTitle} placeholder="Product Manager" />
        <FormField id="companyName" name="companyName" label="Company" defaultValue={props.companyName} placeholder="Acme Inc." />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="industry" className="text-sm font-medium">Industry</label>
        <select
          id="industry"
          name="industry"
          defaultValue={props.industry}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select an industry</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>
      <FormField id="headline" name="headline" label="Headline" defaultValue={props.headline} placeholder="Building products people love" maxLength={300} />
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={pending} className="gap-1.5 min-w-24">
          {pending && <Spinner size="xs" />}
          Save changes
        </Button>
      </div>
    </form>
  );
}
