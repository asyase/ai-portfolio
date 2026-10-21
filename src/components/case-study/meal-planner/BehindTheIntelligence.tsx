"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { chapters, kindLabel, stations, type Station, type StationKind } from "./data";

const kindDot: Record<StationKind, string> = {
  interface: "bg-surface ring-1 ring-inset ring-line-strong",
  code: "bg-swatch-pink",
  model: "bg-swatch-lavender",
  data: "bg-swatch-butter",
};

const kindChip: Record<StationKind, string> = {
  interface: "bg-surface text-fg ring-1 ring-inset ring-line-strong",
  code: "bg-swatch-pink/60 text-fg",
  model: "bg-swatch-lavender/70 text-fg",
  data: "bg-swatch-butter/80 text-fg",
};

/* ── Detail panel ─────────────────────────────────────────────────────── */

function Panel({ station, idPrefix }: { station: Station; idPrefix: string }) {
  const panelId = idPrefix === "bti" ? "bti-panel" : undefined;
  const [provider, setProvider] = useState(0);
  const step = stations.findIndex((s) => s.id === station.id) + 1;
  const chapter = chapters.find((c) => c.n === station.chapter)!;

  return (
    <div
      id={panelId ?? "bti-m-panel"}
      role={panelId ? "tabpanel" : undefined}
      aria-labelledby={panelId ? `bti-tab-${station.id}` : undefined}
      key={station.id}
      className="fade-up min-w-0"
      style={{ animationDuration: "0.45s" }}
    >
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
        <span>
          {String(chapter.n).padStart(2, "0")} / {chapter.label}
        </span>
        <span aria-hidden="true">·</span>
        <span>Stage {String(step).padStart(2, "0")}</span>
        <span className={cn("rounded-full px-2.5 py-1 normal-case tracking-normal", kindChip[station.kind])}>
          {kindLabel[station.kind]}
        </span>
      </div>

      <h3 className="mt-4 font-display text-4xl font-bold leading-[1] tracking-[-0.035em] text-fg md:text-5xl">{station.name}</h3>
      <p className="mt-5 text-lg leading-relaxed text-fg">{station.intro}</p>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {station.points.map((p) => (
          <li key={p} className="py-3 text-[15px] leading-relaxed text-fg-muted">
            {p}
          </li>
        ))}
      </ul>

      {station.providers && (
        <div className="mt-8">
          <div role="group" aria-label="Choose app version" className="inline-flex flex-wrap gap-1 rounded-full bg-surface-2 p-1">
            {station.providers.map((p, i) => (
              <button
                key={p.label}
                type="button"
                aria-pressed={provider === i}
                onClick={() => setProvider(i)}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                  provider === i ? "bg-fg text-bg" : "text-fg-muted hover:text-fg",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
            One provider per version, never both in one request
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{station.providers[provider].summary}</p>
          <div className="mt-5">
            <CodeBlock excerpt={station.providers[provider].code} />
          </div>
        </div>
      )}

      {station.code && (
        <div className="mt-8">
          <CodeBlock excerpt={station.code} />
        </div>
      )}

      {station.image && (
        <figure className="mt-8">
          <Image
            src={station.image.src}
            alt={station.image.alt}
            width={2880}
            height={2200}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full rounded-2xl border border-line"
          />
          <figcaption className="mt-3 text-sm leading-relaxed text-fg-subtle">{station.image.caption}</figcaption>
        </figure>
      )}

      {station.limitation && (
        <p className="mt-8 border-l-2 border-swatch-lavender pl-4 text-[15px] italic leading-relaxed text-fg-muted">
          <span className="not-italic font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Limit · </span>
          {station.limitation}
        </p>
      )}
    </div>
  );
}

/* ── Stage list pieces ────────────────────────────────────────────────── */

function ChapterGroup({ chapter, children }: { chapter: (typeof chapters)[number]; children: React.ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="font-display text-2xl font-bold tracking-[-0.03em] text-fg md:text-3xl">
        <span className="text-swatch-lavender [-webkit-text-stroke:1px_var(--fg)]">{String(chapter.n).padStart(2, "0")}</span>
        <span className="text-fg-subtle"> / </span>
        {chapter.label.toUpperCase()}
      </p>
      <div className="relative mt-3">
        <span className="absolute bottom-5 left-[0.6875rem] top-5 w-px bg-line-strong" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

function StageButton({
  station: s,
  selected,
  onSelect,
  buttonProps,
}: {
  station: Station;
  selected: boolean;
  onSelect: () => void;
  buttonProps: React.ComponentPropsWithRef<"button">;
}) {
  const step = stations.findIndex((x) => x.id === s.id) + 1;
  return (
    <button
      type="button"
      {...buttonProps}
      onClick={onSelect}
      className={cn(
        "group relative flex w-full items-start gap-4 rounded-2xl py-3 pl-0 pr-3 text-left transition-colors",
        selected ? "bg-surface shadow-[0_10px_30px_-22px_rgb(58_32_64/0.5)]" : "hover:bg-surface/60",
      )}
    >
      <span
        className={cn("relative z-10 mt-1 flex size-6 shrink-0 items-center justify-center rounded-full transition-transform", kindDot[s.kind], selected && "scale-125 ring-2 ring-fg")}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] text-fg-subtle">{String(step).padStart(2, "0")}</span>
          <span className={cn("font-display text-xl font-bold tracking-[-0.02em] md:text-2xl", selected ? "text-fg" : "text-fg/80")}>{s.name}</span>
        </span>
        <span className="mt-1 block font-mono text-[11px] text-fg-subtle">{s.short}</span>
        {s.dataLink && (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-swatch-butter/60 px-2.5 py-0.5 font-mono text-[10.5px] text-fg">
            {s.dataLink === "reads" ? "← reads from PostgreSQL" : "→ writes validated results"}
          </span>
        )}
      </span>
    </button>
  );
}

/* ── Explorer ─────────────────────────────────────────────────────────── */

export function BehindTheIntelligence({ number }: { number: string }) {
  const [active, setActive] = useState("guard");
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = stations.find((s) => s.id === active)!;

  const move = (delta: number) => {
    const i = stations.findIndex((s) => s.id === active);
    const next = stations[(i + delta + stations.length) % stations.length];
    setActive(next.id);
    tabs.current[next.id]?.focus();
  };

  return (
    <section id="architecture" aria-labelledby="architecture-title" className="scroll-mt-24 border-t border-line bg-bg-raised py-20 md:py-28">
      <div className="container-page">
        {/* heading */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
              <span className="text-accent">{number}</span> / Architecture · interactive
            </p>
            <h2 id="architecture-title" className="mt-5 font-display text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-fg">
              Behind the intelligence.
            </h2>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-fg-muted md:text-2xl">
              What happens between a user&apos;s request and a reliable AI-powered result?
            </p>
          </div>
          <div className="self-end lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Who decides what</p>
            <ul className="mt-3 space-y-2 text-sm text-fg">
              {(Object.keys(kindLabel) as StationKind[]).map((k) => (
                <li key={k} className="flex items-center gap-3">
                  <span className={cn("size-3 rounded-full", kindDot[k])} aria-hidden="true" />
                  {kindLabel[k]}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-fg-subtle">
              The model proposes dishes and amounts. Structure, safety, calories and sums are decided in Java.
            </p>
          </div>
        </div>

        {/* system map */}
        <ol className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-3 font-mono text-[12px]" aria-label="Request flow overview">
          {stations.map((s, i) => (
            <li key={s.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActive(s.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors",
                  s.id === active ? "bg-fg text-bg" : cn(kindChip[s.kind], "hover:bg-fg hover:text-bg"),
                )}
              >
                {s.name}
              </button>
              {i < stations.length - 1 && (
                <span className="text-fg-subtle" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-3 font-mono text-[11px] text-fg-subtle">
          PostgreSQL appears twice: it provides the grounding context before the model call and stores validated results after it.
        </p>

        {/* explorer */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* desktop: vertical tabs, the panel is the sticky column on the right */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="System stages"
            className="hidden min-w-0 lg:col-span-5 lg:block"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                move(1);
              } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                move(-1);
              }
            }}
          >
            {chapters.map((c) => (
              <ChapterGroup key={c.n} chapter={c}>
                {stations
                  .filter((s) => s.chapter === c.n)
                  .map((s) => (
                    <StageButton
                      key={s.id}
                      station={s}
                      selected={s.id === active}
                      onSelect={() => setActive(s.id)}
                      buttonProps={{
                        ref: (el: HTMLButtonElement | null) => {
                          tabs.current[s.id] = el;
                        },
                        id: `bti-tab-${s.id}`,
                        role: "tab",
                        "aria-selected": s.id === active,
                        "aria-controls": "bti-panel",
                        tabIndex: s.id === active ? 0 : -1,
                      }}
                    />
                  ))}
              </ChapterGroup>
            ))}
          </div>

          {/* mobile: each stage is a disclosure, its details open right underneath */}
          <div className="min-w-0 lg:hidden">
            {chapters.map((c) => (
              <ChapterGroup key={c.n} chapter={c}>
                {stations
                  .filter((s) => s.chapter === c.n)
                  .map((s) => (
                    <div key={s.id} className="min-w-0">
                      <StageButton
                        station={s}
                        selected={s.id === active}
                        onSelect={() => setActive(s.id)}
                        buttonProps={{ "aria-expanded": s.id === active, "aria-controls": s.id === active ? "bti-m-panel" : undefined }}
                      />
                      {s.id === active && (
                        <div className="mb-4 mt-2 min-w-0 rounded-2xl bg-surface p-5">
                          <Panel station={current} idPrefix="bti-m" />
                        </div>
                      )}
                    </div>
                  ))}
              </ChapterGroup>
            ))}
          </div>

          <div className="hidden min-w-0 lg:col-span-7 lg:block">
            <div tabIndex={0} aria-label="Selected stage details" className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-3xl bg-surface p-8 shadow-[0_30px_80px_-50px_rgb(58_32_64/0.5)] xl:p-10">
              <Panel station={current} idPrefix="bti" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
