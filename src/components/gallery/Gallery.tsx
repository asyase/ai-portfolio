"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/data/gallery";
import { PlaceholderNote } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const categoryLabel = new Map(galleryCategories.map((c) => [c.id, c.label]));

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const visible = filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter);
  const current = openIndex !== null ? visible[openIndex] : undefined;

  const count = visible.length;
  const step = (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + count) % count));

  // Open/close the native dialog to match state.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (openIndex !== null && !el.open) el.showModal();
    if (openIndex === null && el.open) el.close();
  }, [openIndex]);

  // Arrow keys move between images while the dialog is open.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (delta) setOpenIndex((i) => (i === null ? i : (i + delta + count) % count));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, count]);

  return (
    <div>
      <div role="group" aria-label="Filter works by category" className="flex flex-wrap gap-2">
        {galleryCategories.map((c) => {
          const count = c.id === "all" ? galleryItems.length : galleryItems.filter((g) => g.category === c.id).length;
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                active ? "border-accent bg-accent text-accent-ink" : "border-line-strong text-fg-muted hover:border-fg/40 hover:text-fg",
              )}
            >
              {c.label}
              <span className={cn("ml-1.5 text-xs", active ? "text-accent-ink" : "text-fg-subtle")}>{count}</span>
            </button>
          );
        })}
      </div>

      {galleryItems.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line-strong px-6 py-20 text-center">
          <ImageIcon className="size-6 text-fg-subtle" aria-hidden="true" />
          <p className="text-fg-muted">Works will appear here soon.</p>
          <PlaceholderNote>Add your images to /public/gallery/ and list them in src/data/gallery.ts.</PlaceholderNote>
        </div>
      ) : visible.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center text-fg-muted">
          No works in this category yet.
        </p>
      ) : (
        <ul className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {visible.map((item, i) => (
            <li key={item.src} className="mb-8 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group block w-full overflow-hidden rounded-xl bg-surface-2 text-left"
                aria-label={`Open larger view: ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt ?? item.title}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]"
                />
              </button>
              <div className="mt-3">
                <p className="text-xs text-fg-subtle">{categoryLabel.get(item.category)}</p>
                <h3 className="mt-0.5 font-medium text-fg">{item.title}</h3>
                {item.description && <p className="mt-1 text-sm leading-relaxed text-fg-muted">{item.description}</p>}
                {item.tools.length > 0 && <p className="mt-1.5 text-xs text-fg-subtle">Made with {item.tools.join(", ")}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        className="lightbox m-auto max-h-[100dvh] w-full max-w-5xl bg-transparent p-4 text-accent-ink backdrop:cursor-zoom-out"
        aria-label={current?.title ?? "Image"}
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpenIndex(null);
        }}
      >
        {current && (
          <figure className="flex flex-col items-center">
            <Image
              src={current.src}
              alt={current.alt ?? current.title}
              width={current.width}
              height={current.height}
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="max-h-[75dvh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-4 w-full max-w-2xl text-center">
              <p className="font-medium">{current.title}</p>
              {current.description && <p className="mt-1 text-sm text-accent-ink/80">{current.description}</p>}
              <p className="mt-1 text-xs text-accent-ink/65">
                {categoryLabel.get(current.category)}
                {current.tools.length > 0 && ` · Made with ${current.tools.join(", ")}`}
              </p>
            </figcaption>
          </figure>
        )}
        <button
          type="button"
          onClick={() => setOpenIndex(null)}
          className="fixed right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          aria-label="Close"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        {visible.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              className="fixed left-4 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="fixed right-4 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </dialog>
    </div>
  );
}
