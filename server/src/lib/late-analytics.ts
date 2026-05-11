import { lateFetch, LateApiError } from "./late-api";
import { toPlatforms, aggregateFromPlatforms } from "./late-analytics-map";
import { enrichPendingFromComments } from "./late-analytics-enrich";
import { getCached, setCached } from "./late-analytics-cache";
import * as snapshots from "../models/post-metric-snapshot.model";
import type { PostAnalyticsResult } from "../types/analytics";

type LateAnalyticsResponse = { analytics?: unknown; platformAnalytics?: unknown };

const SNAPSHOT_COOLDOWN_SEC = 300;

async function fetchFresh(latePostId: string): Promise<PostAnalyticsResult> {
  try {
    const r = await lateFetch<LateAnalyticsResponse>(
      `/analytics?postId=${encodeURIComponent(latePostId)}`,
    );
    const rawPlatforms = toPlatforms(r.platformAnalytics);
    const platforms = await enrichPendingFromComments(latePostId, rawPlatforms);
    return {
      state: "ok",
      totals: aggregateFromPlatforms(platforms),
      platforms,
    };
  } catch (e) {
    if (e instanceof LateApiError) {
      if (e.status === 402) return { state: "addon-required" };
      if (e.status === 404) return { state: "unposted" };
    }
    throw e;
  }
}

export async function fetchPostAnalytics(
  latePostId: string,
): Promise<PostAnalyticsResult> {
  const cached = getCached(latePostId);
  if (cached) return cached;
  const result = await fetchFresh(latePostId);
  setCached(latePostId, result);
  return result;
}

export async function fetchAndSnapshotAnalytics(
  latePostId: string, postId: string, userId: string,
): Promise<PostAnalyticsResult> {
  const result = await fetchPostAnalytics(latePostId);
  if (result.state === "ok") {
    const age = await snapshots.lastSnapshotAgeSec(postId);
    if (age === null || age >= SNAPSHOT_COOLDOWN_SEC) {
      await snapshots.insertSnapshot(postId, userId, result.totals)
        .catch((e) => console.error("[snapshot]", e));
    }
  }
  return result;
}
