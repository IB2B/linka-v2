"use server";

import { serverFetch } from "@/lib/server-fetch";

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

export async function getServicesStatusAction(): Promise<
  ServicesStatusResult | { error: string }
> {
  try {
    const res = await serverFetch("/api/services/status");
    if (!res.ok) return { error: "Failed to fetch service status." };
    return res.json() as Promise<ServicesStatusResult>;
  } catch {
    return { error: "Could not reach server." };
  }
}
