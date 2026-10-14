import { skillCategories } from "@/data/skills";
import { SectionHeader } from "@/components/ui/primitives";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeader id="skills-title" eyebrow="Skills & tools" title="What I work with." />
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
