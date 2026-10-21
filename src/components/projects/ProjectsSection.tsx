import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/primitives";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          id="projects-title"
          eyebrow="Selected projects"
          title="Things I've built and am building."
          intro="Commercial work, prototypes and personal projects. Each one is labelled with its current status. Open a project for the full story."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-16 md:mt-16 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
