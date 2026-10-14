"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2200);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-white/60 px-5 text-sm text-fg transition-colors duration-300 hover:border-fg/40 hover:bg-white",
        state === "copied" && "border-accent-line text-accent",
        className,
      )}
    >
      {state === "copied" ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span aria-live="polite">
        {state === "copied" ? "Copied to clipboard" : state === "error" ? "Couldn't copy. Select it manually" : "Copy email"}
      </span>
    </button>
  );
}
