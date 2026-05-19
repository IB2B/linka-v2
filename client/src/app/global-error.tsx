"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { ErrorPage } from "@/components/error-page";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
}
