"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORMS } from "@/lib/content/platforms";
import type { Platform as ZernioPlatform } from "@/lib/zernio/zernio-account.types";
import type { GenerationResult } from "@/types/content";

type Props = {
  result: GenerationResult;
  pending: boolean;
  onRegenerate: () => void;
  onReset: () => void;
};

export function GeneratedPostCard({ result, pending, onRegenerate, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const label = PLATFORMS.find((p) => p.value === result.platform)?.label ?? result.platform;

  function copy() {
    navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base text-primary">
          <PlatformIcon platform={result.platform as ZernioPlatform} className="size-4" />
          {label} post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{result.content}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-2">
        <Button size="sm" variant="outline" onClick={copy}>
          {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button size="sm" variant="outline" onClick={onRegenerate} disabled={pending}>
          {pending ? <Spinner aria-hidden /> : <RefreshCw className="size-3.5" />}
          Regenerate
        </Button>
        <Button size="sm" variant="ghost" onClick={onReset} disabled={pending} className="ml-auto">
          <PenLine className="size-3.5" /> Generate another
        </Button>
      </CardFooter>
    </Card>
  );
}
