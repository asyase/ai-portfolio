/**
 * Personal information, navigation and global copy.
 *
 * Empty strings are treated as "not set yet": the related link or detail is
 * hidden on the public site (or shown as a pending note while
 * `showPlaceholderNotes` is true).
 */

/** Education - used in the hero, About and metadata. */
export const education = {
  degree: "BSc in Computer Science",
  school: "Tallinn University",
  schoolFull: "Tallinn University",
} as const;

export const site = {
  name: "Anastasija",
  role: "Full-Stack Developer · AI & Automation",

  /** Production URL. Set NEXT_PUBLIC_SITE_URL in Vercel, or edit the fallback. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  title: "Anastasija | Full-Stack Developer, now building with AI",
  description:
    "Portfolio of Anastasija, a full-stack developer with a BSc in Computer Science from Tallinn University, now building AI integrations, API-driven applications and automated workflows.",

  /** Optional - leave empty to hide. Example: "Tallinn, Estonia · Open to remote" */
  location: "Tallinn, Estonia · open to remote / hybrid",
  /** Optional availability line shown in the hero and contact section. */
  availability: "Open to opportunities",

  /**
   * While true, unfinished content (written as `todo("…")` in the data files)
   * is rendered as a dashed "to be documented" note so you can see what is
   * missing. Set to false before publishing to hide those notes entirely.
   */
  showPlaceholderNotes: false,

  contact: {
    /** Shown in the Contact section. */
    email: "selevjorstovaa@gmail.com",
    /** Full URL, e.g. https://www.linkedin.com/in/your-handle - empty hides the link. */
    linkedin: "https://www.linkedin.com/in/anastasija-selevjorstova-748779172",
    /** Full URL, e.g. https://github.com/your-handle - empty hides the link. */
    github: "https://github.com/asyase",
    /** Put your PDF in /public/cv/ and set e.g. "/cv/anastasija-cv.pdf". Empty hides the button. */
    cv: "",
  },
} as const;

export const navLinks = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

export const hero = {
  greeting: "Hi, I'm Anastasija.",
  subtitle: "Full-Stack Developer with a background in Computer Science, now working with AI & Automation.",
  description: `I have a Bachelor's degree in Computer Science from ${education.school} and experience in web development. I'm now expanding my work into AI-powered applications, API integrations, and workflow automation.`,
  primaryCta: "View Projects",
  secondaryCta: "Contact",
} as const;

export const about = {
  title: "A developer first, now building with AI.",
  paragraphs: [
    `I studied Computer Science at ${education.school} (Institute of Digital Technologies), where I built my foundation in software development: writing code, designing systems and approaching problems in a structured way. A UX/UI background helps me look at what I build from the user's side too.`,
    "Since 2024 I've worked as a developer on real products: e-commerce websites, and later full-stack work on a business platform: JavaScript and Go Templates on the frontend, SQL and REST APIs behind it, and integrations such as e-invoicing flows with XML parsing.",
    "That's also where AI became part of my day job: I integrated the Anthropic Claude API into the company's commercial website builder and built the prompt input and the preview for the generated content. In 2026 I completed the AI Full-Stack Developer programme at BCS Koolitus, and now I understand these processes even more deeply: from structured prompting and grounding to building, testing and running AI features inside full-stack applications, including LLMOps.",
    "Today I work with Claude, ChatGPT, Gemini, n8n, Cursor, Claude Code and OpenAI Codex alongside my development stack. For me, AI is an extension of software development, not a replacement for it.",
    "I enjoy learning new technologies, solving technical problems and turning ideas into working applications.",
  ],
  /** Short facts shown next to the text. */
  facts: [
    { label: "Education", value: `${education.degree}, ${education.school} (2023)` },
    { label: "Experience", value: "Developer, 2024–2026: business platform and e-commerce sites; web internship in 2022" },
    { label: "Training", value: "AI Full-Stack Developer programme, BCS Koolitus (2026), incl. LLMOps" },
    { label: "Recognition", value: "Course award and an award from the company RingIT for my AI meal planner, my most comprehensive AI project" },
    { label: "Languages", value: "Estonian C1 · English (FCE) · Russian native" },
  ],
} as const;

export const contactCopy = {
  headline: "Let's build something useful.",
  description:
    "I'm open to full-stack and AI development roles, and to projects where a bit of automation saves real time. Whether it's a job opening, an idea or a process that takes too long, I'd be happy to hear about it.",
} as const;
