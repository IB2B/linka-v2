"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormField } from "@/components/forms/form-field";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { updateWorkProfileAction } from "@/app/dashboard/settings/actions";
import { INDUSTRIES } from "@/lib/industries";

type Props = {
  jobTitle: string;
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
      <FormField id="jobTitle" name="jobTitle" label="Job title" defaultValue={props.jobTitle} placeholder="Product Manager" />
      <div className="space-y-1.5">
        <Label htmlFor="industry">Industry</Label>
        <Select name="industry" defaultValue={props.industry || undefined}>
          <SelectTrigger id="industry" className="w-full">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map((ind) => (
              <SelectItem key={ind} value={ind}>{ind}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
