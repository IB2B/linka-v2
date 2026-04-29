"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const ACCEPT = ".txt,.md,.markdown";

type FileImportProps = {
  onContent: (text: string, name: string) => void;
  multiple?: boolean;
  label?: string;
};

export function FileImport({ onContent, multiple, label }: FileImportProps) {
  const ref = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    for (const f of files) {
      try {
        const text = await f.text();
        onContent(text, f.name);
      } catch {
        toast.error(`Could not read ${f.name}`);
      }
    }
    if (ref.current) ref.current.value = "";
  }

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept={ACCEPT}
        multiple={multiple}
        className="sr-only"
        onChange={handleChange}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => ref.current?.click()}
      >
        <Upload className="size-4" />
        {label ?? (multiple ? "Import files" : "Import file")}
      </Button>
    </>
  );
}
