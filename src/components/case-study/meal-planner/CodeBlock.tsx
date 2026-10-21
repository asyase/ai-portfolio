import type { CodeExcerpt } from "./data";

/** Readable code excerpt with a file label. Comments are dimmed; no other highlighting. */
export function CodeBlock({ excerpt }: { excerpt: CodeExcerpt }) {
  return (
    <figure className="min-w-0 max-w-full overflow-hidden rounded-2xl bg-[#2a1830] text-[#f6e9f3]">
      <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3 font-mono text-[11px] tracking-wide text-[#d9c2d6]">
        <span className="truncate">{excerpt.file}</span>
        <span className="shrink-0 uppercase tracking-[0.14em] text-[#b99bb5]">from the source</span>
      </figcaption>
      <pre tabIndex={0} aria-label={`Code from ${excerpt.file}`} className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-[1.7]">
        <code>
          {excerpt.code.split("\n").map((line, i) => {
            const comment = line.indexOf("//");
            return (
              <span key={i} className="block">
                {comment >= 0 ? (
                  <>
                    {line.slice(0, comment)}
                    <span className="text-[#b99bb5]">{line.slice(comment)}</span>
                  </>
                ) : (
                  line || " "
                )}
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}
