import { about } from "@/data/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">About me</p>
          <h2
            id="about-title"
            className="text-balance-safe mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-fg md:text-5xl"
          >
            {about.title}
          </h2>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                <dt className="text-sm text-fg-subtle">{fact.label}</dt>
                <dd className="text-[15px] font-medium text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-fg-muted lg:col-span-7 lg:pt-10">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "text-fg" : undefined}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
