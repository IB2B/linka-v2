"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/forms/form-field";
import { ToggleRow } from "@/components/admin/settings/toggle-row";
import { SaveBar } from "@/components/admin/settings/save-bar";
import { updateSettingsAction } from "@/app/admin/settings/actions";
import type { AppSettings } from "@/types/admin";

type N = Pick<AppSettings, "alertEmail" | "slackWebhookUrl" | "dailyDigestEnabled">;

export function NotificationsForm({ initial }: { initial: N }) {
  const [v, setV] = useState<N>(initial);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(v) !== JSON.stringify(initial);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      const r = await updateSettingsAction(v);
      r.error ? toast.error(r.error) : toast.success("Notifications saved.");
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <FormField id="alertEmail" label="Alert recipient email" type="email"
        placeholder="alerts@yourcompany.com" value={v.alertEmail ?? ""}
        onChange={(e) => setV({ ...v, alertEmail: e.target.value || null })} />
      <FormField id="slackWebhookUrl" label="Slack webhook URL" type="url"
        placeholder="https://hooks.slack.com/services/…" value={v.slackWebhookUrl ?? ""}
        onChange={(e) => setV({ ...v, slackWebhookUrl: e.target.value || null })} />
      <ToggleRow id="dailyDigestEnabled" label="Daily digest" description="Send a daily summary email of platform activity."
        checked={v.dailyDigestEnabled} onChange={(b) => setV({ ...v, dailyDigestEnabled: b })} />
      <SaveBar pending={pending} dirty={dirty} />
    </form>
  );
}
