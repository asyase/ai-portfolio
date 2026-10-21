import Image from "next/image";
import { cn } from "@/lib/utils";
import { experimentMeta, judgeRows, promptQuality, settingsColumns, thinkingRuns } from "./data";

function ExperimentHeader({ n, topic, title }: { n: string; topic: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
        Experiment {n} / {topic}
      </p>
      <h3 className="mt-3 font-display text-3xl font-bold leading-[1.02] tracking-[-0.035em] text-fg md:text-5xl">{title}</h3>
    </div>
  );
}

/** Two values on one scale: a thin line with a dot at each value. */
function ScalePair({
  label,
  low,
  high,
  format,
}: {
  label: string;
  low: number;
  high: number;
  format: (v: number) => string;
}) {
  const max = Math.max(low, high);
  const pct = (v: number) => `${(v / max) * 100}%`;
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{label}</p>
      {[
        { name: "LOW", v: low, dot: "bg-fg" },
        { name: "HIGH", v: high, dot: "bg-swatch-lavender ring-2 ring-fg" },
      ].map((r) => (
        <div key={r.name} className="mt-3 grid grid-cols-[3.25rem_1fr] items-center gap-3">
          <span className="font-mono text-[11px] text-fg-muted">{r.name}</span>
          <div className="relative h-6">
            <span className="absolute inset-x-0 top-1/2 h-px bg-line-strong" aria-hidden="true" />
            <span className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-fg/70" style={{ width: pct(r.v) }} aria-hidden="true" />
            <span
              className={cn("absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full", r.dot)}
              style={{ left: pct(r.v) }}
              aria-hidden="true"
            />
            <span
              className="absolute -top-0.5 whitespace-nowrap font-mono text-[12px] text-fg"
              style={r.v / max > 0.6 ? { right: `calc(${100 - (r.v / max) * 100}% + 0.9rem)` } : { left: `calc(${pct(r.v)} + 0.9rem)` }}
            >
              {format(r.v)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TestingTheIntelligence({ number }: { number: string }) {
  const r1 = thinkingRuns[0];
  const tokenX = (r1.high.tokens / r1.low.tokens).toFixed(1);
  const timeX = Math.round(r1.high.seconds / r1.low.seconds);

  return (
    <section id="testing" aria-labelledby="testing-title" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="container-page">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
          <span className="text-accent">{number}</span> / Evaluation · measured findings
        </p>
        <h2 id="testing-title" className="mt-5 font-display text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-fg">
          Testing the intelligence.
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <p className="max-w-2xl text-xl leading-relaxed text-fg-muted lg:col-span-8 md:text-2xl">
            How I checked whether the AI was actually good, and where the checks themselves failed.
          </p>
          <p className="self-end font-mono text-[11px] leading-relaxed text-fg-subtle lg:col-span-4">
            {experimentMeta}. These are results of specific experiments, not accuracy rates.
          </p>
        </div>

        {/* ── 01 Prompt quality ── */}
        <article className="mt-20 border-t border-fg pt-10" aria-labelledby="exp1">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5">
              <div id="exp1">
                <ExperimentHeader n="01" topic="Prompt quality" title="Same hard input. Two prompts." />
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
                Input on purpose: <span className="font-mono text-fg">munad, piim, tomat, juust, kummikommid, aperol spritz</span>{" "}
                (eggs, milk, tomato, cheese, gummy bears, Aperol Spritz). Would the model build a &quot;recipe&quot; out of products that don&apos;t belong together?
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                <b className="text-fg">v2</b> added a role, grounding rules, a quality rule (&quot;leave unsuitable products out&quot;), a one-shot JSON example and security rules.
              </p>
              <div className="mt-8 flex items-end gap-10">
                {promptQuality.map((row) => (
                  <div key={row.prompt}>
                    <p className="font-display text-7xl font-bold leading-none tracking-[-0.05em] text-fg md:text-8xl">
                      {row.absurd.filter(Boolean).length}
                      <span className="text-fg-subtle">/4</span>
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                      {row.prompt} · {row.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-fg-subtle">settings that produced the absurd recipe</p>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <p className="mb-2 font-mono text-[11px] text-fg-subtle sm:hidden" aria-hidden="true">
                Scroll sideways to see all four settings →
              </p>
              <div className="overflow-x-auto" role="region" aria-label="Prompt and settings matrix" tabIndex={0}>
                <table className="w-full min-w-[34rem] border-separate border-spacing-2 text-left">
                  <caption className="sr-only">Which prompt and setting produced the absurd &quot;Aperol + gummy bears&quot; recipe</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="w-16" />
                      {settingsColumns.map((c) => (
                        <th key={c.name} scope="col" className="align-bottom font-normal">
                          <span className="block text-[13px] font-semibold text-fg">{c.name}</span>
                          <span className="block font-mono text-[10px] text-fg-subtle">{c.detail}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {promptQuality.map((row) => (
                      <tr key={row.prompt}>
                        <th scope="row" className="font-mono text-sm font-semibold text-fg">
                          {row.prompt}
                        </th>
                        {row.absurd.map((bad, i) => (
                          <td key={i}>
                            <div
                              className={cn(
                                "flex h-24 flex-col justify-between rounded-xl p-3",
                                bad ? "bg-fg text-bg" : "border border-line-strong bg-surface text-fg",
                              )}
                            >
                              <span className="text-xl" aria-hidden="true">
                                {bad ? "✕" : "✓"}
                              </span>
                              <span className="text-[12px] leading-tight">
                                {bad ? "absurd recipe" : "no absurd recipe"}
                                <span className={cn("mt-1 block font-mono text-[10px]", bad ? "text-bg/70" : "text-fg-subtle")}>
                                  {row.tokens[i].toLocaleString("en-US")} tokens
                                </span>
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                v1 with HIGH thinking also avoided the absurd recipe, but it used about 1.8× more tokens and was about 3× slower than v2 with LOW thinking. Choice for
                recipes: <b className="text-fg">v2 · balanced · LOW</b>.
              </p>
            </div>
          </div>
        </article>

        {/* ── 02 Thinking effort ── */}
        <article className="mt-24 border-t border-fg pt-10" aria-labelledby="exp2">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5">
              <div id="exp2">
                <ExperimentHeader n="02" topic="Thinking effort" title="More thinking, no better result." />
              </div>
              <div className="mt-8 flex flex-wrap items-end gap-10">
                <div>
                  <p className="font-display text-7xl font-bold leading-none tracking-[-0.05em] text-fg md:text-8xl">{tokenX}×</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">more tokens with HIGH</p>
                </div>
                <div>
                  <p className="font-display text-7xl font-bold leading-none tracking-[-0.05em] text-fg md:text-8xl">{timeX}×</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">slower with HIGH</p>
                </div>
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
                Input: <span className="font-mono text-fg">munad, piim, tomat, juust</span>. Thinking level is how much the model reasons before answering, and those tokens are paid for.
                In this comparison, more reasoning did not improve the result, so recipes use <b className="text-fg">LOW</b>.
              </p>
            </div>
            <div className="min-w-0 space-y-12 lg:col-span-7">
              {thinkingRuns.map((run) => (
                <div key={run.label}>
                  <p className="font-mono text-xs text-fg">{run.label}</p>
                  <div className="mt-4 grid gap-8 md:grid-cols-2">
                    <ScalePair label="Total tokens" low={run.low.tokens} high={run.high.tokens} format={(v) => v.toLocaleString("en-US")} />
                    <ScalePair label="Response time" low={run.low.seconds} high={run.high.seconds} format={(v) => `${v.toFixed(1)} s`} />
                  </div>
                  <p className="mt-4 border-l-2 border-swatch-lavender pl-4 text-sm leading-relaxed text-fg-muted">{run.quality}</p>
                </div>
              ))}
              <p className="text-sm leading-relaxed text-fg-subtle">
                Token counts also vary between runs of the same prompt (v1 balanced: 188 tokens in run 1, 725 in run 2), which is why the experiment was repeated.
              </p>
            </div>
          </div>
        </article>

        {/* ── 03 LLM-as-a-judge ── */}
        <article className="mt-24 border-t border-fg pt-10" aria-labelledby="exp3">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5">
              <div id="exp3">
                <ExperimentHeader n="03" topic="LLM-as-a-judge" title="The judge was fooled." />
              </div>
              <p className="mt-8 font-display text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-[-0.06em] text-fg">
                93<span className="text-fg-subtle">/100</span>
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">AI judge score for this answer</p>
              <blockquote className="mt-8 border-l-2 border-fg pl-5">
                <p className="font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-fg">&quot;Vala Aperol klaasi, lisa kummikommid.&quot;</p>
                <p className="mt-2 text-[15px] text-fg-muted">&quot;Pour Aperol into a glass, add gummy bears.&quot; A recipe step from experiment 01.</p>
              </blockquote>
            </div>
            <div className="min-w-0 lg:col-span-7">
              <p className="text-[15px] leading-relaxed text-fg-muted">
                A second model call scores answers on a 1–5 rubric (grounding, clarity, usefulness) at temperature 0, with structured output and a written explanation.
                A Java scorer gives 40 points for format and 60 for grounding. On the three absurd answers:
              </p>
              <table className="mt-6 w-full text-left text-sm">
                <caption className="sr-only">Scores given to the three absurd answers</caption>
                <thead className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                  <tr className="border-b border-fg">
                    <th scope="col" className="py-2 font-normal">Variant</th>
                    <th scope="col" className="py-2 font-normal">AI judge</th>
                    <th scope="col" className="py-2 font-normal">Code score</th>
                    <th scope="col" className="py-2 font-normal">Caught?</th>
                  </tr>
                </thead>
                <tbody>
                  {judgeRows.map((r) => (
                    <tr key={r.setting} className="border-b border-line">
                      <th scope="row" className="py-3 font-mono font-normal text-fg">{r.setting}</th>
                      <td className="py-3 font-display text-xl font-bold text-fg">{r.judge}</td>
                      <td className="py-3 font-display text-xl font-bold text-fg">{r.code}</td>
                      <td className="py-3 text-fg-muted">{r.caught ? "by code, only because it had < 3 steps" : "no"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
                The judge missed all three. The code score caught two, and only by accident. Neither evaluator can be trusted on its own; the most reliable fix was a rule in the
                prompt itself.
              </p>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {[
                  ["Prompt rule", "Leave unsuitable products out; at least 2 real ingredients and real cooking steps."],
                  ["Java check", "RecipeQuality.isRealRecipe(): fewer than 2 real ingredients (salt, pepper, oil, water and sugar don't count) → the recipe is removed."],
                  ["Judge setup", "Rubric, temperature 0, JSON verdict with an explanation; the answer to judge is wrapped in tags so instructions inside it are ignored."],
                  ["Known limit", "The judge is the same model that wrote the answer, so it may be lenient towards it. A different or stronger judge model would be better."],
                ].map(([t, d]) => (
                  <div key={t} className="bg-surface p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-fg">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <figure className="mt-14">
            <Image
              src="/projects/ai-nutrition-meal-planner/04-prompt-AB-tests-with-LLM-judge.png"
              alt="The app's prompt experiments page: v1 and v2 prompts across sampling settings and thinking levels, with code score, AI judge score, tokens and time."
              width={2880}
              height={2000}
              sizes="(min-width: 1152px) 68rem, 100vw"
              className="h-auto w-full rounded-2xl border border-line"
            />
            <figcaption className="mt-3 text-sm text-fg-subtle">
              The experiments page in the app: every run is stored in PostgreSQL with its prompt version, settings, both scores, tokens and time.
            </figcaption>
          </figure>
        </article>
      </div>
    </section>
  );
}
