"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { PillGroup } from "./pill-group";
import { saveCompanyAction, skipStepAction } from "@/app/onboarding/actions";
import { NICHES, CONTENT_GOALS, BRAND_TONES, AUDIENCES } from "./company-data";

export function CompanyForm() {
  const router = useRouter();
  const [niche, setNiche] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("");
  const [audience, setAudience] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const r = await saveCompanyAction({
      industry: niche || undefined,
      contentGoal: goal || undefined,
      brandTone: tone || undefined,
      targetAudience: audience || undefined,
    });
    setPending(false);
    if (r.error) { toast.error(r.error); return; }
    router.push("/onboarding/connect");
  }

  async function handleSkip() {
    await skipStepAction(2);
    router.push("/onboarding/connect");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">What do you post about?</p>
        <Select value={niche} onValueChange={(v) => setNiche(v ?? "")}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Pick your niche" /></SelectTrigger>
          <SelectContent>
            {NICHES.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <PillGroup label="What's your main goal?" options={CONTENT_GOALS} value={goal} onChange={setGoal} />
      <PillGroup label="What tone fits your brand?" options={BRAND_TONES} value={tone} onChange={setTone} />
      <PillGroup label="Who are you creating for?" options={AUDIENCES} value={audience} onChange={setAudience} />

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={handleSkip} disabled={pending}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50">
          Skip for now
        </button>
        <Button type="submit" size="sm" disabled={pending}>
          {pending && <Spinner size="xs" />} Continue
        </Button>
      </div>
    </form>
  );
}
