import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import {
  featureStatusLabel,
  projectStatusLabel,
  type FeatureStatus,
  type ProjectStatus,
} from "@/data/projects";
import { isTodo, todoText } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ── Buttons ─────────────────────────────────────────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "h-12 px-6 bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "h-12 px-6 border border-line-strong text-fg hover:border-fg/50 hover:bg-surface",
  ghost: "h-9 px-3 text-fg-muted hover:text-fg",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(buttonBase, buttonVariants[variant], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

/* ── Badges & status ─────────────────────────────────────────────────────── */

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-surface-2 px-2.5 py-1 text-xs leading-none text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

const projectStatusDot: Record<ProjectStatus, string> = {
  commercial: "bg-accent",
  completed: "bg-accent",
  "in-development": "bg-info",
  prototype: "bg-warn",
  experimental: "bg-fg-muted",
};

export function StatusPill({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted", className)}>
      <span className={cn("size-1.5 rounded-full", projectStatusDot[status])} aria-hidden="true" />
      {projectStatusLabel[status]}
    </span>
  );
}

const featureStatusStyle: Record<FeatureStatus, string> = {
  implemented: "border-accent-line bg-accent-soft text-accent",
  prototype: "border-warn/35 bg-warn/10 text-warn",
  planned: "border-line-strong bg-transparent text-fg-muted border-dashed",
};

export function FeatureStatusBadge({ status }: { status: FeatureStatus }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.12em]",
        featureStatusStyle[status],
      )}
    >
      {featureStatusLabel[status]}
    </span>
  );
}

/* ── Section header ──────────────────────────────────────────────────────── */

export function SectionHeader({
  eyebrow,
  title,
  intro,
  className,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="text-balance-safe mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-fg md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-fg-muted">{intro}</p>}
    </div>
  );
}

/* ── Placeholder-aware text ──────────────────────────────────────────────── */

/** Dashed note for content that still needs to be written. Hidden when notes are off. */
export function PlaceholderNote({ children, className }: { children: React.ReactNode; className?: string }) {
  if (!site.showPlaceholderNotes) return null;
  return (
    <span
      className={cn(
        "flex items-start gap-2 rounded-lg border border-dashed border-warn/40 bg-[#fff6dc] px-3 py-2 font-mono text-xs leading-relaxed text-warn",
        className,
      )}
    >
      <span aria-hidden="true">✎</span>
      <span>
        <span className="sr-only">Placeholder: </span>
        {children}
      </span>
    </span>
  );
}

/** Renders a string from the data files, turning `todo()` values into notes. */
export function Text({
  value,
  className,
  as: Tag = "p",
}: {
  value: string | undefined;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  if (!value) return null;
  if (isTodo(value)) {
    // Keep only spacing/width classes - the note has its own typography.
    const layout = className?.split(" ").filter((c) => /^(m[trblxy]?-|w-fit|max-w-)/.test(c)).join(" ");
    return <PlaceholderNote className={cn("w-fit max-w-[42rem]", layout)}>{todoText(value)}</PlaceholderNote>;
  }
  return <Tag className={className}>{value}</Tag>;
}

/* ── Inline arrow link ───────────────────────────────────────────────────── */

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-300 ease-out-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
