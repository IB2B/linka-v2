"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { forwardSetCookies } from "@/lib/server-actions/forward-set-cookie";
import { PLATFORMS } from "@/lib/content/platforms";
import { GLOBAL_PLATFORM } from "@/lib/content/platform-instructions.types";
import { buildInstructionsBody } from "./ai-instructions-form-data";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type ActionResult = { error?: string; success?: boolean };

async function patchInstructions(platform: string, body: Record<string, unknown>) {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${API_BASE}/api/users/me/platform-instructions/${platform}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  await forwardSetCookies(res);
  if (res.ok) return null;
  const json = (await res.json().catch(() => ({}))) as { error?: string };
  return json.error ?? "Request failed.";
}

export async function savePlatformInstructionsAction(
  platform: string,
  formData: FormData,
): Promise<ActionResult> {
  // The argument comes from the browser: only known platforms go into the API path.
  const known = platform === GLOBAL_PLATFORM || PLATFORMS.some((p) => p.value === platform);
  if (!known) return { error: "Unknown platform." };
  const error = await patchInstructions(platform, buildInstructionsBody(formData));
  if (error) return { error };
  revalidatePath("/dashboard/settings");
  return { success: true };
}

// Copies one platform's answers to every platform in parallel.
export async function saveInstructionsToAllAction(formData: FormData): Promise<ActionResult> {
  const body = buildInstructionsBody(formData);
  const errors = await Promise.all(PLATFORMS.map((p) => patchInstructions(p.value, body)));
  revalidatePath("/dashboard/settings");
  const error = errors.find(Boolean);
  return error ? { error } : { success: true };
}
