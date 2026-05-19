"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { forgotPasswordRequest } from "@/lib/api/auth-client";

const RESEND_COOLDOWN_SEC = 60;

export function ForgotPasswordResend({ email }: { email: string }) {
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SEC);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function resend() {
    if (pending || cooldown > 0) return;
    setPending(true);
    const r = await forgotPasswordRequest({ email });
    setPending(false);
    if (!r.ok) { toast.error(r.error); return; }
    toast.success(`New link sent to ${email}.`);
    setCooldown(RESEND_COOLDOWN_SEC);
  }

  return (
    <p className="mt-5 text-xs text-muted-foreground">
      Didn&rsquo;t receive it?{" "}
      {cooldown > 0 ? (
        <>Resend in <span className="font-medium tabular-nums text-foreground">{cooldown}s</span></>
      ) : (
        <button
          type="button"
          onClick={resend}
          disabled={pending}
          className="font-medium text-foreground underline-offset-4 hover:underline disabled:opacity-50"
        >
          {pending ? "Sending…" : "Resend email"}
        </button>
      )}
    </p>
  );
}
