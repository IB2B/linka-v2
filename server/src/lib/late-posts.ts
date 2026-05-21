import { lateFetch, LateApiError } from "./late-api";

export type LatePostPlatform = {
  platform: string;
  status?: string;
  platformPostUrl?: string | null;
  publishedAt?: string | null;
  postedAt?: string | null;
  url?: string | null;
  error?: string | null;
};

export type LatePostState =
  | { state: "ok"; platforms: LatePostPlatform[]; raw: unknown }
  | { state: "not-found" };

type RawPost = {
  status?: string;
  publishedAt?: string | null;
  platforms?: LatePostPlatform[];
  platformPosts?: LatePostPlatform[];
  results?: LatePostPlatform[];
  platformResults?: LatePostPlatform[];
};
type RawEnvelope = RawPost & { post?: RawPost };

export async function fetchLatePost(latePostId: string): Promise<LatePostState> {
  try {
    const env = await lateFetch<RawEnvelope>(`/posts/${encodeURIComponent(latePostId)}`);
    const r: RawPost = env.post ?? env;
    const platforms = r.platforms ?? r.platformPosts ?? r.platformResults ?? r.results ?? [];
    return { state: "ok", platforms, raw: r };
  } catch (e) {
    if (e instanceof LateApiError && e.status === 404) return { state: "not-found" };
    throw e;
  }
}

const FAILURE = /^(failed|error|cancell?ed|rejected)$/i;
const PENDING = /^(pending|processing|scheduled|queued|waiting)$/i;

export function publishedPlatforms(p: LatePostPlatform[]): LatePostPlatform[] {
  return p.filter((x) => {
    if (x.platformPostUrl || x.url) return true;
    if (x.publishedAt || x.postedAt) return true;
    if (typeof x.status === "string") {
      if (FAILURE.test(x.status) || PENDING.test(x.status)) return false;
      if (x.status.length > 0) return true;
    }
    return false;
  });
}

export function failedPlatforms(p: LatePostPlatform[]): LatePostPlatform[] {
  return p.filter((x) => typeof x.status === "string" && FAILURE.test(x.status));
}
