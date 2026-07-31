import { LateApiError, lateFetch } from "./late-api";

// Asking for a platform's OAuth screen. Kept apart from the route so the retry
// path can call it twice without duplicating the query-string assembly.
export async function lateConnectUrl(
  platform: string, profileId: string, redirect: string,
): Promise<string> {
  const qs = new URLSearchParams({ profileId, redirect_url: redirect });
  const data = await lateFetch<{ authUrl?: string }>(
    `/connect/${platform}?${qs.toString()}`,
  );
  // A 200 with no authUrl used to reach the browser as `redirect(undefined)`,
  // which throws during the render and shows the bare error boundary.
  if (!data.authUrl) throw new LateApiError(502, "Late API: no authUrl in response");
  return data.authUrl;
}

// A stored profile id can outlive the profile it names — the workspace gets
// pruned, or the API key is swapped for one from a different workspace. Both
// answer /connect with 404 Profile not found, and both look like "it works on my
// machine" because the local row points at a profile that still exists.
export function isProfileMissing(err: unknown): boolean {
  return err instanceof LateApiError
    && err.status === 404
    && /profile not found/i.test(err.message);
}
