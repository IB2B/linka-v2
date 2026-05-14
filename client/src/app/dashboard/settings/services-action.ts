"use server";

import { cookies } from "next/headers";

export type ServiceStatus = "ok" | "degraded" | "down" | "unconfigured";

export type ServicesStatusResult = {
  openai: ServiceStatus;
  openaiImage: ServiceStatus;
  anthropic: ServiceStatus;
  gemini: ServiceStatus;
  imagine: ServiceStatus;
  lateApi: ServiceStatus;
  tavily: ServiceStatus;
};

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

export async function getServicesStatusAction(): Promise<
  ServicesStatusResult | { error: string }
> {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_BASE}/api/services/status`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
    if (!res.ok) return { error: "Failed to fetch service status." };
    return res.json() as Promise<ServicesStatusResult>;
  } catch {
    return { error: "Could not reach server." };
  }
}
