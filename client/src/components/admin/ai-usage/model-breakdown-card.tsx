import { Card } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import type { CountRow } from "@/types/admin-ai-usage";

const fmt = new Intl.NumberFormat("en-US");

const MODEL_LABELS: Record<string, string> = {
  "claude-haiku-4-5-20251001": "Haiku 4.5",
  "claude-sonnet-4-6": "Sonnet 4.6",
  "claude-opus-4-7": "Opus 4.7",
  "dall-e-3": "DALL·E 3",
  "gpt-image-1": "gpt-image-1",
  unknown: "Pre-tracking",
};

function label(key: string) {
  return MODEL_LABELS[key] ?? key;
}

function isImage(key: string): boolean {
  return key.startsWith("dall-e") || key.startsWith("gpt-image") ||
    key.startsWith("imagen") || key.startsWith("midjourney");
}

export function ModelBreakdownCard({ rows }: { rows: CountRow[] }) {
  const total = rows.reduce((a, r) => a + r.count, 0);
  return (
    <Card size="sm" className="gap-0 p-0 transition hover:ring-foreground/20">
      <div className="flex items-center gap-2 border-b px-5 py-3">
        <Cpu className="size-3.5 text-muted-foreground" />
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Models used
        </h3>
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm tracking-tight text-muted-foreground">
          No model data yet.
        </div>
      ) : (
        <ul className="space-y-2.5 px-5 py-4">
          {rows.map((r) => {
            const pct = total === 0 ? 0 : Math.round((r.count / total) * 100);
            const img = isImage(r.key);
            return (
              <li key={r.key} className="space-y-1">
                <div className="flex items-baseline justify-between gap-2 text-xs tracking-tight">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span
                      className={`inline-flex h-[16px] items-center rounded px-1 text-[9px] font-medium uppercase tracking-wider ${
                        img
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          : "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                      }`}
                    >
                      {img ? "Image" : "Text"}
                    </span>
                    {label(r.key)}
                  </span>
                  <span className="text-muted-foreground tabular-nums">
                    {fmt.format(r.count)} · {pct}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className={`block h-full ${img ? "bg-rose-500" : "bg-violet-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
