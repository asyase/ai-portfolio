import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, ExternalLink } from "lucide-react";
import {
  featureStatusLabel,
  getAdjacentProjects,
  getProject,
  projects,
  type AutomationWorkflow,
  type FeatureStatus,
  type Project,
} from "@/data/projects";
import { site } from "@/data/site";
import { hasContent, isTodo } from "@/lib/content";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Badge, ButtonLink, FeatureStatusBadge, PlaceholderNote, StatusPill, Text } from "@/components/ui/primitives";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { LinkedText } from "@/components/ui/LinkedText";
import { Gallery } from "@/components/gallery/Gallery";
import { CaseStudyToc } from "@/components/case-study/CaseStudyToc";
import { FlowDiagram } from "@/components/case-study/FlowDiagram";
import { BehindTheIntelligence } from "@/components/case-study/meal-planner/BehindTheIntelligence";
import { TestingTheIntelligence } from "@/components/case-study/meal-planner/TestingTheIntelligence";
import { ReadingProgress } from "@/components/case-study/ReadingProgress";
import { Screenshots, getScreenshots } from "@/components/case-study/Screenshots";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Case study`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} · ${site.name}`,
      description: project.description,
      url: `/projects/${project.slug}`,
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.description },
  };
}

/* ── helpers ─────────────────────────────────────────────────────────────── */

const notes = site.showPlaceholderNotes;
const hasAny = (items: string[]) => items.some(hasContent) || (notes && items.some(isTodo));

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line py-14 first:border-t-0 first:pt-0 md:py-20">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-accent">{number}</span>
        <h2 id={`${id}-title`} className="font-display text-2xl font-bold tracking-[-0.03em] text-fg md:text-[2.1rem]">
          {title}
        </h2>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

const prose = "max-w-[42rem] text-[17px] leading-[1.75] text-fg-muted";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-[42rem] space-y-3">
      {items.map((item, i) =>
        isTodo(item) ? (
          notes && (
            <li key={i}>
              <Text value={item} />
            </li>
          )
        ) : (
          <li key={i} className="flex gap-4 text-[17px] leading-relaxed text-fg-muted">
            <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
            <span>
              <LinkedText text={item} />
            </span>
          </li>
        ),
      )}
    </ul>
  );
}

function FeatureTable({ features }: { features: Project["features"] }) {
  const order: FeatureStatus[] = ["implemented", "prototype", "planned"];
  const sorted = [...features].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-line">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg-raised px-5 py-4">
        <h3 className="text-[15px] font-medium text-fg">Feature status</h3>
        <p className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-fg-subtle">
          {order.map((s) => (
            <span key={s}>
              {features.filter((f) => f.status === s).length} {featureStatusLabel[s].toLowerCase()}
            </span>
          ))}
        </p>
      </div>
      <ul className="divide-y divide-line">
        {sorted.map((f) => (
          <li key={f.label} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[15px] text-fg">{f.label}</p>
              {f.note && <Text value={f.note} className="mt-2 w-fit text-sm text-fg-subtle" />}
            </div>
            <FeatureStatusBadge status={f.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function AutomationCard({ workflow }: { workflow: AutomationWorkflow }) {
  const rows: [string, React.ReactNode][] = [
    ["Trigger", workflow.trigger],
    ["Connected systems", workflow.connectedSystems.join(" · ")],
    [
      "Processing steps",
      <ol key="steps" className="list-decimal space-y-1 pl-4">
        {workflow.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>,
    ],
    ["Output", workflow.output],
    ["Business value", workflow.businessValue],
  ];
  return (
    <article className="overflow-hidden rounded-2xl border border-line">
      <h3 className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-bg-raised px-5 py-4 text-[15px] font-medium text-fg">
        {workflow.name}
        {workflow.note && (
          <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-[11px] font-normal text-fg-muted">{workflow.note}</span>
        )}
      </h3>
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{k}</dt>
            <dd className="text-[15px] text-fg-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function AutomationTemplate() {
  const fields = ["Trigger", "Connected systems", "Processing steps", "Output", "Business value", "Workflow screenshot"];
  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-line-strong">
      <div className="border-b border-dashed border-line-strong px-5 py-4">
        <h3 className="text-[15px] font-medium text-fg">Workflow template</h3>
        <p className="mt-1 text-sm text-fg-subtle">Each documented workflow appears here with the same structure.</p>
      </div>
      <dl className="grid sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f} className="border-b border-dashed border-line px-5 py-4 last:border-b-0 sm:odd:border-r">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">{f}</dt>
            <dd className="mt-2 h-2 w-2/3 rounded-full bg-fg/[0.08]" aria-label="Not documented yet" />
          </div>
        ))}
      </dl>
      <div className="px-5 pb-5">
        <PlaceholderNote className="mt-4">Add workflows to the `automations` array in src/data/projects.ts.</PlaceholderNote>
      </div>
    </div>
  );
}

/* ── page ────────────────────────────────────────────────────────────────── */

export default async function CaseStudyPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);
  const isGallery = project.layout === "gallery";
  const company = project.company;
  const automations = project.automations ?? [];
  const isAutomationCollection = project.automations !== undefined;

  const show = {
    overview: true,
    problem: true,
    role: hasContent(project.role) || (notes && isTodo(project.role)),
    approach: true,
    technologies: project.technologies.length > 0,
    how: project.howItWorks.length > 0 || automations.length > 0 || isAutomationCollection,
    architecture: project.workflow.length > 0,
    screenshots: getScreenshots(project).length > 0 || notes,
    challenges: project.challenges.length > 0 || notes,
    results: hasAny(project.results) || hasAny(project.lessons) || notes,
  };

  const deepDive = project.deepDive === "meal-planner";
  const sections = [
    { id: "overview", label: "Overview", on: show.overview },
    { id: "problem", label: "The problem", on: show.problem },
    { id: "role", label: "My role", on: show.role },
    { id: "approach", label: "The approach", on: show.approach },
    { id: "technologies", label: "Technologies", on: show.technologies },
    { id: "how-it-works", label: "How it works", on: show.how },
    { id: "architecture", label: deepDive ? "Behind the intelligence" : "Architecture", on: show.architecture },
    { id: "testing", label: "Testing the intelligence", on: deepDive },
    { id: "screenshots", label: "Screenshots & demo", on: show.screenshots },
    { id: "challenges", label: "Challenges & solutions", on: show.challenges },
    { id: "results", label: "Results & lessons", on: show.results },
  ].filter((s) => s.on);

  const num = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  const meta: { label: string; value: React.ReactNode }[] = [
    { label: "Category", value: project.category },
    { label: "Status", value: <StatusPill status={project.status} className="text-fg" /> },
    ...(company ? [{ label: "Context", value: `${project.context ?? "Work"} for ${company}` }] : project.context ? [{ label: "Context", value: project.context }] : []),
    ...(hasContent(project.year) ? [{ label: "Year", value: project.year }] : []),
    ...(project.recognition?.length
      ? [
          {
            label: "Recognition",
            value: (
              <ul className="space-y-1">
                {project.recognition.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <Award className="mt-0.5 size-4 shrink-0 text-[#8a5300]" aria-hidden="true" />
                    <span>
                      <LinkedText text={r} />
                    </span>
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
  ];

  const technologies = project.technologies.filter((t) => hasContent(t.name) || (notes && isTodo(t.name)));

  const rest = (
    <>
          {show.screenshots && (
            <Section id="screenshots" number={num("screenshots")} title="Screenshots & demo">
              {getScreenshots(project).length > 0 ? (
                <Screenshots project={project} />
              ) : (
                <PlaceholderNote>Add screenshots to /public/projects/{project.slug}/. They appear here automatically.</PlaceholderNote>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-fg hover:text-accent">
                  Open the live demo <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </Section>
          )}

          {show.challenges && (
            <Section id="challenges" number={num("challenges")} title="Challenges & solutions">
              {project.challenges.length > 0 ? (
                <ul className="space-y-4">
                  {project.challenges.map((c) => (
                    <li key={c.challenge} className="grid overflow-hidden rounded-2xl border border-line md:grid-cols-2">
                      <div className="border-b border-line bg-bg-raised p-6 md:border-b-0 md:border-r">
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Challenge</p>
                        <p className="mt-3 text-[15px] leading-relaxed text-fg">{c.challenge}</p>
                      </div>
                      <div className="p-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Solution</p>
                        <Text value={c.solution} className="mt-3 text-[15px] leading-relaxed text-fg-muted" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <PlaceholderNote>Document challenges as the work progresses.</PlaceholderNote>
              )}
            </Section>
          )}

          {show.results && (
            <Section id="results" number={num("results")} title="Results & lessons learned">
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <h3 className="eyebrow">Results</h3>
                  <div className="mt-5">
                    {project.results.length > 0 ? <BulletList items={project.results} /> : <PlaceholderNote>Add verifiable results when available.</PlaceholderNote>}
                  </div>
                </div>
                <div>
                  <h3 className="eyebrow">Lessons learned</h3>
                  <div className="mt-5">
                    {project.lessons.length > 0 ? <BulletList items={project.lessons} /> : <PlaceholderNote>Add lessons learned.</PlaceholderNote>}
                  </div>
                </div>
              </div>
            </Section>
          )}
    </>
  );

  return (
    <article className="fade-up">
      <ReadingProgress />

      {/* ── Header ── */}
      <header className="pt-28 md:pt-36">
        <div className="container-page relative">
          <Link href="/#projects" className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg">
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">
                <span className="text-accent">{isGallery ? "Gallery" : "Case study"} {project.index}</span> · {project.category}
              </p>
              <h1 className="text-balance-safe mt-6 font-display text-[clamp(2.6rem,6.4vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-fg">
                {project.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl">{project.description}</p>
              {(project.githubUrl || project.demoUrl || project.links?.length) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <ButtonLink href={project.demoUrl} external>
                      Live demo <ExternalLink className="size-4" aria-hidden="true" />
                    </ButtonLink>
                  )}
                  {project.githubUrl && (
                    <ButtonLink href={project.githubUrl} external variant="secondary">
                      <GithubIcon size={16} /> Source code
                    </ButtonLink>
                  )}
                  {project.links?.map((link) => (
                    <ButtonLink
                      key={link.url}
                      href={link.url}
                      external
                      variant="secondary"
                      download={link.url.endsWith(".json") ? "" : undefined}
                    >
                      {link.label} <ArrowUpRight className="size-4" aria-hidden="true" />
                    </ButtonLink>
                  ))}
                </div>
              )}
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-end border-t border-line pt-6 lg:col-span-4 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="eyebrow">{m.label}</dt>
                  <dd className="mt-2 text-[15px] text-fg">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {!isGallery && (
            <ProjectCover project={project} priority sizes="(min-width: 1152px) 68rem, 100vw" className="mt-14 aspect-[16/9] md:mt-16" />
          )}
        </div>
      </header>

      {/* ── Body ── */}
      {isGallery ? (
        <div className="container-page py-14 md:py-20">
          <p className={prose}>{project.overview}</p>
          <div className="mt-12">
            <Gallery />
          </div>
        </div>
      ) : (
      <div className="container-page grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <CaseStudyToc sections={sections.map(({ id, label }) => ({ id, label }))} />
        </aside>

        <div className="min-w-0 lg:col-span-9 xl:col-span-8 xl:col-start-5">
          <Section id="overview" number={num("overview")} title="Overview">
            <p className={prose}>{project.overview}</p>
            {project.highlights.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <li key={h} className="rounded-lg border border-line bg-bg-raised px-3 py-2 text-sm text-fg">
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {project.features.length > 0 && <FeatureTable features={project.features} />}
          </Section>

          <Section id="problem" number={num("problem")} title="The problem">
            <p className={prose}>{project.problem}</p>
          </Section>

          {show.role && (
            <Section id="role" number={num("role")} title="My role">
              <Text value={project.role} className={prose} />
            </Section>
          )}

          <Section id="approach" number={num("approach")} title="The approach">
            <p className={prose}>{project.solution}</p>
            {hasAny(project.implementationDetails) && (
              <div className="mt-10">
                <h3 className="eyebrow">Implementation details</h3>
                <div className="mt-5">
                  <BulletList items={project.implementationDetails} />
                </div>
              </div>
            )}
          </Section>

          {show.technologies && (
            <Section id="technologies" number={num("technologies")} title="Technologies used">
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {technologies.map((t, i) => (
                  <li key={`${t.name}-${i}`} className="bg-bg p-5 sm:last:odd:col-span-2">
                    {isTodo(t.name) ? <Text value={t.name} /> : <Badge className="text-fg">{t.name}</Badge>}
                    {t.usedFor && <Text value={t.usedFor} className="mt-3 text-[15px] leading-relaxed text-fg-muted" />}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {show.how && (
            <Section id="how-it-works" number={num("how-it-works")} title="How it works">
              <ol className="grid gap-4 sm:grid-cols-2">
                {project.howItWorks.map((step, i) => (
                  <li key={step.title} className="rounded-2xl border border-line bg-surface/40 p-6">
                    <span className="font-mono text-xs text-accent">Step {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-lg font-medium text-fg">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{step.description}</p>
                  </li>
                ))}
              </ol>
              {isAutomationCollection && (
                <div className="mt-10 space-y-5">
                  {automations.map((w) => (
                    <AutomationCard key={w.name} workflow={w} />
                  ))}
                  {automations.length === 0 && notes && <AutomationTemplate />}
                </div>
              )}
            </Section>
          )}

          {show.architecture && !deepDive && (
            <Section id="architecture" number={num("architecture")} title="Architecture & workflow">
              <FlowDiagram nodes={project.workflow} title={project.title} />
            </Section>
          )}

          {!deepDive && rest}
        </div>
      </div>
      )}

      {!isGallery && deepDive && (
        <>
          <BehindTheIntelligence number={num("architecture")} />
          <TestingTheIntelligence number={num("testing")} />
          <div className="container-page grid gap-10 border-t border-line pb-20 pt-6 md:pb-28 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-9 lg:col-start-4 xl:col-span-8 xl:col-start-5">{rest}</div>
          </div>
        </>
      )}

      {/* ── Prev / next ── */}
      <nav aria-label="More projects" className="border-t border-line">
        <div className="container-page grid md:grid-cols-2">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-3 border-b border-line py-10 md:border-b-0 md:border-r md:pr-10">
              <span className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> Previous · {prev.index}
              </span>
              <span className="font-display text-2xl font-bold tracking-[-0.03em] text-fg transition-colors group-hover:text-accent md:text-3xl">{prev.title}</span>
            </Link>
          ) : (
            <span className="hidden md:block md:border-r md:border-line" />
          )}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="group flex flex-col items-end gap-3 py-10 text-right md:pl-10">
              <span className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
                Next · {next.index} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-bold tracking-[-0.03em] text-fg transition-colors group-hover:text-accent md:text-3xl">{next.title}</span>
            </Link>
          ) : (
            <Link href="/#contact" className="group flex flex-col items-end gap-3 py-10 text-right md:pl-10">
              <span className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
                That&apos;s all for now <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-bold tracking-[-0.03em] text-fg transition-colors group-hover:text-accent md:text-3xl">Let&apos;s talk about yours</span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
