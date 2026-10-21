import { termLinks } from "@/data/site";

/** Renders text and turns known names (see `termLinks` in site.ts) into links. */
export function LinkedText({ text, className = "underline decoration-1 underline-offset-2 hover:text-accent" }: { text: string; className?: string }) {
  const terms = Object.keys(termLinks);
  if (terms.length === 0) return <>{text}</>;
  const parts = text.split(new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`));
  return (
    <>
      {parts.map((part, i) =>
        termLinks[part] ? (
          <a key={i} href={termLinks[part]} target="_blank" rel="noopener noreferrer" className={className}>
            {part}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}
