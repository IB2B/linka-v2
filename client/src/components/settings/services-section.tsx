"use client";

import { useEffect, useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { ServiceStatusRow } from "./service-status-row";
import { getServicesStatusAction, type ServicesStatusResult, type ServiceStatus } from "@/app/dashboard/settings/services-action";

const GROUPS: { title: string; rows: { key: keyof ServicesStatusResult; name: string; desc: string }[] }[] = [
  {
    title: "Text Generation",
    rows: [
      { key: "openai",    name: "OpenAI (GPT)",  desc: "gpt-4o, gpt-4-turbo — post copy & captions" },
      { key: "anthropic", name: "Anthropic (Claude)", desc: "Claude Sonnet / Haiku — post copy & captions" },
      { key: "gemini",    name: "Google Gemini", desc: "gemini-pro — post copy & captions" },
    ],
  },
  {
    title: "Image Generation",
    rows: [
      { key: "openaiImage", name: "OpenAI Images", desc: "gpt-image-1 / DALL·E — AI post images" },
      { key: "imagine",     name: "Imagine API",   desc: "Alternative image generation provider" },
    ],
  },
  {
    title: "Integrations",
    rows: [
      { key: "lateApi", name: "Late API",  desc: "LinkedIn & social publishing engine" },
      { key: "tavily",  name: "Tavily",    desc: "News & trending topics search" },
    ],
  },
];

export function ServicesSection() {
  const [data, setData] = useState<ServicesStatusResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function refresh() {
    start(async () => {
      const res = await getServicesStatusAction();
      if ("error" in res) { setError(res.error); return; }
      setError(null);
      setData(res);
    });
  }

  useEffect(() => { refresh(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Service Status</h2>
          <p className="text-sm text-muted-foreground">Live status of AI providers and integrations.</p>
        </div>
        <Button variant="outline" size="sm" onClick={refresh} disabled={pending}>
          {pending ? <Spinner className="size-3.5" /> : <RefreshCw className="size-3.5" />}
          Refresh
        </Button>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {GROUPS.map((group, gi) => (
        <div key={group.title}>
          {gi > 0 ? <Separator className="mb-4" /> : null}
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{group.title}</p>
          <div className="divide-y rounded-xl border px-4">
            {group.rows.map((row) => (
              <ServiceStatusRow key={row.key} name={row.name} description={row.desc}
                status={data ? data[row.key] : (pending ? "ok" : "unconfigured") as ServiceStatus} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
