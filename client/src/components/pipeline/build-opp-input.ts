import type { CreateOppInput, OpportunityPlatform } from "@/types/pipeline";

const str = (d: FormData, k: string) => String(d.get(k) ?? "").trim() || null;

type Controlled = {
  stageId: string;
  platform: OpportunityPlatform | "";
  closeDate: string;
};

// Merges uncontrolled inputs (FormData) with controlled state. Currency is EUR.
export function buildOppInput(data: FormData, c: Controlled): CreateOppInput {
  const valueRaw = String(data.get("valueAmount") ?? "").trim();
  const valueAmount = valueRaw ? Number(valueRaw) : null;
  return {
    title: String(data.get("title") ?? "").trim(),
    stageId: c.stageId,
    contactName: str(data, "contactName"),
    contactEmail: str(data, "contactEmail"),
    contactPhone: str(data, "contactPhone"),
    companyName: str(data, "companyName"),
    sourcePlatform: c.platform || null,
    valueAmount: valueAmount != null && Number.isFinite(valueAmount) ? valueAmount : null,
    valueCurrency: "EUR",
    expectedClose: c.closeDate || null,
    notes: str(data, "notes"),
    socialUrl: str(data, "socialUrl"),
    facebookUrl: str(data, "facebookUrl"),
    instagramUrl: str(data, "instagramUrl"),
    xUrl: str(data, "xUrl"),
    tiktokUrl: str(data, "tiktokUrl"),
    threadsUrl: str(data, "threadsUrl"),
  };
}
