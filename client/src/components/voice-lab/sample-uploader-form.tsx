"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SingleUploadForm } from "./single-upload-form";
import { BulkUploadForm } from "./bulk-upload-form";
import type { SampleLimits } from "@/types/voice-lab";

type SampleUploaderFormProps = {
  limits: SampleLimits;
  onSuccess?: () => void;
};

export function SampleUploaderForm({ limits, onSuccess }: SampleUploaderFormProps) {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  if (!limits.canAddMore) {
    return (
      <p className="text-sm text-muted-foreground">
        Sample limit reached. Upgrade your plan to add more.
      </p>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={mode === "single" ? "default" : "outline"}
          onClick={() => setMode("single")}
        >
          Single
        </Button>
        <Button
          size="sm"
          variant={mode === "bulk" ? "default" : "outline"}
          onClick={() => setMode("bulk")}
        >
          Bulk
        </Button>
      </div>
      {mode === "single" ? (
        <SingleUploadForm onSuccess={onSuccess} />
      ) : (
        <BulkUploadForm onSuccess={onSuccess} />
      )}
    </div>
  );
}
