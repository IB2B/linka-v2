import type { PublishOutcome } from "./late-publish-result";
import type { PublishOutcomeRow } from "../models/posting-history.model";

export function publishOutcomeToRows(o: PublishOutcome): PublishOutcomeRow[] {
  return [
    ...o.publishedTo.map((p) => ({ platform: p, status: "posted" as const })),
    ...o.failed.map((f) => ({
      platform: f.platform, status: "failed" as const, error: f.error,
    })),
  ];
}
