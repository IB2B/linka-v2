"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { forgotPasswordRequest } from "@/lib/api/auth-client";
import { FormField } from "@/components/forms/form-field";
import { FormSubmitButton } from "@/components/forms/form-submit-button";

export function ForgotPasswordForm({ onSent }: { onSent: (email: string) => void }) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    setPending(true);
    const result = await forgotPasswordRequest({ email });
    setPending(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    onSent(email);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        id="email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        placeholder="you@example.com"
        required
      />
      <FormSubmitButton label="Send reset link" pending={pending} />
    </form>
  );
}
