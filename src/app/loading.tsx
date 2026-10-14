export default function Loading() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center pt-24" role="status" aria-live="polite">
      <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
        <span className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
        Loading
      </span>
    </div>
  );
}
