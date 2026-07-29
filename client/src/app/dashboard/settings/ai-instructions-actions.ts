"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { forwardSetCookies } from "@/lib/server-actions/forward-set-cookie";
import {
  readBrandKit, readReferenceAccounts, str,
} from "./ai-instructions-form-data";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type ActionResult = { error?: string; success?: boolean };

export async function savePlatformInstructionsAction(
  platform: string,
  formData: FormData,
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const body = {
    whoIAm: str(formData, "whoIAm"),
    whatIDo: str(formData, "whatIDo"),
    goals: str(formData, "goals"),
    interests: str(formData, "interests"),
    postTypes: str(formData, "postTypes"),
    tone: str(formData, "tone"),
    visualStyle: str(formData, "visualStyle"),
    extraNotes: str(formData, "extraNotes"),
    brandKit: readBrandKit(formData),
    referenceAccounts: readReferenceAccounts(formData),
  };
  const res = await fetch(`${API_BASE}/api/users/me/platform-instructions/${platform}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  await forwardSetCookies(res);
  if (res.ok) {
    revalidatePath("/dashboard/settings");
    return { success: true };
  }
  const json = (await res.json().catch(() => ({}))) as { error?: string };
  return { error: json.error ?? "Request failed." };
}
