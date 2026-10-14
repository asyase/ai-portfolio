/**
 * Skills & tools, grouped into simple categories (based on my CV).
 * Plain text on purpose - add or remove items freely.
 */

export interface SkillCategory {
  title: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "REST APIs", "Spring Data JPA / Hibernate", "PostgreSQL", "SQL", "Node.js"],
  },
  {
    title: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "HTML5", "CSS / SCSS", "Tailwind CSS", "Go Templates"],
  },
  {
    title: "AI & LLM Integration",
    items: [
      "Anthropic Claude API (commercial)",
      "OpenAI API",
      "Gemini API & Spring AI",
      "Prompt engineering",
      "Structured outputs (JSON)",
      "Grounding & hallucination mitigation",
      "LLM evaluation",
      "LLMOps basics",
      "Promptfoo",
    ],
  },
  {
    title: "AI-Assisted Coding",
    items: ["Claude Code", "OpenAI Codex", "Cursor", "OpenCode", "Lovable"],
  },
  {
    title: "Automation & Integrations",
    items: ["n8n", "Webhooks", "Telegram Bot API", "Google Calendar API", "E-invoicing (EstFeed, Docura, UnifiedPost)", "XML parsing", "Adyen & Montonio payments", "Web scraping (Jsoup, Playwright)"],
  },
  {
    title: "Testing & Tools",
    items: ["JUnit", "Manual & E2E testing", "Swagger / OpenAPI", "Postman", "Git", "GitHub", "Bitbucket", "JIRA", "Vercel", "CI/CD"],
  },
  {
    title: "Ways of Working",
    items: ["Agile / Scrum", "Kanban", "Code reviews", "Debugging", "Refactoring", "SOLID / DRY", "Web security basics (OWASP)"],
  },
  {
    title: "Design & Prototyping",
    items: ["Figma", "Figma AI / Figma Make", "Canva", "PenPot", "User research", "Wireframing & prototyping", "Midjourney", "Nano Banana Pro"],
  },
];
