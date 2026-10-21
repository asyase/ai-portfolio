import { ArrowUpRight, Download, Mail } from "lucide-react";
import { contactCopy, site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { PlaceholderNote } from "@/components/ui/primitives";
import { CopyEmail } from "./CopyEmail";

type ContactRow = {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
  download?: boolean;
  missing: string;
};

export function Contact() {
  const { email, linkedin, github, cv } = site.contact;
  const emailIsPlaceholder = email.endsWith("@example.com");

  const rows: ContactRow[] = [
    {
      label: "LinkedIn",
      value: "Connect professionally",
      href: linkedin,
      icon: <LinkedinIcon size={16} />,
      external: true,
      missing: "Add your LinkedIn URL in src/data/site.ts",
    },
    {
      label: "GitHub",
      value: "Code & experiments",
      href: github,
      icon: <GithubIcon size={16} />,
      external: true,
      missing: "Add your GitHub URL in src/data/site.ts",
    },
    {
      label: "Download CV",
      value: "PDF",
      href: cv,
      icon: <Download className="size-4" aria-hidden="true" />,
      download: true,
      missing: "Add your CV to /public/cv/ and set contact.cv in src/data/site.ts",
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <p className="eyebrow">Contact</p>

        <h2
          id="contact-title"
          className="text-balance-safe mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-fg md:text-6xl"
        >
          {contactCopy.headline}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">{contactCopy.description}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">Email</p>
            <a
              href={`mailto:${email}`}
              className="group mt-3 inline-flex max-w-full items-center gap-3 font-display text-[clamp(1rem,5.2vw,1.5rem)] font-bold [overflow-wrap:anywhere] tracking-[-0.02em] text-fg transition-colors hover:text-accent sm:text-3xl"
            >
              <Mail className="size-6 shrink-0 text-fg-subtle transition-colors group-hover:text-accent" aria-hidden="true" />
              {email}
            </a>
            {emailIsPlaceholder && (
              <PlaceholderNote className="mt-3 w-fit">Replace the placeholder address in src/data/site.ts</PlaceholderNote>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${email}`}
                className="group/btn inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
              >
                Write to me
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />
              </a>
              <CopyEmail email={email} />
            </div>
          </div>

          <ul className="divide-y divide-line border-y border-line lg:col-span-5 lg:col-start-8">
            {rows.map((row) =>
              row.href ? (
                <li key={row.label}>
                  <a
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(row.download ? { download: "" } : {})}
                    className="group flex items-center justify-between gap-4 py-5 transition-colors"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex size-9 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-colors group-hover:border-accent-line group-hover:text-accent">
                        {row.icon}
                      </span>
                      <span>
                        <span className="block text-[15px] font-medium text-fg">{row.label}</span>
                        <span className="block text-sm text-fg-subtle">{row.value}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                  </a>
                </li>
              ) : site.showPlaceholderNotes ? (
                <li key={row.label} className="flex flex-col gap-2 py-5">
                  <span className="flex items-center gap-4 text-fg-subtle">
                    <span className="flex size-9 items-center justify-center rounded-full border border-dashed border-line-strong">{row.icon}</span>
                    <span className="text-[15px]">{row.label}</span>
                  </span>
                  <PlaceholderNote>{row.missing}</PlaceholderNote>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
