"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function ErrorPage({ error: _e, reset }: Props) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-6">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-semibold tracking-tight">Ooops…</h1>
          <p className="text-sm text-muted-foreground">
            Something went wrong!
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to dashboard
          </Link>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
