"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { ButtonLink, buttonClass } from "@/components/ui/primitives";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80dvh] items-center pt-24">
      <div className="container-page">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-warn">Something went wrong</p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.045em] text-fg md:text-7xl">
          An unexpected error interrupted this page.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-fg-muted">Try again. If it keeps happening, the home page is a safe place to restart.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className={buttonClass("primary")}>
            <RotateCcw className="size-4" aria-hidden="true" /> Try again
          </button>
          <ButtonLink href="/" variant="secondary">
            Back home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
