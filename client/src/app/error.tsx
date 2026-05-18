"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/error-page";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPage error={error} reset={reset} />;
}
