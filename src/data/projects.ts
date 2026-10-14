
/* ────────────────────────────────────────────────────────────────────────────
 * Project data
 *
 * Everything shown on project cards and case-study pages comes from here.
 * To add a project: copy an entry, give it a unique `slug`, and pick a
 * `visual` for the placeholder illustration. Components never need editing.
 *
 * Honesty rules used in this file:
 *  - `todo("…")` marks content you still need to write or verify.
 *  - Feature `status` separates implemented work from prototypes and plans.
 *  - `results` stays a todo until you have real, verifiable outcomes.
 *  - Screenshots are only `kind: "screenshot"` when they are real captures.
 * ──────────────────────────────────────────────────────────────────────────── */

export type ProjectStatus =
  | "commercial" // Work done in a commercial / employment context
  | "in-development"
  | "prototype"
  | "experimental"
  | "completed";

export const projectStatusLabel: Record<ProjectStatus, string> = {
  commercial: "Commercial work",
  "in-development": "In development",
  prototype: "Prototype",
  experimental: "Ongoing experiments",
  completed: "Completed",
};

export type FeatureStatus = "implemented" | "prototype" | "planned";

export const featureStatusLabel: Record<FeatureStatus, string> = {
  implemented: "Implemented",
  prototype: "Prototype",
  planned: "Planned",
};

/** Soft tint used for the project's placeholder image until a screenshot exists. */
export type ProjectTone = "lavender" | "orchid" | "pink" | "peach" | "butter" | "mint" | "sky";

export type WorkflowNodeKind = "input" | "trigger" | "ai" | "process" | "storage" | "output";

export interface WorkflowNode {
  label: string;
  detail?: string;
  kind: WorkflowNodeKind;
}

export interface Feature {
  label: string;
  status: FeatureStatus;
  note?: string;
}

export interface Screenshot {
  /** Path under /public, e.g. "/projects/ai-website-builder/editor.png". Empty = placeholder frame. */
  src: string;
  alt: string;
  caption: string;
  /** "screenshot" = a real capture of working software. "mockup" = a design or concept. */
  kind: "screenshot" | "mockup";
  /** For commercial work: set to true only once publishing is approved. */
  approved?: boolean;
  width?: number;
  height?: number;
}

/** Template for documenting an individual automation (used by the n8n project). */
export interface AutomationWorkflow {
  name: string;
  /** Short label shown next to the name, e.g. "Workflow design, not in production". */
  note?: string;
  trigger: string;
  connectedSystems: string[];
  steps: string[];
  output: string;
  businessValue: string;
  screenshot?: Screenshot;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  /** Exact category label displayed on cards. */
  category: string;
  description: string;
  status: ProjectStatus;
  /** Optional short qualifier shown next to the status. */
  statusNote?: string;
  year?: string;
  /** Context such as commercial or personal work. */
  context?: string;
  /** Awards or recognition - shown on the card and the project page. Real ones only. */
  recognition?: string[];
  /** The kind of company the work was for - described, never named. */
  company?: string;
  role: string;
  technologies: { name: string; usedFor?: string }[];
  highlights: string[];
  overview: string;
  problem: string;
  /** "The approach" */
  solution: string;
  howItWorks: { title: string; description: string }[];
  workflow: WorkflowNode[];
  features: Feature[];
  implementationDetails: string[];
  challenges: { challenge: string; solution: string }[];
  results: string[];
  lessons: string[];
  screenshots: Screenshot[];
  /**
   * Optional cover image for the card. Usually not needed: dropping a file named
   * cover.png (or any image) into /public/projects/<slug>/ does the same.
   */
  coverImage?: Screenshot;
  /** "gallery" projects show an image gallery instead of the case-study sections. */
  layout?: "case-study" | "gallery";
  tone: ProjectTone;
  /** Full URL to the source code, e.g. "https://github.com/you/repo". Shown as "Source code". */
  githubUrl?: string;
  /** Full URL to a live version. Shown as "Live demo". */
  demoUrl?: string;
  /**
   * Any other links, e.g. [{ label: "Figma design", url: "https://…" }, { label: "Video walkthrough", url: "https://…" }].
   * Use only real, public links.
   */
  links?: { label: string; url: string }[];
  automations?: AutomationWorkflow[];
}

export const projects: Project[] = [
  {
    slug: "ai-nutrition-meal-planner",
    index: "01",
    title: "AI Nutrition & Weekly Meal Planner",
    category: "AI Application / Personalization",
    description:
      "A meal-planning app that builds a weekly menu and recipes from what's already at home, counts calories, and makes a shopping list of only what's missing, with prompt A/B tests, an LLM judge and layered input safety.",
    status: "completed",
    context: "Personal project · AI Full-Stack Developer course (BCS Koolitus)",
    recognition: ["Award at the AI Full-Stack Developer course", "Award from RingIT"],
    year: "2026",
    role: "Personal project, built end to end: idea, Java backend, Vue frontend, prompts, evaluation and security.",
    technologies: [
      { name: "Java 21 & Spring Boot", usedFor: "Backend, REST API, all AI calls, and the checks that AI output has to pass" },
      { name: "Google Gemini & Spring AI", usedFor: "AI in the original version (gemini-3.5-flash-lite via Spring AI 2.0): recipes, weekly menu, substitutions, store sections, restaurant advice" },
      { name: "Claude (Anthropic Java SDK)", usedFor: "A second version of the app that swaps Gemini for Claude behind the same AI interface" },
      { name: "PostgreSQL", usedFor: "Pantry, saved recipes, weekly menus, shopping list and calorie log" },
      { name: "Vue 3 & Vite", usedFor: "The web interface" },
      { name: "Prompt engineering", usedFor: "Grounding, chain of thought, one-shot / few-shot, structured output; prompts kept in Markdown files" },
    ],
    highlights: [
      "My most comprehensive AI project",
      "Menu and recipes from what's at home",
      "Shopping list of only what's missing",
      "Prompt A/B tests + LLM-as-a-judge",
      "Three-layer input safety",
    ],
    overview:
      "My most comprehensive AI project: an app that takes the repetitive thinking out of eating at home. It knows what's in the kitchen, suggests recipes from those ingredients, plans a week of meals for a chosen number of people, tracks calories against a daily goal, and turns the plan into a shopping list of only the things that are missing, sorted by store section. The screenshots are from the app's Estonian interface.",
    problem:
      "Planning meals for a week, checking what's already at home, counting calories and writing a shopping list are each small tasks, together they take real time, and generic meal plans ignore what's actually in the fridge.",
    solution:
      "Ground every AI answer in the user's own data (the pantry, saved recipes and the current week's menu) and keep the maths in code: calories are calculated in Java from quantities, while the model handles ideas, structure and wording. Every AI response comes back in a defined structure and is validated before it's shown.",
    howItWorks: [
      { title: "Tell it what's at home", description: "Products in the pantry, with calories per 100 g, are what the AI works from." },
      { title: "Get recipes", description: "The AI suggests classic and creative recipes from those ingredients, and says what's missing if they don't go together. Missing ingredients can be substituted, and step-by-step cooking guidance is scaled to the number of portions." },
      { title: "Plan the week", description: "A 7-day menu (3 meals a day) by diet, style and number of people, with quantities per dish and the model's reasoning visible. Any single dish can be swapped." },
      { title: "Shop and track", description: "The shopping list contains only what's missing, totalled for the week and grouped by store section. Marking a dish as eaten adds its calories to today's progress." },
    ],
    workflow: [
      { label: "Pantry & saved recipes", detail: "PostgreSQL", kind: "input" },
      { label: "Input guard", detail: "Length · regex · LLM judge", kind: "process" },
      { label: "Gemini / Claude", detail: "Grounded prompts from .md", kind: "ai" },
      { label: "Schema validation", detail: "Typed records", kind: "process" },
      { label: "Calories in Java", detail: "From quantities", kind: "process" },
      { label: "Menu · recipes · list", detail: "Vue interface", kind: "output" },
    ],
    features: [
      { label: "Pantry of products at home", status: "implemented" },
      { label: "AI recipe suggestions (classic and creative) from pantry products", status: "implemented" },
      { label: "Saved recipes, ingredient substitution and step-by-step cooking guide", status: "implemented" },
      { label: "Weekly menu (7 days × 3 meals) by diet, style and number of people", status: "implemented" },
      { label: "Shopping list of only missing items, grouped by store section", status: "implemented" },
      { label: "Calorie goal and daily tracking", status: "implemented" },
      { label: "Restaurant menu advice that fits today's remaining calories", status: "implemented" },
      { label: "Prompt A/B tests with an LLM-as-a-judge", status: "implemented" },
      { label: "Security test page: length check → regex → LLM safety judge", status: "implemented" },
      { label: "Sign-in and user accounts", status: "planned", note: "Not part of the first version: it runs with one demo user." },
    ],
    implementationDetails: [
      "Grounding: every prompt is built from the user's own data: pantry products, saved recipes and the current week's dishes.",
      "Chain of thought for the weekly menu, shown to the user under \"how the AI thought\".",
      "Structured output: responses are mapped to typed Java records and validated against a schema before use.",
      "One-shot and few-shot prompting (e.g. few-shot for sorting products into store sections); prompts live in Markdown files, not in code.",
      "Calories are calculated in Java from quantities and a nutrition table; the AI's estimate is used only for unknown products, and marked as such.",
      "The AI sits behind an interface, so the original Gemini/Spring AI version and a Claude version share the same code, and tests replace the AI with a fake one (22 test files).",
    ],
    challenges: [
      {
        challenge: "With only the user's own products to work from, the AI followed grounding too literally and suggested an \"avocado and gummy bear dessert\" and, after a quality rule was added, a \"recipe\" that just said to open the bag of gummies.",
        solution: "A quality rule in the prompt plus a Java check (RecipeQuality: at least two real ingredients), then fine-tuning the prompt so the model didn't become overly cautious. Prompt engineering turned out to be an iterative process.",
      },
      {
        challenge: "Users can type anything into the app, including attempts to override the model's instructions.",
        solution: "Inputs pass three layers (a length cap, regex patterns for known injection phrases, and an LLM safety judge for the rest), and outputs are sanitized too. A dedicated page shows which layer stops a given text.",
      },
      {
        challenge: "Language models are unreliable with arithmetic, but calorie totals have to be right.",
        solution: "Quantities come from the model, the maths happens in Java. Only calories for unknown products are estimated by AI, and labelled as an estimate.",
      },
      {
        challenge: "It's hard to tell whether a prompt change actually made answers better.",
        solution: "A/B tests compare prompt versions and model settings on the same input, scored by code checks (format and grounding) and by a second model acting as judge, and the judge itself is tested on answers with known scores.",
      },
    ],
    results: [
      "Received an award at the AI Full-Stack Developer course and an award from the company RingIT.",
      "Prompt A/B test on a deliberately hard input (eggs, milk, tomato, cheese, gummy bears, Aperol Spritz): the simple prompt (v1) produced an absurd \"recipe\" in 3 of 4 settings, the full prompt (v2: role, grounding, quality rule, one-shot, security rules) in 0 of 4.",
      "HIGH vs LOW thinking: 2,105 vs 558 tokens and 28.6 s vs 2.0 s for the same quality score, so the app uses LOW.",
      "The AI judge gave 93/100 to \"pour Aperol into a glass, add gummy bears\", which is why every AI answer is also checked in Java.",
    ],
    lessons: [
      "Grounding alone doesn't guarantee quality.",
      "A good prompt needs testing, not intuition.",
      "More thinking doesn't always mean a better result.",
      "AI answers must be validated. AI and Java complement each other.",
      "A reliable AI app = good prompts + real data + security + Java checks + testing.",
    ],
    screenshots: [],
    tone: "butter",
  },

  {
    slug: "ai-website-builder",
    index: "02",
    title: "AI-Powered Website Builder",
    category: "AI Integration / Web Development",
    description:
      "An AI-assisted website creation workflow that transforms business descriptions into structured website content and integrates generated output into reusable web templates.",
    status: "commercial",
    year: "2024–2026",
    context: "Commercial development work",
    company: "a retail software company",
    role: "Developer in the product team: integrated the Anthropic Claude API into the company's commercial website builder (JavaScript / Go Templates) and built the prompt input and the preview UI for the generated content.",
    technologies: [
      { name: "Anthropic Claude API", usedFor: "Generating website content from business descriptions" },
      { name: "JavaScript", usedFor: "Request handling, response processing and integration logic" },
      { name: "Go Templates", usedFor: "Reusable website templates that render the generated content" },
      { name: "Web development", usedFor: "Template structure, layout and front-end output" },
    ],
    highlights: [
      "Turning free-form business descriptions into structured content",
      "Processing and validating AI-generated responses",
      "Integrating generated output into an existing template system",
    ],
    overview:
      "A workflow that helps create a business website from a short description. A language model drafts the website content, the response is processed into a predictable structure, and that structure is rendered through reusable web templates inside an existing application.",
    problem:
      "Creating a first version of a business website means writing a lot of content (headlines, service descriptions, about text) before any design work can be judged. Language models can draft this quickly, but their raw output is unstructured text, while a template system needs predictable fields it can render safely.",
    solution:
      "Use the Claude API to generate website content from a business description, ask for the output in a defined structure, then process and check the response before mapping it onto existing Go templates. The AI is responsible for drafting; the application stays responsible for structure and rendering.",
    howItWorks: [
      { title: "Describe the business", description: "The workflow starts from a short description of the business and what the website should communicate." },
      { title: "Generate structured content", description: "The description is sent to the Claude API with instructions to return content in a defined structure rather than free text." },
      { title: "Process the response", description: "The response is parsed and checked so that missing or malformed parts can be handled before rendering." },
      { title: "Render into templates", description: "Validated content is mapped to fields in reusable Go templates that produce the website pages." },
    ],
    workflow: [
      { label: "Business description", detail: "Input", kind: "input" },
      { label: "Claude API", detail: "Content generation", kind: "ai" },
      { label: "Response processing", detail: "Parse · check · normalise", kind: "process" },
      { label: "Go templates", detail: "Field mapping", kind: "process" },
      { label: "Website output", detail: "Rendered pages", kind: "output" },
    ],
    features: [
      { label: "Content generation from a business description", status: "implemented" },
      { label: "Structured response processing", status: "implemented" },
      { label: "Integration with reusable Go templates", status: "implemented" },
    ],
    implementationDetails: [
      "Built the prompt input UI and a preview of the generated content, so the result can be checked before it goes into the site.",
      "The response is parsed and checked in JavaScript before anything is inserted into the templates.",
      "Generated content is inserted into predefined sections of the existing Go templates, so the AI fills in content while the template keeps control of layout and structure.",
    ],
    challenges: [
      {
        challenge: "AI responses are not guaranteed to follow the requested structure.",
        solution: "The response is parsed and checked in JavaScript. If it is broken or incomplete, the user sees it in the preview and can write or correct the content before it goes into the site.",
      },
    ],
    results: ["The feature went live for the company's users."],
    lessons: [
      "A model drafting content and an application owning its structure is a healthier split than trusting raw output.",
      "A preview step matters: people trust AI content more when they can see and fix it before it goes live.",
    ],
    screenshots: [
      {
        src: "",
        alt: "Screenshot of the website builder workflow",
        caption: "Screenshot pending approval from the company.",
        kind: "screenshot",
        approved: false,
      },
    ],
    tone: "lavender",
  },

  /* ── Content Factory ────────────────────────────────────────────────── */
  {
    slug: "content-factory",
    index: "03",
    title: "Content Factory",
    category: "AI Platform / Full-Stack",
    description:
      "A multi-tenant platform that turns a brand's photos, videos and notes into ready-to-publish posts: Claude generates ideas, scripts and translations, ffmpeg renders the videos, and posts are scheduled and published through official platform APIs.",
    status: "in-development",
    statusNote: "Version 0.68",
    year: "2026",
    role: "Developer.",
    technologies: [
      { name: "Go", usedFor: "API, background workers, migrations and a command-line tool, four binaries from one codebase" },
      { name: "Anthropic Claude API", usedFor: "Ideas, scripts, translations, asset descriptions and reply drafts (tool use, prompt caching)" },
      { name: "PostgreSQL", usedFor: "All data, with row-level security enforcing tenant isolation, and the job queue" },
      { name: "ffmpeg", usedFor: "Rendering videos from the brand's own footage" },
      { name: "River", usedFor: "Postgres-backed job queue: every model call, render and publish is a retryable job" },
      { name: "templ + HTMX", usedFor: "Server-rendered admin interface" },
      { name: "S3 storage (RustFS)", usedFor: "Photos, videos and rendered media" },
      { name: "Claude Code", usedFor: "AI-assisted development from a written spec, roadmap and engineering rules" },
    ],
    highlights: [
      "Built with Claude Code from a written spec, milestone by milestone",
      "AI-generated ideas, scripts and translations (ET · RU · EN)",
      "Tenant isolation enforced in the database",
      "Publishing to Telegram, YouTube, Instagram and more",
    ],
    overview:
      "Content Factory takes a brand's own material (photos, video clips, voice notes and text) plus a persistent \"brand brain\", and turns it into a steady stream of posts for each social platform, on a schedule and with optional human approval. One deployment serves many brands, each with its own knowledge base, channels, assets and calendar. The screenshots show a demo workspace filled with sample data.",
    problem:
      "Posting regularly on several platforms in several languages takes a lot of repetitive work: coming up with ideas, writing scripts, cutting video, adapting every post to each platform's format and language, scheduling, and answering comments. Small brands rarely have the time or people for all of it.",
    solution:
      "A Go platform where every step of that workflow is a durable, retryable job in PostgreSQL. Claude handles the language work (ideas, scripts, translations, descriptions and reply drafts), while ffmpeg renders video from the brand's own footage and official platform APIs handle publishing. People stay in control: ideas and posts can be reviewed and approved before anything goes out.",
    howItWorks: [
      { title: "Describe the brand", description: "The brand profile and uploaded assets form the \"brand brain\". Uploaded photos and videos are described and tagged automatically." },
      { title: "Generate ideas", description: "Claude proposes post ideas from the brand profile and assets; a person approves the ones worth making." },
      { title: "Script and render", description: "Approved ideas become scripts, beat by beat, which can be edited by hand. ffmpeg renders the video from the brand's own clips." },
      { title: "Adapt and publish", description: "Each post gets a variant per platform and language, is scheduled on the calendar, and is published through the platform's official API." },
    ],
    workflow: [
      { label: "Brand assets", detail: "Photos · clips · notes", kind: "input" },
      { label: "Claude API", detail: "Ideas · scripts · translations", kind: "ai" },
      { label: "Human review", detail: "Approve · edit", kind: "process" },
      { label: "ffmpeg render", detail: "Job queue (River)", kind: "process" },
      { label: "PostgreSQL", detail: "Row-level security", kind: "storage" },
      { label: "Social platforms", detail: "Official APIs", kind: "output" },
    ],
    features: [
      { label: "AI idea generation from the brand profile and assets", status: "implemented" },
      { label: "AI-written video scripts with a manual editor", status: "implemented" },
      { label: "Post variants per platform and language (ET · RU · EN)", status: "implemented" },
      { label: "Video rendering with ffmpeg", status: "implemented" },
      { label: "Scheduling calendar and publishing jobs", status: "implemented" },
      { label: "Platform adapters: Telegram, YouTube, Instagram, Facebook, Threads, TikTok, Pinterest, X", status: "implemented", note: "Published to Instagram so far." },
      { label: "Inbox with AI-drafted replies, analytics and competitor tracking", status: "implemented" },
      { label: "Multi-tenant workspaces with database-level isolation", status: "implemented" },
    ],
    implementationDetails: [
      "Four Go binaries built from one codebase: the API and admin UI, background workers, database migrations and an operator CLI.",
      "Every side effect (a model call, a render, a publish) is an idempotent job in a PostgreSQL-backed queue (River), so failures are retried instead of lost.",
      "Tenant isolation is enforced with PostgreSQL row-level security, not only in application code.",
      "Developed with Claude Code against a written spec, a milestone roadmap and binding engineering rules, with a review step after each milestone.",
      "Around 590 Go files with 213 test files and 64 database migrations; GitLab CI tests and builds every release.",
    ],
    challenges: [
      {
        challenge: "Many brands share one deployment, and one brand must never see another's data.",
        solution: "Isolation is enforced by PostgreSQL row-level security, so even a bug in application code can't leak data between workspaces.",
      },
      {
        challenge: "Model calls, video renders and publishing can fail halfway through.",
        solution: "Each step runs as an idempotent, retryable job in a Postgres-backed queue, so it can safely run again without posting twice.",
      },
      {
        challenge: "Several platforms now require AI-generated media to be declared.",
        solution: "The platform records where every picture came from and sets each platform's disclosure flag automatically, so nobody has to remember to tick a box.",
      },
    ],
    results: ["Posts generated and published to Instagram through the platform."],
    lessons: ["Writing a clear spec and roadmap first made building with Claude Code much faster and more predictable.", "Every step that can fail (an AI call, a render, a publish) should be a job that can safely run again."],
    screenshots: [],
    tone: "lavender",
  },

  /* ── Home Café POS System ─────────────────────────────────────────────────── */
  {
    slug: "home-cafe-pos-system",
    index: "04",
    title: "Home Café POS System",
    category: "Full-Stack / Integrations",
    description:
      "A point-of-sale system for a home café: product catalogue, cart and checkout with Estonian VAT, a kitchen display, inventory, refunds and printed receipts, with every order sent to Telegram through an n8n webhook.",
    status: "in-development",
    statusNote: "Version 0.49",
    context: "Freelance project",
    company: "a home café in Laagri",
    year: "2026",
    role: "Built it alone: design, frontend, backend, printing and the n8n integration.",
    technologies: [
      { name: "React", usedFor: "The till interface: products, cart, checkout, orders and admin" },
      { name: "TypeScript", usedFor: "Frontend and backend" },
      { name: "QuestDB", usedFor: "Products, orders, inventory movements, refunds and an audit log, queried over the PostgreSQL protocol" },
      { name: "n8n", usedFor: "Receives every new order by webhook and forwards it to Telegram" },
      { name: "Fastify", usedFor: "The backend API" },
      { name: "Epson ePOS-Print", usedFor: "Printing receipts with the café's logo on an Epson TM-m30" },
      { name: "Tailwind CSS & Vite", usedFor: "Styling and build" },
      { name: "Vitest", usedFor: "Unit and integration tests" },
      { name: "GitLab CI", usedFor: "Type checks, linting, tests and builds" },
      { name: "Figma Make & Claude Code", usedFor: "AI-assisted design and development" },
    ],
    highlights: [
      "Orders → n8n webhook → Telegram",
      "Kitchen display for the cooks",
      "VAT calculated per line for mixed rates",
      "Receipt printing over the printer's HTTP API",
    ],
    overview:
      "A complete point-of-sale system for a home café with a kitchen. Staff take orders on a tablet, the kitchen sees them on its own screen, receipts print automatically, and every order is also sent to Telegram through an n8n workflow. The interface started as a design in Figma Make and was developed further with Claude Code.",
    problem:
      "A small café needs to take orders quickly, get food orders to the kitchen, keep track of stock and print correct receipts, and the owners want to know what's happening without standing at the till. Off-the-shelf POS systems are often expensive or don't fit how a small place actually works.",
    solution:
      "A web-based POS built around the café's real workflow: a React interface for staff, a Fastify and QuestDB backend, a separate full-screen kitchen display, direct receipt printing, and an n8n webhook that sends each order to Telegram. Sign-in is handled by the existing company login gateway, so the app doesn't store passwords.",
    howItWorks: [
      { title: "Take the order", description: "Staff pick products by category, adjust quantities, apply a promo code if there is one, and check out." },
      { title: "Price it correctly", description: "The backend calculates the total and VAT line by line: Estonian VAT has several rates, and a single flat rate would be wrong for mixed orders." },
      { title: "Send it on", description: "The order is saved, a receipt prints on the café's printer, food appears on the kitchen display, and n8n forwards the order to Telegram." },
      { title: "Keep track", description: "Inventory is updated with every sale and refund, and admin actions are recorded in an audit log." },
    ],
    workflow: [
      { label: "Order at the till", detail: "React · tablet", kind: "input" },
      { label: "Fastify API", detail: "Pricing · VAT per line", kind: "process" },
      { label: "QuestDB", detail: "Orders · stock · audit", kind: "storage" },
      { label: "Kitchen display & receipt", detail: "Epson ePOS-Print", kind: "output" },
      { label: "n8n webhook", detail: "Fire-and-forget", kind: "trigger" },
      { label: "Telegram", detail: "Order notification", kind: "output" },
    ],
    features: [
      { label: "Product catalogue with categories and image upload", status: "implemented" },
      { label: "Cart and checkout with per-line VAT", status: "implemented" },
      { label: "Promo codes", status: "implemented" },
      { label: "Kitchen display with order statuses", status: "implemented" },
      { label: "Inventory: restocks, adjustments and automatic sale deductions", status: "implemented" },
      { label: "Refunds and order history", status: "implemented" },
      { label: "Receipt printing on an Epson TM-m30", status: "implemented" },
      { label: "Order notifications to Telegram via n8n", status: "implemented" },
      { label: "Audit log of admin actions", status: "implemented" },
      { label: "Retry queue for failed order notifications", status: "planned" },
    ],
    implementationDetails: [
      "React 19 + TypeScript frontend with React Router; separate full-screen kitchen route without the staff navigation.",
      "Fastify backend on QuestDB (over the PostgreSQL wire protocol) with migrations, organised by domain (products, orders, inventory, promos, audit).",
      "Sign-in goes through the existing company login gateway, which passes the user's name and email to the app; the app itself stores no passwords.",
      "Product images are stored in S3-compatible storage.",
      "26 test files (Vitest, including database integration tests); GitLab CI runs type checks, linting, tests and builds.",
    ],
    challenges: [
      {
        challenge: "Estonian VAT has a standard rate and several reduced rates, so one flat rate over the whole order gives the wrong tax for mixed orders.",
        solution: "VAT is calculated and rounded per line using each product's own rate, then summed, and the checkout preview uses exactly the same maths as the backend so the numbers always match.",
      },
      {
        challenge: "The receipt printer ignores the usual raw ESC/POS commands on its network port.",
        solution: "Receipts are sent through the printer's built-in ePOS-Print HTTP service instead, including the café's logo as a 1-bit image.",
      },
      {
        challenge: "A slow or failing Telegram notification must never stop an order from being saved.",
        solution: "The n8n webhook is fire-and-forget with a 3-second timeout; failures are only logged, and a retry queue is planned.",
      },
      {
        challenge: "The login gateway garbled non-English characters in staff names.",
        solution: "The app detects and repairs the broken encoding before displaying the name.",
      },
    ],
    results: ["Used all day at a home café in Laagri during Kodukohvikute päevad (home café days) 2026: orders, kitchen display, receipts and Telegram notifications in real use."],
    lessons: ["Real use on a busy day shows what matters most: speed at the till and a kitchen screen everyone can read at a glance."],
    screenshots: [],
    tone: "mint",
  },

  {
    slug: "ai-data-assistant",
    index: "05",
    title: "AI Data Assistant",
    category: "AI / Data / Backend",
    description:
      "Plain-language questions about cargo, vehicles and jobs for a crane and transport company, Gemini writes the SQL, the backend checks it and runs it read-only, and the AI summarises the answer.",
    status: "prototype",
    context: "Vali-IT group project",
    company: "a crane and transport company",
    year: "2026",
    role: "3-person course team. I built backend REST APIs with Java, Spring Boot and PostgreSQL, CRUD for jobs, drivers and customers with ADMIN / DRIVER role-based access, and the AI chat backend: the NL-to-SQL service with Spring AI and Gemini, the SQL validation, read-only execution and the POST /api/ask endpoint.",
    technologies: [
      { name: "Google Gemini & Spring AI", usedFor: "Turning a question into one SQL SELECT, then summarising the result in 1–3 sentences" },
      { name: "Java 21 & Spring Boot", usedFor: "Backend, the POST /api/ask endpoint and all SQL safety checks" },
      { name: "PostgreSQL", usedFor: "Jobs, cargo, vehicles, crane capacities, drivers and customers" },
      { name: "Vue 3 & Vite", usedFor: "The company's web app the chat belongs to" },
    ],
    highlights: [
      "Natural-language questions about the fleet",
      "SELECT-only, read-only execution",
      "Forbidden and unanswerable questions handled",
      "SQL shown next to every answer",
    ],
    overview:
      "An AI assistant inside a crane and transport company's web app. An admin can ask things like \"Which vehicles can lift 4 tonnes at a 10 m reach?\" or \"What is the heaviest cargo?\" and get a short answer, plus the SQL query it was based on. The cover is an illustrative mockup of the planned chat screen, with answers taken from the project's own sample data.",
    problem:
      "Fleet and job data lives in a relational database, but the people with questions (which crane can do a lift, what's planned, which truck is in for maintenance) don't write SQL. Letting a model write queries is tempting, but generated SQL can be wrong or unsafe if it's run blindly.",
    solution:
      "Treat generated SQL as untrusted input. The model gets the database schema and strict rules, returns one SELECT in a JSON structure (or FORBIDDEN / CANNOT_ANSWER), and the backend validates the query before running it on a read-only connection. Only then does the model summarise the result.",
    howItWorks: [
      { title: "Ask a question", description: "An admin types a question in plain language, e.g. about cargo, vehicles or jobs." },
      { title: "Generate SQL", description: "Spring AI sends the question and the schema to Gemini, which must answer with a single SELECT in JSON, or FORBIDDEN / CANNOT_ANSWER." },
      { title: "Validate and run", description: "The backend accepts only SELECT, rejects forbidden keywords and the users table, and runs the query on a read-only connection that is rolled back." },
      { title: "Answer", description: "Gemini summarises the rows in 1–3 sentences, and the SQL is returned with the answer so it can be checked." },
    ],
    workflow: [
      { label: "Admin question", detail: "Plain language", kind: "input" },
      { label: "Gemini via Spring AI", detail: "Schema → one SELECT", kind: "ai" },
      { label: "SQL validation", detail: "SELECT only · no users table", kind: "process" },
      { label: "PostgreSQL", detail: "Read-only · rollback", kind: "storage" },
      { label: "Gemini summary", detail: "1–3 sentences", kind: "ai" },
      { label: "Answer + SQL", detail: "POST /api/ask", kind: "output" },
    ],
    features: [
      { label: "Natural-language question → SQL with Gemini via Spring AI", status: "implemented" },
      { label: "Structured JSON answer, incl. FORBIDDEN and CANNOT_ANSWER", status: "implemented" },
      { label: "SQL validation: SELECT only, forbidden keywords, users table blocked", status: "implemented" },
      { label: "Execution on a read-only connection with rollback", status: "implemented" },
      { label: "AI summary of the result", status: "implemented" },
      { label: "SQL query returned with the answer", status: "implemented" },
      { label: "Chat screen in the web app (AiChatView)", status: "planned" },
    ],
    implementationDetails: [
      "POST /api/ask takes { question } and returns { answer, sql }.",
      "The prompt contains the database schema and numbered rules: return only one raw SELECT, FORBIDDEN for anything that changes data, CANNOT_ANSWER when the schema can't answer the question.",
      "Defence in depth: the AI's rules, then Java checks (must start with SELECT, no DELETE / UPDATE / INSERT / DROP / CREATE / INTO, no user data), then a read-only database connection, so PostgreSQL itself rejects any write.",
      "Errors meant for the user (FORBIDDEN_SQL, CANNOT_ANSWER) come back as a normal 400 message and appear in the chat as the AI's reply.",
    ],
    challenges: [
      {
        challenge: "Executing model-written SQL is a security risk: a prompt could try to make it change or delete data.",
        solution: "Three layers: the model is told to refuse, Java rejects anything but a single SELECT (and the users table), and the query runs on a read-only connection that's rolled back, so even a missed case can't write.",
      },
      {
        challenge: "Some questions simply can't be answered from the data.",
        solution: "The model returns CANNOT_ANSWER instead of guessing, and the user gets a clear message in the chat rather than an invented answer.",
      },
    ],
    results: ["Presented at the end of the course and received great feedback."],
    lessons: [
      "Generated queries should be treated like user input: validated, scoped and never trusted by default.",
      "A strict prompt helps, but the real safety comes from checks in code and a read-only database user.",
    ],
    screenshots: [],
    tone: "pink",
  },

  {
    slug: "product-aggregation-platform",
    index: "06",
    title: "Clothing Search & Product Aggregation",
    category: "Full-Stack / Data / Scraping",
    description:
      "A platform that collects clothing products from Estonian online stores, normalises them into one shared catalogue and lets people search, filter and compare in one place.",
    status: "in-development",
    context: "Team project · 6 developers",
    year: "2026",
    role: "Frontend developer in a team of six: designed the interface with Claude and built the Next.js frontend: the home page and the pages for products, product detail, brands and categories, with dynamic categories, filters and a stores marquee (70 frontend files), documented the database schema in the README, and fixed backend search (case-insensitive SQL, the search parameter, availability filters). The scraping pipeline itself was built by teammates.",
    technologies: [
      { name: "Java & Spring Boot", usedFor: "Backend API, normalisation logic and a scraping operations CLI" },
      { name: "Jsoup, Playwright & Crawlee", usedFor: "Fetching and parsing store pages, including JavaScript-heavy ones" },
      { name: "PostgreSQL & Liquibase", usedFor: "Products, attributes, scrape audit trails and schema migrations" },
      { name: "Next.js, React & Tailwind CSS", usedFor: "Search, filters and product pages" },
      { name: "Swagger / OpenAPI", usedFor: "REST API documentation" },
      { name: "Claude (AI-assisted design)", usedFor: "Designing the frontend (layout, typography and the \"One search. All fashion.\" home page), then built in Next.js" },
      { name: "AI coding agents (Claude Code)", usedFor: "AI-assisted development, guided by an AGENTS.md / CLAUDE.md operating brief in the repository" },
    ],
    highlights: [
      "Frontend designed with Claude",
      "Products from 279 registered Estonian stores",
      "One shared taxonomy and attribute model",
      "Queued scraping with a dedicated worker",
      "Search, filter and compare in one place",
    ],
    overview:
      "A clothing-focused aggregation platform. Store catalogues are collected by a queued scraping worker, products and their attributes are normalised into one shared taxonomy, and a Next.js frontend lets people browse, search and filter across stores that sell in Estonia.",
    problem:
      "Clothing is spread across dozens of Estonian online stores, each with its own categories, sizes and naming. Comparing items means opening many sites, and the data itself is inconsistent from store to store.",
    solution:
      "Scrape each store's catalogue on a queue, normalise products and attributes into one shared model, keep the raw scrape context for troubleshooting, and serve everything through one search experience.",
    howItWorks: [
      { title: "Register stores", description: "Eligible stores (clothing, an online shop and a real presence in Estonia) are listed in a machine-readable store registry." },
      { title: "Scrape on a queue", description: "A dedicated worker runs queued scrape jobs, with Jsoup for simple pages and a Playwright/Crawlee sidecar for JavaScript-heavy ones." },
      { title: "Normalise", description: "Products, categories and attributes are mapped to one shared taxonomy; raw scrape data is kept for diagnostics." },
      { title: "Search and filter", description: "The Next.js frontend shows products, brands and categories with filters, from the Spring Boot REST API." },
    ],
    workflow: [
      { label: "Store registry", detail: "279 stores", kind: "input" },
      { label: "Scrape worker", detail: "Queue · Jsoup / Playwright", kind: "process" },
      { label: "Normalisation", detail: "Shared taxonomy", kind: "process" },
      { label: "PostgreSQL", detail: "Products · audit trail", kind: "storage" },
      { label: "Next.js frontend", detail: "Search · filters", kind: "output" },
    ],
    features: [
      { label: "Store registry with eligibility rules", status: "implemented" },
      { label: "Queued scraping with a dedicated worker", status: "implemented" },
      { label: "Normalisation into a shared taxonomy and attributes", status: "implemented" },
      { label: "Product, brand and category pages with filters", status: "implemented" },
      { label: "Frontend designed with Claude and built in Next.js", status: "implemented" },
      { label: "AGENTS.md / CLAUDE.md brief for AI coding agents working in the repository", status: "implemented" },
    ],
    implementationDetails: [
      "Spring Boot backend with Liquibase migrations, normalisation logic and an operations CLI for scraping.",
      "Standalone scrape worker plus a Node sidecar (Crawlee + Playwright) for pages that need a real browser.",
      "Separate image ingestion service with bounded storage.",
      "Team workflow with Jira tickets, branch naming conventions and pull requests.",
      "The frontend was designed with Claude, from the home page (\"One search. All fashion.\") to the women / men / children switch, category menus and search, and then built as Next.js pages.",
      "AI coding agents are part of the workflow: an AGENTS.md / CLAUDE.md brief tells them which files are the source of truth and how much they may change without asking.",
    ],
    challenges: [
      {
        challenge: "Every store names categories, sizes and attributes differently.",
        solution: "A shared taxonomy and attribute model, with raw scrape data kept so mappings can be checked and fixed.",
      },
      {
        challenge: "Search was missing products because of case-sensitive SQL and a lost search parameter.",
        solution: "Fixed the queries to be case-insensitive, restored the search parameter and added availability filters.",
      },
    ],
    results: ["Hundreds of Estonian stores connected (200+)."],
    lessons: ["In a team of six, clear tickets, branch names and pull requests save a lot of time and merge conflicts."],
    screenshots: [],
    tone: "sky",
  },

  {
    slug: "telegram-life-assistant",
    index: "07",
    title: "Telegram Life Assistant",
    category: "Automation / Integrations",
    description:
      "A serverless Telegram assistant for everyday planning (reminders, self-care, doctors, payments and birthdays), synced with Google Calendar and running on Cloudflare Workers.",
    status: "completed",
    context: "Personal project",
    year: "2026",
    role: "Personal project, built end to end: bot logic, database schema, Google Calendar integration, scheduling and tests.",
    technologies: [
      { name: "TypeScript & grammY", usedFor: "The bot itself, running on Cloudflare Workers via webhook" },
      { name: "Cloudflare Workers", usedFor: "Serverless hosting, within the free tier" },
      { name: "Supabase (PostgreSQL)", usedFor: "Data and sessions: 14 SQL migrations, sessions survive restarts" },
      { name: "pg_cron & pg_net", usedFor: "Background jobs that call the Worker every 15 minutes" },
      { name: "Google Calendar API", usedFor: "Two-way sync through custom REST calls and token handling" },
      { name: "node:test & ESLint", usedFor: "145 unit and 177 integration tests on a real database" },
    ],
    highlights: [
      "Serverless bot on Cloudflare Workers",
      "Google Calendar sync",
      "Scheduled background jobs",
      "322 automated tests",
    ],
    overview:
      "A personal assistant that lives in Telegram. Instead of switching between apps, everyday things (self-care, doctors, workouts, payments, birthdays and meetings) become reminders and calendar entries from a single chat, with a \"Quick add\" that understands short text.",
    problem:
      "Tasks, appointments and reminders end up spread across several apps, and the friction of opening the right one is often enough for something to be forgotten. A chat is always at hand, but it isn't connected to a calendar or a schedule by default.",
    solution:
      "Use Telegram as the single entry point and run the bot serverless on Cloudflare Workers, with Supabase for data and sessions, Google Calendar for scheduling, and database-scheduled jobs for reminders, all within free-tier limits.",
    howItWorks: [
      { title: "Send a message", description: "The user taps a menu button or types a quick note in Telegram." },
      { title: "Receive via webhook", description: "Telegram delivers the update to the bot on Cloudflare Workers, written with grammY." },
      { title: "Parse and store", description: "Rule-based parsing turns \"Quick add\" text into an entry (Europe/Tallinn time zone), stored in Supabase." },
      { title: "Sync and remind", description: "Entries sync with Google Calendar, and pg_cron calls the Worker every 15 minutes to send reminders." },
    ],
    workflow: [
      { label: "Telegram message", detail: "Menu or quick add", kind: "input" },
      { label: "Webhook → Worker", detail: "grammY · Cloudflare", kind: "trigger" },
      { label: "Rule-based parsing", detail: "Europe/Tallinn time", kind: "process" },
      { label: "Supabase", detail: "Postgres · sessions", kind: "storage" },
      { label: "Google Calendar", detail: "Events · reminders", kind: "output" },
    ],
    features: [
      { label: "Telegram bot with a menu (my day, week, month, reminders…)", status: "implemented" },
      { label: "Webhook-based bot on Cloudflare Workers (grammY)", status: "implemented" },
      { label: "Supabase schema (14 migrations) with persistent sessions", status: "implemented" },
      { label: "Google Calendar sync with custom REST calls and token handling", status: "implemented" },
      { label: "Scheduled reminders via pg_cron + pg_net every 15 minutes", status: "implemented" },
      { label: "\"Quick add\" text parsing in the Europe/Tallinn time zone", status: "implemented" },
    ],
    implementationDetails: [
      "Serverless: the bot runs on Cloudflare Workers and receives Telegram updates via webhook.",
      "Supabase Postgres schema built with 14 SQL migrations; bot sessions are stored in the database, so they survive restarts.",
      "Background jobs are scheduled inside the database with pg_cron and pg_net, calling the Worker every 15 minutes.",
      "Google Calendar is integrated through custom REST calls and token handling inside the Worker.",
      "Covered by 145 unit and 177 integration tests (node:test) that run against a real database.",
    ],
    challenges: [
      {
        challenge: "Cloudflare's free tier allows only 50 outgoing requests per invocation.",
        solution: "Each action was designed to stay within that limit, so the bot runs entirely on the free tier.",
      },
      {
        challenge: "A serverless bot has no memory between requests.",
        solution: "Sessions are kept in Supabase, so conversations continue correctly even after restarts.",
      },
      {
        challenge: "Short notes like \"dentist Tue 14\" need to become correct dates and times.",
        solution: "Rule-based parsing in the Europe/Tallinn time zone, covered by tests.",
      },
    ],
    results: ["145 unit and 177 integration tests passing on a real database."],
    lessons: ["Tests on a real database catch problems that mocks never show.", "Free-tier limits are a good design constraint: they force every action to stay small and simple."],
    screenshots: [],
    tone: "peach",
  },

  {
    slug: "n8n-workflow-automations",
    index: "08",
    title: "n8n Workflow Automations",
    category: "Workflow Automation",
    description:
      "Experiments and practical workflows using n8n to connect applications, APIs, webhooks, and AI services.",
    status: "experimental",
    role: "Designing, building and testing workflows",
    technologies: [
      { name: "n8n", usedFor: "Visual workflow orchestration" },
      { name: "APIs", usedFor: "Connecting external services" },
      { name: "Webhooks", usedFor: "Event-based triggers" },
      { name: "AI integrations", usedFor: "Adding model steps inside workflows" },
    ],
    highlights: [
      "Webhook and schedule triggers",
      "Connecting apps through APIs",
      "AI steps inside workflows",
    ],
    overview:
      "A collection of experiments and practical workflows built with n8n, connecting applications, APIs, webhooks and AI services to explore where automation removes repetitive work.",
    problem:
      "A lot of everyday work is moving information between tools: copying data, reformatting it, notifying someone. It's repetitive, easy to get wrong and rarely worth a custom application.",
    solution:
      "Use n8n to build workflows visually, connect services through their APIs and webhooks, and add AI steps where interpretation or generation is needed. Each workflow is documented with the same template below.",
    howItWorks: [
      { title: "Trigger", description: "A webhook, schedule or app event starts the workflow." },
      { title: "Connect", description: "Data is fetched from or sent to connected services via their APIs." },
      { title: "Process", description: "Data is transformed, filtered or passed through an AI step." },
      { title: "Deliver", description: "The result is written, sent or stored where it's needed." },
    ],
    workflow: [
      { label: "Trigger", detail: "Webhook · schedule", kind: "trigger" },
      { label: "Connected apps", detail: "API calls", kind: "process" },
      { label: "AI step", detail: "Classify · generate", kind: "ai" },
      { label: "Transform", detail: "Map · filter", kind: "process" },
      { label: "Output", detail: "Notify · store", kind: "output" },
    ],
    features: [],
    implementationDetails: [],
    challenges: [],
    results: [],
    lessons: [],
    screenshots: [],
    tone: "sky",
    /**
     * Add each documented workflow here. Example shape:
     * {
     *   name: "Lead intake",
     *   trigger: "Webhook from a website form",
     *   connectedSystems: ["Website form", "Google Sheets", "Slack"],
     *   steps: ["Validate fields", "Classify request with an AI node", "Append row"],
     *   output: "New row + Slack notification",
     *   businessValue: "Requests are logged and routed without manual copying",
     *   screenshot: { src: "/projects/n8n-workflow-automations/lead-intake.png", alt: "…", caption: "…", kind: "screenshot" },
     * }
     */
    links: [
      { label: "Download the umbrella reminder (n8n JSON)", url: "/projects/n8n-workflow-automations/umbrella-reminder-workflow.json" },
      { label: "Download the price-alert workflow (n8n JSON)", url: "/projects/n8n-workflow-automations/price-alert-workflow.json" },
    ],
    automations: [
      {
        name: "Umbrella reminder: morning weather email",
        note: "Tested in n8n",
        trigger: "Every morning at 7:00 (plus a manual test run)",
        connectedSystems: ["Open-Meteo weather API (free, no key)", "Email (SMTP)"],
        steps: [
          "Get today's forecast for Tallinn: lowest and highest temperature and the chance of rain",
          "Edit Fields: keep only the numbers that matter and write one short sentence",
          "IF: is the chance of rain 50 % or more?",
          "Yes: send an email \"Take an umbrella today\" with the forecast",
          "No: do nothing",
        ],
        output: "One short email on rainy mornings, nothing on dry ones. On a test run on 15 October 2026 the forecast was 8.8–12.4 °C with 0 % rain, so the workflow correctly chose \"do nothing\".",
        businessValue: "A small, easy-to-explain example of the basic automation pattern: trigger → get data → decide → act. The same five steps work for stock levels, prices or deadlines.",
      },
      {
        name: "Content Fabric: Generator & Publisher",
        trigger: "A manual run, a daily schedule, or a POST webhook",
        connectedSystems: ["OpenAI (message model)", "HTML-to-PNG renderer service", "Telegram (reviewer chat and channel)", "n8n Data Table"],
        steps: [
          "Select the topic for the post",
          "Generate a carousel script with an OpenAI model",
          "Build an HTML page for each slide",
          "Render every slide to a PNG through a renderer service",
          "Send the slides to a reviewer on Telegram, with publish controls",
          "Store the post in an n8n Data Table",
          "On approval (a second, GET-webhook flow): post to the Telegram channel and show a confirmation page in the browser",
        ],
        output: "A carousel post published to a Telegram channel after a person approves it",
        businessValue: "A content post is drafted and designed automatically every day, but nothing is published until someone approves it in Telegram.",
      },
      {
        name: "Electricity price alert: email when tomorrow gets expensive",
        trigger: "Every day at 15:00, after tomorrow's day-ahead prices are published (plus a manual test run)",
        connectedSystems: ["Elering public API (Nord Pool day-ahead prices, Estonia)", "Email (SMTP)"],
        steps: [
          "Fetch today's and tomorrow's electricity prices in 15-minute steps",
          "Code node: average both days, turn 15-minute prices into hourly ones, find the most expensive and cheapest hours",
          "Check: is tomorrow 20 % more expensive than today, or does any hour go above 150 €/MWh?",
          "If yes: email the manager the change, the expensive hours to avoid and the cheapest hours to use",
          "If not: do nothing",
        ],
        output: "An HTML email with tomorrow's price change and a suggested decision, e.g. on 14 October 2026 it reported +63 % (14.5 vs 8.9 c/kWh), most expensive 08:00 and 18:00–19:00, cheapest 12:00–13:00.",
        businessValue: "Example use case: a small company with energy-heavy equipment (ovens, compressors, EV charging) gets a decision-ready email the afternoon before, so work can be moved to cheaper hours instead of noticing the cost on next month's bill.",
      },
      {
        name: "AI invoice intake: from email to spreadsheet",
        note: "Workflow design",
        trigger: "A new email with a PDF invoice arrives in the accounting inbox (IMAP)",
        connectedSystems: ["Email (IMAP)", "OpenAI API", "Google Sheets", "Telegram"],
        steps: [
          "Extract the text from the PDF attachment",
          "AI reads the invoice and returns structured JSON: supplier, invoice number, date, due date, net, VAT and total",
          "Code node checks the numbers: net + VAT must equal the total, and the due date must be after the invoice date",
          "If valid: append a row to the invoice log and send accounting a Telegram message to approve the payment",
          "If not: send a Telegram message asking for a manual check, with the reason",
        ],
        output: "A new row in the invoice log, and an approve-or-check message in Telegram",
        businessValue: "Example use case: accounting no longer retypes supplier invoices by hand: they only make the decision (approve the payment or check the invoice), and AI output is never trusted without a numeric check.",
      },
      {
        name: "Website lead triage: AI sorts and routes every message",
        note: "Workflow design",
        trigger: "Someone submits the contact form on the website (POST webhook)",
        connectedSystems: ["Website form (webhook)", "OpenAI API", "Google Sheets (simple CRM)", "Telegram", "Email"],
        steps: [
          "AI classifies the message as sales, support or spam, rates its urgency, and drafts a short reply, returned as JSON",
          "A Switch node routes it by type",
          "Sales: add the lead to the CRM sheet and alert the sales person in Telegram with the drafted reply",
          "Support: forward to the support inbox with the summary",
          "Spam: ignore",
          "Confirm to the website that the form was received",
        ],
        output: "Every message ends up in the right place within seconds, with a reply draft ready for sales",
        businessValue: "Example use case: a small team stops checking one shared inbox: new leads get a fast, personal answer, and nobody spends time on spam.",
      },
    ],
  },
  {
    slug: "ai-creative-design",
    index: "09",
    title: "AI Creative Design & Visuals",
    category: "Generative AI / Creative Design",
    description:
      "A collection of creative projects made with generative AI, including advertising banners, interior visualizations, digital artwork, and visual design concepts.",
    status: "experimental",
    statusNote: "Ongoing collection",
    role: "Concept, prompting, iteration and final selection",
    technologies: [
      { name: "Midjourney" },
      { name: "Leonardo AI" },
      { name: "Nano Banana Pro" },
      { name: "Remini" },
    ],
    highlights: ["Advertising & banners", "Interior design", "Creative concepts", "Digital art"],
    overview:
      "Not a single project but a collection of the different kinds of visual work I create with generative AI, from advertising banners and interior visualizations to creative concepts and digital art. Each piece lists the AI tools I used.",
    problem: "",
    solution: "",
    howItWorks: [],
    workflow: [],
    features: [],
    implementationDetails: [],
    challenges: [],
    results: [],
    lessons: [],
    screenshots: [],
    tone: "orchid",
    layout: "gallery",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : undefined,
  };
}
