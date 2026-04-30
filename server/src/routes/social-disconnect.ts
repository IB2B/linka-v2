import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { lateFetch } from "../lib/late-api";
import { getOrCreateLateProfile } from "../lib/late-profile";

type RawAccount = { _id: string; profileId?: string | { _id: string } };

export async function disconnectAccount(req: AuthRequest, res: Response) {
  const accountId = String(req.params.id);
  const profileId = await getOrCreateLateProfile(req.user!.id);

  const list = await lateFetch<{ accounts: RawAccount[] }>(
    `/accounts?profileId=${encodeURIComponent(profileId)}&limit=100`,
  );
  const owned = (list.accounts ?? []).some((a) => {
    if (a._id !== accountId) return false;
    const pid = typeof a.profileId === "string" ? a.profileId : a.profileId?._id;
    return !pid || pid === profileId;
  });
  if (!owned) { res.status(404).json({ error: "Account not found" }); return; }

  await lateFetch(`/accounts/${accountId}`, { method: "DELETE" });
  res.json({ ok: true });
}
