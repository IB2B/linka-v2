"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrandKitField } from "./brand-kit-field";
import { INSTRUCTION_FIELDS } from "./ai-instruction-fields";
import { savePlatformInstructionsAction } from "@/app/dashboard/settings/ai-instructions-actions";
import type { PlatformInstructions } from "@/lib/content/platform-instructions.types";

type Props = { platform: string; data: PlatformInstructions };

export function AiInstructionsForm({ platform, data }: Props) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await savePlatformInstructionsAction(platform, formData);
      if (result.error) toast.error(result.error);
      else toast.success("Instructions saved.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {INSTRUCTION_FIELDS.map((f) => (
        <div key={f.name} className="space-y-1.5">
          <Label htmlFor={f.name}>{f.label}</Label>
          {f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
          <Textarea
            id={f.name} name={f.name} rows={2}
            defaultValue={data[f.name as keyof PlatformInstructions] as string}
            placeholder={f.placeholder}
          />
          {f.name === "visualStyle" && <BrandKitField kit={data.brandKit} />}
        </div>
      ))}
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={pending} className="gap-1.5 min-w-24">
          {pending && <Spinner size="xs" />}
          Save changes
        </Button>
      </div>
    </form>
  );
}
