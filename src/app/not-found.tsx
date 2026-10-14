import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="flex min-h-[75dvh] items-center pt-24">
      <div className="container-page">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-[1] tracking-[-0.04em] text-fg md:text-7xl">Page not found.</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-fg-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back home
          </ButtonLink>
          <ButtonLink href="/#projects" variant="secondary">
            View projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
