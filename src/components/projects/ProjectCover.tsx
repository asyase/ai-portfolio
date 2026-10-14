import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import { getProjectCoverImage } from "@/lib/projectImages";
import type { Project, ProjectTone } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Soft palette gradients (defined as --tone-* in globals.css). */
const toneStyle = (tone: ProjectTone): React.CSSProperties => ({ background: `var(--tone-${tone})` });

/** The image to show for a project, or undefined when there is none yet. */
function coverFor(project: Project) {
  // 1. An image dropped into /public/projects/<slug>/ (cover.* or the first file)
  const fromFolder = getProjectCoverImage(project.slug, project.title);
  if (fromFolder) return fromFolder;
  // 2. A cover set explicitly in the data file
  const cover = project.coverImage;
  if (cover?.src && (project.status !== "commercial" || cover.approved)) return cover;
  if (project.layout === "gallery" && galleryItems[0]) {
    const g = galleryItems[0];
    return { src: g.src, alt: g.alt ?? g.title };
  }
  return undefined;
}

/**
 * Project image: a screenshot from the project's folder or data when one
 * exists, otherwise a neutral tinted placeholder.
 */
export function ProjectCover({
  project,
  className,
  priority,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const cover = coverFor(project);

  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-2xl", className)} style={cover ? undefined : toneStyle(project.tone)}>
      {cover && "kind" in cover && cover.kind === "mockup" && (
        <span className="absolute bottom-3 left-3 z-10 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-medium text-fg-muted shadow-sm">
          Mockup
        </span>
      )}
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-fg/40">
          <span className="font-display text-6xl font-bold tracking-tight md:text-7xl" aria-hidden="true">
            {project.index}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-fg/55">
            <ImageIcon className="size-3.5" aria-hidden="true" />
            Screenshot coming soon
          </span>
        </div>
      )}
    </div>
  );
}
