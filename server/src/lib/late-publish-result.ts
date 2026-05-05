import type { LatePublishResult } from "./late-client";
import type { PlatformEntry } from "./late-accounts";

export type PublishOutcome = {
  publishedTo: string[];
  failed: { platform: string; error: string | null }[];
};

export function partitionPublishResult(
  result: LatePublishResult, entries: PlatformEntry[],
): PublishOutcome {
  const isFailure = (s: string) => s === "failed" || s === "error";
  const failed = result.results
    .filter((r) => isFailure(r.status))
    .map((r) => ({ platform: r.platform, error: r.error }));
  const publishedTo = result.results.length === 0
    ? entries.map((e) => e.platform)
    : result.results.filter((r) => !isFailure(r.status)).map((r) => r.platform);
  return { publishedTo, failed };
}
