"use client";

import { useMemo } from "react";
import { Pencil, ArrowUpRight } from "lucide-react";

import { detectEmailProvider } from "@/lib/auth/email-providers";
import { ForgotPasswordResend } from "./forgot-password-resend";

type Props = { email: string; onUseDifferent: () => void };

export function ForgotPasswordSent({ email, onUseDifferent }: Props) {
  const provider = useMemo(() => detectEmailProvider(email), [email]);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-[32px] font-semibold leading-[1.1] tracking-tight">
        Check your email
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        We sent a reset link to
      </p>

      <button
        type="button"
        onClick={onUseDifferent}
        className="group mt-2.5 inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-muted"
      >
        {email}
        <Pencil className="size-3 text-muted-foreground transition group-hover:text-foreground" aria-hidden />
      </button>

      <p className="mt-3 text-xs text-muted-foreground">
        The link expires in <span className="font-medium text-foreground">1 hour</span>.
      </p>

      {provider && (
        <a
          href={provider.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex w-full max-w-xs items-center justify-center gap-1.5 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
        >
          {provider.label}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      )}

      <ForgotPasswordResend email={email} />
    </div>
  );
}
