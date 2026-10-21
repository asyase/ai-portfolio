/** Full-width dark band that opens a key section, e.g. "HOW I WORK with AI". */
export function SectionBand({ mark, title, accent, note }: { mark: string; title: string; accent: string; note: string }) {
  return (
    <div className="bg-fg text-bg">
      <div className="container-page flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-8">
        <p className="flex min-w-0 items-baseline gap-4 font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-bold uppercase leading-none tracking-[-0.02em]">
          <span className="font-mono text-xs font-normal text-swatch-pink">{mark}</span>
          <span>
            {title} <span className="font-serif font-normal normal-case italic tracking-normal text-swatch-pink">{accent}</span>
          </span>
        </p>
        <p className="min-w-0 font-mono text-xs uppercase tracking-[0.14em] text-bg/70 md:text-right">{note}</p>
      </div>
    </div>
  );
}
