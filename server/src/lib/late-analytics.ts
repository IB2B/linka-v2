import { lateFetch, LateApiError } from "./late-api";
import { toPlatforms, aggregateFromPlatforms } from "./late-analytics-map";
import { enrichPendingFromComments } from "./late-analytics-enrich";
import { getCached, setCached } from "./late-analytics-cache";
import * as snapshots from "../models/post-metric-snapshot.model";
import type { PostAnalyticsResult } from "../types/analytics";

type LateAnalyticsResponse = {
  analytics?: unknown;
  platformAnalytics?: unknown;
  lastUpdated?: unknown;
};

function pickLastUpdated(v: unknown): string | null {
  return typeof v === "string" ? v : null;
}

const SNAPSHOT_COOLDOWN_SEC = 300;

async function fetchFresh(
  latePostId: string, allowed: string[] | null,
): Promise<PostAnalyticsResult> {
  try {
    const r = await lateFetch<LateAnalyticsResponse>(
      `/analytics?postId=${encodeURIComponent(latePostId)}`,
    );
    const rawAll = toPlatforms(r.platformAnalytics);
    const rawPlatforms = allowed
      ? rawAll.filter((p) => allowed.includes(p.platform))
      : rawAll;
    const platforms = await enrichPendingFromComments(latePostId, rawPlatforms);
    const totals = aggregateFromPlatforms(platforms);
    const noSyncedPlatforms = rawPlatforms
      .filter((p) => p.status !== "failed")
      .every((p) => p.status === "pending");
    if (rawPlatforms.length > 0 && noSyncedPlatforms) return { state: "syncing" };
    return { state: "ok", totals, platforms, lastUpdated: pickLastUpdated(r.lastUpdated) };
  } catch (e) {
    if (e instanceof LateApiError) {
      if (e.status === 402) return { state: "addon-required" };
      if (e.status === 404) return { state: "unposted" };
    }
    throw e;
  }
}

export async function fetchPostAnalytics(
  latePostId: string, allowed: string[] | null = null, force = false,
): Promise<PostAnalyticsResult> {
  const cacheKey = allowed ? `${latePostId}|${allowed.join(",")}` : latePostId;
  if (!force) {
    const cached = getCached(cacheKey);
    if (cached) return cached;
  }
  const result = await fetchFresh(latePostId, allowed);
  setCached(cacheKey, result);
  return result;
}

export async function fetchAndSnapshotAnalytics(
  latePostId: string, postId: string, userId: string,
  allowed: string[] | null = null, force = false,
): Promise<PostAnalyticsResult> {
  const result = await fetchPostAnalytics(latePostId, allowed, force);
  if (result.state === "ok") {
    const age = await snapshots.lastSnapshotAgeSec(postId);
    if (age === null || age >= SNAPSHOT_COOLDOWN_SEC) {
      await snapshots.insertSnapshot(postId, userId, result.totals)
        .catch((e) => console.error("[snapshot]", e));
    }
  }
  return result;
}
