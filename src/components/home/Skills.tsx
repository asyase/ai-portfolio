import { SectionBand } from "@/components/ui/SectionBand";
import { skillCategories } from "@/data/skills";
import { SectionHeader } from "@/components/ui/primitives";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-16 pb-20 md:pb-28">
      <SectionBand mark="02" title="Skills" accent="& tools" note="Full-stack · AI · Automation · Design" />
      <div className="container-page pt-16 md:pt-24">
        <SectionHeader id="skills-title" eyebrow="By area" title="What I work with." />
        <dl className="mt-12 divide-y divide-line border-y border-line">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
              <dt className="font-display text-lg font-bold tracking-tight text-fg md:col-span-4">{cat.title}</dt>
              <dd className="text-[15px] leading-relaxed text-fg-muted md:col-span-8">{cat.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
