"use server";

import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      cookie: cookieStore.toString(),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
}

export async function getPipelinesAction(): Promise<
  { pipelines: { id: string; name: string; stages: { id: string; name: string }[] }[] } | { error: string }
> {
  const res = await api("/api/pipelines");
  const body = await res.json().catch(() => ({}));
  if (!res.ok) return { error: body.error ?? "Failed to load pipelines." };
  const pipelines = await Promise.all(
    (body.pipelines ?? []).map(async (p: { id: string; name: string }) => {
      const sr = await api(`/api/pipelines?pipelineId=${p.id}`);
      const sb = await sr.json().catch(() => ({}));
      return { id: p.id, name: p.name, stages: (sb.stages ?? []).map((s: any) => ({ id: s.id, name: s.name })) };
    }),
  );
  return { pipelines };
}

export async function addToPipelineAction(
  stageId: string,
  contact: { name: string; handle: string | null; platform: string },
): Promise<{ success: true } | { error: string }> {
  const res = await api("/api/pipelines/opportunities", {
    method: "POST",
    body: JSON.stringify({
      stageId, title: contact.name, contactName: contact.name,
      contactHandle: contact.handle, sourcePlatform: contact.platform,
    }),
  });
  if (!res.ok) { const b = await res.json().catch(() => ({})); return { error: b.error ?? "Failed to add." }; }
  return { success: true };
}

export async function summarizeAction(
  conversationId: string, accountId: string | null,
): Promise<{ summary: string } | { error: string }> {
  const qs = accountId ? `?accountId=${encodeURIComponent(accountId)}` : "";
  const res = await api(
    `/api/inbox/conversations/${encodeURIComponent(conversationId)}/summarize${qs}`,
    { method: "POST" },
  );
  const body = await res.json().catch(() => ({}));
  if (!res.ok) return { error: body.error ?? "Failed to summarize." };
  return { summary: body.summary ?? "" };
}
