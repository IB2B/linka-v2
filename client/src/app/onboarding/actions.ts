"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type Result = { ok?: boolean; error?: string };

async function call(path: string, method: string, body: unknown): Promise<Response> {
  const cs = await cookies();
  const cookie = cs.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  return fetch(`${API_BASE}${path}`, {
    method, body: JSON.stringify(body), cache: "no-store",
    headers: { "Content-Type": "application/json", cookie },
  });
}

async function advance(data: { step?: number; completed?: boolean }): Promise<Result> {
  const res = await call("/api/users/me/onboarding", "PATCH", data);
  if (!res.ok) return { error: "Failed to update." };
  return { ok: true };
}

export async function saveProfileAction(data: {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  industry?: string;
}): Promise<Result> {
  const [a, b] = await Promise.all([
    call("/api/users/me", "PATCH", { firstName: data.firstName, lastName: data.lastName }),
    call("/api/users/me/profile", "PATCH", { industry: data.industry, jobTitle: data.jobTitle }),
  ]);
  if (!a.ok || !b.ok) return { error: "Failed to save profile." };
  return advance({ step: 2 });
}

export async function saveCompanyAction(data: {
  companyType?: string;
  companySize?: string;
  fundingAmount?: string;
  industry?: string;
}): Promise<Result> {
  const res = await call("/api/users/me/profile", "PATCH", data);
  if (!res.ok) return { error: "Failed to save company info." };
  return advance({ step: 2 });
}

export async function saveStyleAction(content: string): Promise<Result> {
  const res = await call("/api/voice-lab/samples", "POST", {
    title: "Onboarding sample", content, source: "other",
  });
  if (!res.ok) return { error: "Failed to save sample." };
  return advance({ step: 4 });
}

export async function skipStepAction(step: number): Promise<Result> {
  return advance({ step });
}

export async function finishOnboardingAction(): Promise<Result> {
  const r = await advance({ step: 4, completed: true });
  if (r.ok) revalidatePath("/dashboard");
  return r;
}
