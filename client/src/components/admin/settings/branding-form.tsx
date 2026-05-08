"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/forms/form-field";
import { SaveBar } from "@/components/admin/settings/save-bar";
import { updateSettingsAction } from "@/app/admin/settings/actions";
import type { AppSettings } from "@/types/admin";

type B = Pick<AppSettings, "logoUrl" | "primaryColor" | "emailSenderName" | "emailFooterText">;

export function BrandingForm({ initial }: { initial: B }) {
  const [v, setV] = useState<B>(initial);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(v) !== JSON.stringify(initial);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      const r = await updateSettingsAction(v);
      r.error ? toast.error(r.error) : toast.success("Branding saved.");
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <FormField id="logoUrl" label="Logo URL" type="url"
        placeholder="https://cdn.example.com/logo.svg" value={v.logoUrl ?? ""}
        onChange={(e) => setV({ ...v, logoUrl: e.target.value || null })} />
      <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
        <FormField id="primaryColor" label="Primary color" type="color"
          value={v.primaryColor ?? "#6D5FF9"}
          onChange={(e) => setV({ ...v, primaryColor: e.target.value })} />
        <FormField id="emailSenderName" label="Email sender name"
          placeholder="linka" value={v.emailSenderName ?? ""}
          onChange={(e) => setV({ ...v, emailSenderName: e.target.value || null })} />
      </div>
      <FormField id="emailFooterText" label="Email footer"
        placeholder="© linka — manage preferences" value={v.emailFooterText ?? ""}
        onChange={(e) => setV({ ...v, emailFooterText: e.target.value || null })} />
      <SaveBar pending={pending} dirty={dirty} />
    </form>
  );
}
