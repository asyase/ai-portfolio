import Link from "next/link";
import { navLinks, site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();
  const { github, linkedin } = site.contact;

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-display text-lg font-bold tracking-tight text-fg">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="text-sm text-fg-subtle">
            © {year} {site.name}. Designed &amp; built with Next.js.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
            {navLinks.map((l) => (
              <li key={l.id}>
                <Link href={l.href} className="transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {(github || linkedin) && (
            <div className="flex items-center gap-3 text-fg-muted">
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-fg">
                  <GithubIcon />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-fg">
                  <LinkedinIcon />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
