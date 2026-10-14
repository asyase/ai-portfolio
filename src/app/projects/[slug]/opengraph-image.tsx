import { getProject, projects } from "@/data/projects";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project ? `Case study ${project.index}` : "Case study",
    title: project?.title ?? "Project",
    footer: project?.category ?? "",
  });
}
