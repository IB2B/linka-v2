"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { improvePostAction } from "@/app/dashboard/posts/improve-action";
import { CopyButton } from "./copy-button";

type Props = { postId: string; suggestions: string[]; onApplied: () => void };

// The score's "Try" list, made actionable: pick the fixes you want, add your
// own if you like, and the AI edits the post with exactly those changes.
export function ViralitySuggestions({ postId, suggestions, onApplied }: Props) {
  const router = useRouter();
  const [picked, setPicked] = useState<Set<number>>(() => new Set(suggestions.map((_, i) => i)));
  const [note, setNote] = useState("");
  const [pending, start] = useTransition();
  const chosen = suggestions.filter((_, i) => picked.has(i));
  const canApply = chosen.length > 0 || note.trim().length > 0;
  const label = chosen.length === 0 ? "Apply my note to post"
    : `Apply ${chosen.length} ${chosen.length === 1 ? "change" : "changes"} to post`;

  function toggle(i: number, on: boolean) {
    setPicked((s) => { const n = new Set(s); if (on) n.add(i); else n.delete(i); return n; });
  }

  function apply() {
    start(async () => {
      const res = await improvePostAction(postId, chosen, note);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Post updated. Re-scoring…");
      setNote("");
      router.refresh();
      onApplied();
    });
  }

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-medium text-muted-foreground">Try</p>
      <ul className="space-y-1.5">
        {suggestions.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            <Checkbox className="mt-0.5" checked={picked.has(i)} disabled={pending}
              onCheckedChange={(v) => toggle(i, v === true)} aria-label={`Apply: ${s}`} />
            <span className="flex-1 text-xs leading-relaxed text-foreground/80">{s}</span>
            <CopyButton value={s} label="Copy suggestion" />
          </li>
        ))}
      </ul>
      <Textarea rows={2} value={note} disabled={pending} onChange={(e) => setNote(e.target.value)}
        className="text-xs" placeholder="Anything else to change? (optional)" maxLength={500} />
      <Button size="sm" className="w-full" disabled={!canApply || pending} onClick={apply}>
        {pending ? <Spinner aria-hidden /> : <Wand2 />}
        {pending ? "Applying…" : label}
      </Button>
    </div>
  );
}
