import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import type { Project } from "@/data/projects";
import { hasContent } from "@/lib/content";
import { Badge, StatusPill } from "@/components/ui/primitives";
import { ProjectCover } from "./ProjectCover";

export function ProjectCard({ project }: { project: Project }) {
  const technologies = project.technologies
    .map((t) => t.name)
    .filter(hasContent)
    .slice(0, 4);

  return (
    <article className="group relative flex flex-col">
      <ProjectCover project={project} />

      <div className="mt-5 flex items-start justify-between gap-4">
        <p className="text-sm text-fg-subtle">
          {project.category}
          {project.company && <span className="block text-fg-muted">For {project.company}</span>}
        </p>
        <StatusPill status={project.status} className="text-[10px]" />
      </div>

      <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-fg md:text-[1.75rem]">
        <Link
          href={`/projects/${project.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
        >
          {project.title}
        </Link>
      </h3>
      {project.recognition && project.recognition.length > 0 && (
        <p className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#fbeedd] px-3 py-1.5 text-[13px] font-medium text-[#8a5300]">
          <Award className="size-4" aria-hidden="true" />
          {project.recognition.join(" · ")}
        </p>
      )}
      <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{project.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
        {technologies.map((t) => (
          <li key={t}>
            <Badge>{t}</Badge>
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent" aria-hidden="true">
        View project
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </article>
  );
}
