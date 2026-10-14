import { ArrowDown } from "lucide-react";
import { hero, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/primitives";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative pb-20 pt-36 md:pb-28 md:pt-48">
      <div className="bg-blush pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-page relative">
        <div className="max-w-4xl">
          {site.availability && (
            <p className="fade-up inline-flex items-center gap-2 text-sm text-fg-muted" style={d(0)}>
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              {site.availability}
              {site.location && <span className="text-fg-subtle">· {site.location}</span>}
            </p>
          )}

          <h1
            id="hero-title"
            className="fade-up mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-fg"
            style={d(60)}
          >
            {hero.greeting}
          </h1>

          <p
            className="fade-up text-balance-safe mt-6 max-w-3xl font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-snug tracking-[-0.02em] text-fg-muted"
            style={d(140)}
          >
            {hero.subtitle}
          </p>

          <p className="fade-up mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted" style={d(220)}>
            {hero.description}
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={d(300)}>
            <ButtonLink href="/#projects">
              {hero.primaryCta}
              <ArrowDown className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
