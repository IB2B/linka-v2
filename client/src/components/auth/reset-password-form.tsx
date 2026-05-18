"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { PasswordField } from "@/components/forms/password-field";
import { FormSubmitButton } from "@/components/forms/form-submit-button";

const schema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const formData = new FormData(event.currentTarget);
    const parsed = schema.safeParse({
      newPassword: String(formData.get("newPassword") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setPending(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: parsed.data.newPassword }),
    });
    setPending(false);
    if (!res.ok) {
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      toast.error(json.error ?? "Reset failed.");
      return;
    }
    toast.success("Password updated. Sign in with your new password.");
    router.replace("/login");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PasswordField id="newPassword" name="newPassword" label="New password" autoComplete="new-password" required />
      <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm password" autoComplete="new-password" required />
      <FormSubmitButton label="Set new password" pending={pending} />
    </form>
  );
}
