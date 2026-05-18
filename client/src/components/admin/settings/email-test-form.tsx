"use client";

import { useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { sendTestEmailAction } from "@/app/admin/settings/email-action";

export function EmailTestForm({ defaultTo }: { defaultTo: string }) {
  const [to, setTo] = useState(defaultTo);
  const [pending, start] = useTransition();

  function submit(e: FormEvent) {
    e.preventDefault();
    start(async () => {
      const r = await sendTestEmailAction(to);
      if (r.error) { toast.error(r.error); return; }
      toast.success(`Sent. Message ID: ${r.messageId ?? "ok"}`);
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <FormField
        id="testTo"
        label="Send a test email to"
        type="email"
        placeholder="you@example.com"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
      />
      <p className="text-xs tracking-tight text-muted-foreground">
        Uses the configured SMTP transport. Useful for verifying SMTP_HOST / SMTP_USER / SMTP_PASS.
      </p>
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={pending || !to}>
          {pending && <Spinner aria-hidden />}Send test
        </Button>
      </div>
    </form>
  );
}
