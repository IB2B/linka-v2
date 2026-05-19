"use client";

import { useState } from "react";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { ForgotPasswordSent } from "@/components/auth/forgot-password-sent";

export function ForgotPasswordPanel() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  if (sentTo) {
    return <ForgotPasswordSent email={sentTo} onUseDifferent={() => setSentTo(null)} />;
  }
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Forgot password?</h1>
        <p className="text-sm text-muted-foreground">
          Enter the email tied to your account and we&apos;ll send you a link
          to reset it.
        </p>
      </div>
      <ForgotPasswordForm onSent={setSentTo} />
    </div>
  );
}
