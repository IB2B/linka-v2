import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { createHostedAuthLink, syncConnectedAccount } from "../lib/unipile-auth";
import { unipileConfigured } from "../lib/unipile-api";
import {
  getLinkedinAccount, saveLinkedinAccount, deleteLinkedinAccount,
} from "../lib/unipile-account";

export async function linkedinStatus(req: AuthRequest, res: Response) {
  const acc = await getLinkedinAccount(req.user!.id);
  res.json({ connected: !!acc, email: acc?.email ?? null });
}

export async function connectLinkedin(req: AuthRequest, res: Response) {
  if (!unipileConfigured()) {
    res.status(503).json({ error: "linkedin_not_configured" });
    return;
  }
  const url = await createHostedAuthLink(req.user!.id);
  res.json({ url });
}

export async function syncLinkedin(req: AuthRequest, res: Response) {
  if (!unipileConfigured()) { res.json({ connected: false }); return; }
  const connected = await syncConnectedAccount(req.user!.id);
  res.json({ connected });
}

export async function disconnectLinkedin(req: AuthRequest, res: Response) {
  await deleteLinkedinAccount(req.user!.id);
  res.json({ ok: true });
}

// Unipile notify_url — public (no auth). `name` is the user id we set when
// creating the hosted-auth link, so we can attach the account to the right user.
export async function linkedinWebhook(req: Request, res: Response) {
  const { status, account_id, name } = (req.body ?? {}) as {
    status?: string; account_id?: string; name?: string;
  };
  if (status === "CREATION_SUCCESS" && account_id && name) {
    await saveLinkedinAccount(name, account_id);
  }
  res.json({ ok: true });
}
