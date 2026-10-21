import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/primitives";
import { ProjectCard } from "./ProjectCard";

/** The strongest projects, shown right after the introduction. */
export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          id="projects-title"
          eyebrow="Featured projects"
          title="Things I've built and am building."
          intro="Three projects that show the most: an award-winning AI application, a commercial AI feature and a full AI platform. Each one is labelled with its current status."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-16 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Everything else, after the How I work section. */
export function ProjectsSection() {
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="more-projects" aria-labelledby="more-projects-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          id="more-projects-title"
          eyebrow="More projects"
          title="More work, from shipped to in progress."
          intro="Full-stack apps, automations, team projects and creative work. Open a project for the full story."
        />
        <ul className="mt-14 grid gap-x-10 gap-y-16 md:mt-16 md:grid-cols-2">
          {rest.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
