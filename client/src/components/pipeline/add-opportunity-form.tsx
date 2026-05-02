"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { OpportunityPlatform, Stage } from "@/types/pipeline";
import { createOpportunityAction } from "@/app/dashboard/pipeline/actions";

const PLATFORMS: OpportunityPlatform[] = [
  "linkedin", "x", "instagram", "threads", "facebook", "tiktok",
];

type Props = { stages: Stage[]; onSaved: () => void };

const inputCls =
  "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40";

export function AddOpportunityForm({ stages, onSaved }: Props) {
  const [pending, start] = useTransition();
  const [stageId, setStageId] = useState(stages[0]?.id ?? "");
  const [platform, setPlatform] = useState<OpportunityPlatform | "">("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = String(data.get("title") ?? "").trim();
    if (!title) { toast.error("Title is required."); return; }
    start(async () => {
      const res = await createOpportunityAction({
        title, stageId,
        contactName: String(data.get("contactName") ?? "").trim() || null,
        contactHandle: String(data.get("contactHandle") ?? "").trim() || null,
        sourcePlatform: platform || null,
        notes: String(data.get("notes") ?? "").trim() || null,
      });
      if ("error" in res) toast.error(res.error);
      else { toast.success("Opportunity added."); onSaved(); }
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <input name="title" required maxLength={255} placeholder="Title (e.g. Sponsorship — running gear brand)"
        className={inputCls} autoFocus />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="contactName" maxLength={160} placeholder="Contact name" className={inputCls} />
        <input name="contactHandle" maxLength={160} placeholder="@handle" className={inputCls} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <select value={stageId} onChange={(e) => setStageId(e.target.value)} className={inputCls}>
          {stages.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={platform}
          onChange={(e) => setPlatform(e.target.value as OpportunityPlatform | "")} className={inputCls}>
          <option value="">No platform</option>
          {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <textarea name="notes" maxLength={5000} rows={3} placeholder="Notes (optional)" className={inputCls} />
      <div className="flex justify-end gap-2 pt-1">
        <Button type="submit" disabled={pending}>
          {pending ? <Spinner aria-hidden /> : null}
          Add opportunity
        </Button>
      </div>
    </form>
  );
}
