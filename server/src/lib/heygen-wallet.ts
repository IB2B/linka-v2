import { heygenFetch } from "./heygen-api";

// The HeyGen API bills from a prepaid USD wallet that is entirely separate from
// the Studio plan's credits — a paid plan, topped-up credit packs and a wallet
// balance are three different things, and only the wallet funds API renders.
// Checked before each render so an empty wallet fails instantly instead of after
// we have already paid an LLM to write the script.
type Me = {
  data?: {
    billing_type?: string;
    wallet?: { remaining_balance?: number | null } | null;
  };
};

// Thrown when the wallet cannot pay for a render. Distinct from HeygenError so
// callers can tell "we know this will fail" from "the provider rejected it".
export class WalletEmptyError extends Error {
  constructor() { super("HeyGen wallet has no balance"); }
}

// null = not wallet-billed (or the check itself failed), meaning we have no
// grounds to block. Never guess: an unknown balance must not stop a render.
export async function walletBalance(): Promise<number | null> {
  const me = await heygenFetch<Me>("/v3/users/me");
  if (me.data?.billing_type !== "wallet") return null;
  return me.data.wallet?.remaining_balance ?? 0;
}

export async function assertWalletFunded(): Promise<void> {
  const balance = await walletBalance().catch(() => null);
  if (balance === null || balance > 0) return;
  console.error(
    "[heygen] wallet balance is $0 — API renders will 402 until it is funded "
    + "(HeyGen → Settings → API). Plan credits and credit packs do not apply.",
  );
  throw new WalletEmptyError();
}
