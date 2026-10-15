"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { InstructionTextarea } from "@/components/settings/instruction-textarea";

const MAX_CHARS = 50_000;

const FIELD = {
  name: "knowledge",
  label: "Extra knowledge",
  hint: "Paste or upload docs, landing page copy, FAQs or release notes (.txt or .md). The AI reads this for facts.",
  placeholder: "Anything else the AI should know about the product…",
};

type Props = { value: string; onChange: (value: string) => void };

export function ProductKnowledgeField({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    const text = (await file.text()).trim();
    const joined = value.trim() ? `${value.trim()}\n\n${text}` : text;
    if (joined.length > MAX_CHARS) toast.warning("That's a lot of text, so the end was cut to fit.");
    onChange(joined.slice(0, MAX_CHARS));
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <InstructionTextarea field={FIELD} value={value} onChange={onChange} rows={6}>
      <div className="flex items-center justify-between gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          <Upload /> Upload .txt or .md
        </Button>
        <span className="text-xs tabular-nums text-muted-foreground">
          {value.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </span>
        <input ref={inputRef} type="file" accept=".txt,.md,.markdown,text/plain,text/markdown"
          className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </div>
    </InstructionTextarea>
  );
}
