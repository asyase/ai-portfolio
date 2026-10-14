import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Project, Screenshot } from "@/data/projects";
import { site } from "@/data/site";
import { getProjectImages } from "@/lib/projectImages";
import { cn } from "@/lib/utils";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  kind: Screenshot["kind"];
  width?: number;
  height?: number;
  pending?: boolean;
};

/** All screenshots for a project: files in its folder first, then any listed in the data file. */
export function getScreenshots(project: Project): Shot[] {
  const fromFolder: Shot[] = getProjectImages(project.slug, project.title);
  const fromData: Shot[] = project.screenshots
    .filter((s) => s.src && (project.status !== "commercial" || s.approved))
    .map((s) => ({ src: s.src, alt: s.alt, caption: s.caption, kind: s.kind, width: s.width, height: s.height }));
  const shots = [...fromFolder, ...fromData];
  if (shots.length > 0) return shots;
  // Nothing yet: show the empty slots from the data file while placeholder notes are on.
  return site.showPlaceholderNotes
    ? project.screenshots.map((s) => ({ src: "", alt: s.alt, caption: s.caption, kind: s.kind, pending: true }))
    : [];
}

const isPortrait = (s: Shot) => !!s.width && !!s.height && s.height > s.width * 1.15;

function Caption({ shot }: { shot: Shot }) {
  return (
    <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm text-fg-subtle">
      <span>{shot.caption}</span>
      <span className="shrink-0 text-xs">{shot.kind === "mockup" ? "Mockup" : "Screenshot"}</span>
    </figcaption>
  );
}

function Picture({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <a
      href={shot.src}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border border-line bg-surface-2"
      aria-label={`Open full size: ${shot.caption}`}
    >
      {shot.width && shot.height ? (
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
        />
      ) : (
        <span className="relative block aspect-[16/10]">
          <Image src={shot.src} alt={shot.alt} fill sizes={sizes} className="object-contain p-2" />
        </span>
      )}
    </a>
  );
}

export function Screenshots({ project }: { project: Project }) {
  const shots = getScreenshots(project);
  if (shots.length === 0) return null;

  if (shots.every((s) => s.pending)) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {shots.map((shot, i) => (
          <figure key={i} className={cn(shots.length === 1 && "sm:col-span-2")}>
            <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-warn/30 bg-surface-2 text-center">
              <ImageIcon className="size-6 text-fg-subtle" aria-hidden="true" />
              <p className="max-w-xs px-4 font-mono text-xs leading-relaxed text-warn">
                Add screenshots to /public/projects/{project.slug}/
              </p>
            </div>
            <Caption shot={shot} />
          </figure>
        ))}
      </div>
    );
  }

  const wide = shots.filter((s) => !isPortrait(s));
  const tall = shots.filter(isPortrait);

  return (
    <div className="space-y-10">
      {wide.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2">
          {wide.map((shot, i) => (
            <figure key={shot.src} className={cn((wide.length === 1 || i === 0) && "sm:col-span-2")}>
              <Picture shot={shot} sizes={i === 0 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"} />
              <Caption shot={shot} />
            </figure>
          ))}
        </div>
      )}
      {tall.length > 0 && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {tall.map((shot) => (
            <figure key={shot.src}>
              <Picture shot={shot} sizes="(min-width: 768px) 20vw, 50vw" />
              <Caption shot={shot} />
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
