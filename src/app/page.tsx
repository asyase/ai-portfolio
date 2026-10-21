import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { HowIWork } from "@/components/home/HowIWork";
import { Skills } from "@/components/home/Skills";
import { Contact } from "@/components/home/Contact";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { education, site } from "@/data/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Full-Stack Developer",
    alumniOf: { "@type": "CollegeOrUniversity", name: education.schoolFull },
    url: site.url,
    sameAs: [site.contact.linkedin, site.contact.github].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <HowIWork />
      <ProjectsSection />
      <Skills />
      <Contact />
    </>
  );
}
