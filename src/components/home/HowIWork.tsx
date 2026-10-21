"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/case-study/meal-planner/CodeBlock";
import { LinkedText } from "@/components/ui/LinkedText";
import { SectionBand } from "@/components/ui/SectionBand";
import { questions, stages, systemNodes, type Stage, type StageImage } from "./how-i-work/data";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ── Shared pieces ────────────────────────────────────────────────────── */

function StageText({ stage }: { stage: Stage }) {
  return (
    <div className="min-w-0">
      <p className="fade-up font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-accent">{stage.motto}</p>
      <h3
        className="fade-up mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.035em] text-fg"
        style={delay(80)}
      >
        {stage.title}{" "}
        <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-accent">{stage.accent}</span>
      </h3>
      <p className="fade-up mt-5 text-lg leading-relaxed text-fg-muted" style={delay(140)}>
        {stage.copy}
      </p>

      <p className="fade-up mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle" style={delay(200)}>
        {stage.stepsLabel}
      </p>
      <ol className="mt-3 border-t border-fg">
        {stage.steps.map((s, i) => (
          <li key={s.title} className="fade-up grid grid-cols-[2rem_1fr] border-b border-line py-4" style={delay(240 + i * 70)}>
            <span className="pt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-display text-lg font-bold leading-tight tracking-[-0.01em] text-fg">{s.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-fg-muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="fade-up mt-8" style={delay(480)}>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Case study</p>
        <Link
          href={stage.project.href}
          className="group mt-2 inline-flex items-baseline gap-2 border-b border-fg pb-1 font-display text-lg font-bold tracking-[-0.01em] text-fg transition-colors hover:border-accent hover:text-accent"
        >
          {stage.project.name}
          <ArrowUpRight className="size-4 self-center transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        <p className="mt-2 text-sm text-fg-subtle">
          <LinkedText text={stage.project.note} />
        </p>
      </div>
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <p className="font-mono text-xs leading-relaxed text-fg-muted">
      {items.map((t, i) => (
        <span key={t}>
          {t}
          {i < items.length - 1 && (
            <span className="mx-2 text-swatch-lavender" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </p>
  );
}

/** A screenshot with numbered annotations placed on top of it. */
function AnnotatedImage({ image, sizes, priority }: { image: StageImage; sizes: string; priority?: boolean }) {
  return (
    <figure className="min-w-0">
      <div className="reveal-up relative overflow-hidden border border-fg/80 bg-surface">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
        {image.markers?.map((m, i) => (
          <span
            key={m.label}
            className="fade-up absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fg font-mono text-[11px] font-medium text-bg ring-4 ring-swatch-pink/70 md:size-7"
            style={{ left: `${m.x}%`, top: `${m.y}%`, ...delay(500 + i * 90) }}
            aria-hidden="true"
          >
            {i + 1}
          </span>
        ))}
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-fg-subtle">{image.caption}</figcaption>
    </figure>
  );
}

/* ── Visuals per stage ────────────────────────────────────────────────── */

function LayeredVisual({ stage }: { stage: Stage }) {
  const [main, second] = stage.images!;
  return (
    <div className="min-w-0">
      <AnnotatedImage image={main} sizes="(min-width: 1024px) 60vw, 100vw" />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_38%] lg:gap-8">
        <ol className="grid content-start gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" aria-label="Annotations">
          {main.markers?.map((m, i) => (
            <li key={m.label} className="fade-up grid grid-cols-[1.75rem_1fr] border-t border-fg pt-3" style={delay(560 + i * 90)}>
              <span className="font-mono text-xs text-accent">{i + 1}</span>
              <span className="text-[15px] leading-snug text-fg">{m.label}</span>
            </li>
          ))}
        </ol>
        {/* second image is pinned over the bottom edge of the first, like a print on a page */}
        <figure className="relative z-10 ml-auto w-[78%] lg:-mt-28 lg:w-full">
          <div className="reveal-up overflow-hidden border border-fg/80 bg-surface shadow-[0_30px_60px_-30px_rgb(58_32_64/0.55)]" style={delay(260)}>
            <Image src={second.src} alt={second.alt} width={second.width} height={second.height} sizes="(min-width: 1024px) 24vw, 80vw" className="h-auto w-full" />
          </div>
          <figcaption className="mt-2 font-mono text-[11px] text-fg-subtle">{second.caption}</figcaption>
        </figure>
      </div>

      <div className="mt-10 grid gap-6 border-t border-fg pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Built with</p>
          <div className="mt-2">
            <Stack items={stage.stack} />
          </div>
        </div>
        {stage.facts && (
          <dl className="flex gap-8">
            {stage.facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-4xl font-extrabold leading-none tracking-[-0.04em] text-fg md:text-5xl">{f.value}</dd>
                <dd className="mt-1 max-w-[16ch] font-mono text-[11px] leading-snug text-fg-subtle">{f.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}

function SystemVisual({ stage }: { stage: Stage }) {
  const [q, setQ] = useState(0);
  const [selected, setSelected] = useState("validate");
  const question = questions[q];
  const node = systemNodes.find((n) => n.id === selected)!;

  return (
    <div className="min-w-0">
      {/* question chooser */}
      <fieldset>
        <legend className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Ask the chatbot · follow the request</legend>
        <div className="mt-3 border-t border-fg">
          {questions.map((item, i) => (
            <label
              key={item.text}
              className={cn(
                "group flex cursor-pointer items-baseline gap-4 border-b border-line py-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                q === i ? "text-fg" : "text-fg/45 hover:text-fg/75",
              )}
            >
              <input type="radio" name="hiw-question" className="sr-only" checked={q === i} onChange={() => setQ(i)} />
              <span className="font-mono text-xs text-accent">{q === i ? "→" : String.fromCharCode(65 + i)}</span>
              <span className="font-serif text-[clamp(1.35rem,2.2vw,1.8rem)] italic leading-tight">&ldquo;{item.text}&rdquo;</span>
            </label>
          ))}
        </div>
        <p key={q} className="fade-up mt-4 text-[15px] leading-relaxed text-fg" aria-live="polite">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Result · </span>
          {question.outcome}
        </p>
      </fieldset>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-1 xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
        {/* request path */}
        <ol className="relative" aria-label="Request path">
          {systemNodes.map((n, i) => {
            const reached = i <= question.reaches;
            const stopsHere = i === question.reaches && question.reaches < systemNodes.length - 1;
            const isSelected = n.id === selected;
            return (
              <li key={n.id} className="relative pl-9">
                {/* connecting line to the next node */}
                {i < systemNodes.length - 1 && (
                  <span
                    className={cn(
                      "absolute left-[0.6875rem] top-6 h-full w-px origin-top transition-[transform,background-color] duration-700 ease-[var(--ease-out-expo)]",
                      i < question.reaches ? "scale-y-100 bg-fg" : "scale-y-100 bg-line-strong",
                    )}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={cn(
                    "absolute left-0 top-3 flex size-[1.375rem] items-center justify-center rounded-full border transition-colors duration-500",
                    stopsHere ? "border-accent bg-accent" : reached ? "border-fg bg-fg" : "border-line-strong bg-bg",
                  )}
                  aria-hidden="true"
                >
                  {stopsHere && <span className="block h-0.5 w-2.5 bg-accent-ink" />}
                </span>
                <button
                  type="button"
                  onClick={() => setSelected(n.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "w-full py-2.5 text-left transition-opacity duration-500",
                    reached ? "opacity-100" : "opacity-35 hover:opacity-70",
                  )}
                >
                  <span className="flex items-baseline gap-2">
                    <span
                      className={cn(
                        "font-display text-lg font-bold leading-tight tracking-[-0.01em] text-fg decoration-swatch-pink decoration-[3px] underline-offset-[5px]",
                        isSelected && "underline",
                      )}
                    >
                      {n.name}
                    </span>
                    {n.owner === "me" && <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">my part</span>}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-fg-subtle">{n.role}</span>
                  {stopsHere && <span className="mt-1 block font-mono text-[11px] font-medium text-accent">Stops here</span>}
                </button>
              </li>
            );
          })}
        </ol>

        {/* selected node */}
        <div key={node.id} className="min-w-0 md:border-l md:border-fg md:pl-8 lg:border-l-0 lg:pl-0 xl:border-l xl:pl-8">
          <p className="fade-up font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
            Stage {String(systemNodes.indexOf(node) + 1).padStart(2, "0")} · {node.owner === "me" ? "built by me" : "team"}
          </p>
          <p className="fade-up mt-3 font-display text-3xl font-bold leading-none tracking-[-0.03em] text-fg md:text-4xl" style={delay(60)}>
            {node.name}
          </p>
          <p className="fade-up mt-4 text-[17px] leading-relaxed text-fg-muted" style={delay(120)}>
            {node.detail}
          </p>
          {node.code ? (
            <div className="fade-up mt-6" style={delay(180)}>
              <CodeBlock excerpt={node.code} />
            </div>
          ) : (
            <p className="fade-up mt-6 border-l-2 border-swatch-lavender pl-4 text-sm text-fg-subtle" style={delay(180)}>
              Select Validation, PostgreSQL, REST API or SQL from the model to see the real code.
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 border-t border-fg pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Built with</p>
        <div className="mt-2">
          <Stack items={stage.stack} />
        </div>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

export function HowIWork() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[active];

  const go = (i: number) => {
    const next = (i + stages.length) % stages.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      id="how-i-work"
      aria-labelledby="how-i-work-title"
      className="scroll-mt-16 overflow-x-clip bg-[linear-gradient(180deg,#f1e2f6_0%,#f8eef4_45%,#fbf5f8_100%)] pb-20 md:pb-28"
    >
      <SectionBand mark="01" title="How I work" accent="with AI" note="AI tools · AI features · Automation" />

      <div className="container-page pt-16 md:pt-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Three stages · three real projects</p>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2
            id="how-i-work-title"
            className="max-w-[13ch] font-display text-[clamp(3rem,7.5vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-fg lg:col-span-8"
          >
            From design to{" "}
            <span className="font-serif text-[1.06em] font-normal italic tracking-[-0.02em] text-accent">smarter systems.</span>
          </h2>
          <p className="max-w-[44ch] border-l-2 border-swatch-pink pl-5 text-base leading-relaxed text-fg-muted md:text-[17px] lg:col-span-4 lg:mb-2">
            I combine thoughtful design, full-stack development and AI to build faster, automate repetitive work and turn ideas into
            reliable products. The three stages below show how that approach comes together across real projects.
          </p>
        </div>

        {/* stage navigation */}
        <div
          role="tablist"
          aria-label="Stages"
          className="mt-12 flex flex-col gap-1 border-t border-fg pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              go(active + 1);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              go(active - 1);
            } else if (e.key === "Home") {
              e.preventDefault();
              go(0);
            } else if (e.key === "End") {
              e.preventDefault();
              go(stages.length - 1);
            }
          }}
        >
          {stages.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`hiw-tab-${s.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="hiw-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative flex items-start gap-2 pb-3 text-left font-display text-[clamp(2.6rem,6.2vw,4.75rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em] transition-colors duration-500",
                  selected ? "text-fg" : "text-fg/25 hover:text-fg/55",
                )}
              >
                <span className={cn("mt-[0.4em] font-mono text-xs font-normal tracking-normal transition-colors", selected ? "text-accent" : "text-fg-subtle")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-7 right-0 h-[3px] origin-left bg-swatch-pink transition-transform duration-700 ease-[var(--ease-out-expo)]",
                    selected ? "scale-x-100" : "scale-x-0",
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        {/* stage content */}
        <div
          id="hiw-panel"
          role="tabpanel"
          aria-labelledby={`hiw-tab-${stage.id}`}
          key={stage.id}
          className="mt-14 grid grid-cols-1 gap-14 md:mt-20 lg:grid-cols-12 lg:gap-12"
        >
          <div className="min-w-0 lg:col-span-4">
            <StageText stage={stage} />
          </div>
          <div className="min-w-0 lg:col-span-8">{stage.id === "connect" ? <SystemVisual stage={stage} /> : <LayeredVisual stage={stage} />}</div>
        </div>

        <p className="mt-16 border-t border-line pt-5 text-sm text-fg-subtle">
          Prompt tests, the LLM judge and the input guard are explained in depth in the{" "}
          <Link href="/projects/ai-nutrition-meal-planner#testing" className="text-fg underline decoration-swatch-pink decoration-2 underline-offset-4 hover:text-accent">
            AI Meal Planner case study
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
