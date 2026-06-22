"use client";

import { useState } from "react";
import { FormField } from "@/components/forms/form-field";
import { FormSubmitButton } from "@/components/forms/form-submit-button";

type Props = { pending: boolean; email: string; onSubmit: (code: string) => void };

export function LinkedinVerifyStep({ pending, email, onSubmit }: Props) {
  const [code, setCode] = useState("");
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(code); }}
      className="space-y-4"
    >
      <p className="text-sm text-muted-foreground">
        LinkedIn sent a verification code to{" "}
        <span className="font-medium text-foreground">{email}</span>. Enter it below.
      </p>
      <FormField
        id="li-code" label="Verification code" inputMode="numeric" autoFocus
        value={code} onChange={(e) => setCode(e.target.value)} required
      />
      <FormSubmitButton label="Connect LinkedIn" pending={pending} />
    </form>
  );
}
