"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { skipStepAction } from "@/app/onboarding/actions";

const STEPS = [
  "Go to your LinkedIn profile",
  "Click the ••• (More) button near the top",
  'Select "Save to PDF"',
  "Upload the downloaded file below",
];

export function LinkedInImport() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);

  async function handleUpload() {
    if (!file) return;
    setPending(true);
    try {
      const form = new FormData();
      form.append("pdf", file);
      const res = await fetch("/api/users/me/linkedin-pdf", { method: "POST", credentials: "include", body: form });
      const json = await res.json();
      if (!res.ok) { toast.error(json.error ?? "Upload failed."); return; }
      router.push("/onboarding/plan");
    } catch { toast.error("Upload failed. Please try again."); }
    finally { setPending(false); }
  }

  async function handleSkip() {
    await skipStepAction(4);
    router.push("/onboarding/plan");
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <ol className="space-y-2.5">
        {STEPS.map((step, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">{i + 1}</span>
            <span className="text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>
      <button type="button" onClick={() => fileRef.current?.click()}
        className="w-full rounded-lg border-2 border-dashed p-6 text-center text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
        <Upload className="mx-auto mb-2 size-5" />
        {file ? file.name : "Click to select your LinkedIn PDF"}
      </button>
      <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <div className="mt-auto flex justify-end gap-3 pb-8 pt-4">
        <Button variant="ghost" onClick={handleSkip} disabled={pending}>Skip</Button>
        <Button onClick={handleUpload} disabled={!file || pending}>
          {pending && <Spinner size="xs" />} Upload & Continue
        </Button>
      </div>
    </div>
  );
}
