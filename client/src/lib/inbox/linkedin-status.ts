import { inboxFetch } from "./inbox-fetch";

export type LinkedinStatus = { connected: boolean; email: string | null };

export async function getLinkedinStatus(): Promise<LinkedinStatus> {
  const r = await inboxFetch<LinkedinStatus>("/api/linkedin/status");
  return r.ok ? r.data : { connected: false, email: null };
}
