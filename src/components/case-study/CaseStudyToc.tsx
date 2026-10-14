"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CaseStudyToc({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Case study sections" className="sticky top-28">
      <p className="eyebrow">Contents</p>
      <ol className="mt-5 space-y-1 border-l border-line">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-3 border-l py-1.5 pl-4 text-[13px] transition-colors duration-300",
                  isActive ? "border-accent text-fg" : "border-transparent text-fg-subtle hover:text-fg-muted",
                )}
              >
                <span className={cn("font-mono text-[11px]", isActive ? "text-accent" : "")}>{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
