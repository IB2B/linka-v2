"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { OpportunityPlatform, Stage } from "@/types/pipeline";
import { createOpportunityAction } from "@/app/dashboard/pipeline/actions";
import { OppFormFields } from "./opp-form-fields";
import { buildOppInput } from "./build-opp-input";

type Props = { stages: Stage[]; onSaved: () => void };

export function AddOpportunityForm({ stages, onSaved }: Props) {
  const [pending, start] = useTransition();
  const [stageId, setStageId] = useState(stages[0]?.id ?? "");
  const [platform, setPlatform] = useState<OpportunityPlatform | "">("");
  const [closeDate, setCloseDate] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = buildOppInput(new FormData(e.currentTarget), { stageId, platform, closeDate });
    if (!input.title) { toast.error("Title is required."); return; }
    start(async () => {
      const res = await createOpportunityAction(input);
      if ("error" in res) toast.error(res.error);
      else { toast.success("Opportunity added."); onSaved(); }
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <OppFormFields
        stages={stages}
        stageId={stageId} onStage={setStageId}
        platform={platform} onPlatform={setPlatform}
        closeDate={closeDate} onClose={setCloseDate}
      />
      <div className="flex justify-end gap-2 pt-1">
        <Button type="submit" disabled={pending}>
          {pending ? <Spinner aria-hidden /> : null}
          Add opportunity
        </Button>
      </div>
    </form>
  );
}
