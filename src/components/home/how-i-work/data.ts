/* ────────────────────────────────────────────────────────────────────────────
 * "How I work with AI": three stages, three different real projects.
 *
 * Every fact here is taken from the projects' own source code or from
 * src/data/projects.ts. Annotation positions are percentages of the image.
 * ──────────────────────────────────────────────────────────────────────────── */

import type { CodeExcerpt } from "@/components/case-study/meal-planner/data";

export interface Step {
  title: string;
  text: string;
}

export interface Marker {
  x: number;
  y: number;
  label: string;
}

export interface StageImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  markers?: Marker[];
}

export interface Stage {
  id: "design" | "develop" | "connect";
  label: string;
  motto: string;
  title: string;
  accent: string;
  copy: string;
  stepsLabel: string;
  steps: Step[];
  project: { name: string; href: string; note: string };
  stack: string[];
  images?: [StageImage, StageImage];
  facts?: { value: string; label: string }[];
}

export const stages: Stage[] = [
  {
    id: "design",
    label: "Design",
    motto: "Decide what the model does, and what it never does.",
    title: "Every detail starts with a",
    accent: "decision.",
    copy: "I explore user needs, structure information and design experiences that feel intuitive before a single component is built.",
    stepsLabel: "Before the first prompt",
    steps: [
      { title: "Split the work", text: "The model proposes dishes and amounts. Calories, sums and structure are decided in Java." },
      { title: "Ground it in real data", text: "Prompts are built from the user's pantry, saved recipes and this week's menu." },
      { title: "Design the answer's shape", text: "Every AI response maps to a typed record and is validated against a schema before it is shown." },
      { title: "Show the AI's work", text: "The user can open how the AI reasoned, and AI-estimated calories are marked." },
      { title: "Test, then decide", text: "HIGH thinking took 14× longer than LOW without a better recipe, so the app runs on LOW." },
    ],
    project: {
      name: "AI Nutrition & Weekly Meal Planner",
      href: "/projects/ai-nutrition-meal-planner",
      note: "Personal project · awarded at the course and by the RingIT company",
    },
    stack: ["Vue 3", "Java 21 & Spring Boot", "Gemini via Spring AI", "PostgreSQL"],
    facts: [
      { value: "3", label: "layers between the user's words and the model" },
      { value: "14×", label: "slower on HIGH thinking, no better result" },
    ],
    images: [
      {
        src: "/projects/ai-nutrition-meal-planner/01-weekly-menu.png",
        alt: "Weekly menu screen of the AI meal planner, in Estonian, with dishes, quantities and calories per person",
        width: 2880,
        height: 2000,
        caption: "Weekly menu · real screenshot, Estonian interface",
        markers: [
          { x: 33, y: 22.7, label: "Grounding is visible: the AI uses what's at home and the saved recipes." },
          { x: 25, y: 37, label: "\"How the AI thought\": the model's reasoning, one click away." },
          { x: 23, y: 61, label: "Calories per person are calculated in Java from the quantities." },
          { x: 45.3, y: 61, label: "* marks a value the AI estimated for a product missing from the nutrition table." },
        ],
      },
      {
        src: "/projects/ai-nutrition-meal-planner/cover-pantry-and-daily-calories.png",
        alt: "Pantry screen with products at home and today's calorie progress",
        width: 2880,
        height: 2000,
        caption: "The pantry: the data every prompt starts from",
      },
    ],
  },
  {
    id: "develop",
    label: "Develop",
    motto: "Write the spec. Build in milestones. Review every step.",
    title: "Design becomes",
    accent: "functionality.",
    copy: "I build responsive interfaces and full-stack applications, connecting frontend experiences with real logic and data.",
    stepsLabel: "AI in the process, people in control",
    steps: [
      { title: "Spec before code", text: "A written spec, a milestone roadmap and binding engineering rules come first." },
      { title: "Build with Claude Code", text: "Milestone by milestone, with a review step after each one." },
      { title: "Make every step safe to repeat", text: "Model calls, renders and publishing run as retryable jobs in PostgreSQL." },
      { title: "Claude drafts, a person approves", text: "Ideas, scripts and translations come from Claude. Nothing is published without approval." },
    ],
    project: {
      name: "Content Factory",
      href: "/projects/content-factory",
      note: "Multi-tenant content platform · version 0.68",
    },
    stack: ["Go", "Anthropic Claude API", "PostgreSQL", "River jobs", "ffmpeg", "templ + HTMX"],
    facts: [
      { value: "213", label: "test files" },
      { value: "64", label: "database migrations" },
      { value: "~590", label: "Go files" },
    ],
    images: [
      {
        src: "/projects/content-factory/01-generated-ideas.webp",
        alt: "Content Factory ideas screen with AI-generated post ideas, scores and Approve or Reject buttons",
        width: 1800,
        height: 1220,
        caption: "Ideas · real screenshot, demo workspace",
        markers: [
          { x: 34.5, y: 14.3, label: "Claude generates ideas from the brand profile and its described photos and clips." },
          { x: 27.6, y: 52, label: "Each idea carries a score, so the best ones surface first." },
          { x: 86, y: 37.5, label: "A person approves or rejects. Only approved ideas become posts." },
        ],
      },
      {
        src: "/projects/content-factory/02-script-editor.webp",
        alt: "Script editor where a person can rewrite the AI-written video script beat by beat",
        width: 1800,
        height: 1621,
        caption: "Script editor: the AI's draft stays editable, beat by beat",
      },
    ],
  },
  {
    id: "connect",
    label: "Connect",
    motto: "Treat AI output like user input.",
    title: "Everything works",
    accent: "together.",
    copy: "I connect interfaces, backend services, APIs, databases and integrations into complete applications that solve real problems.",
    stepsLabel: "Three layers of safety",
    steps: [
      { title: "Strict rules for the model", text: "It sees only the schema and returns one SELECT in JSON, or FORBIDDEN / CANNOT_ANSWER." },
      { title: "Checks in Java", text: "Only SELECT, no write keywords, no user table. Anything else is rejected before it runs." },
      { title: "A read-only database", text: "The query runs on a read-only connection and is rolled back, so a missed case still can't write." },
    ],
    project: {
      name: "AI Data Assistant Chatbot",
      href: "/projects/ai-data-assistant",
      note: "Vali-IT team project · I built the AI chat backend",
    },
    stack: ["Spring Boot REST", "Spring AI & Gemini", "Java validation", "PostgreSQL"],
  },
];

/* ── Connect: the chatbot's request path ─────────────────────────────────── */

export interface SystemNode {
  id: string;
  name: string;
  role: string;
  /** Who built it: "me" = my part of the team project. */
  owner: "me" | "team";
  detail: string;
  code?: CodeExcerpt;
}

export const systemNodes: SystemNode[] = [
  {
    id: "app",
    name: "Web app",
    role: "Vue 3 · the question",
    owner: "team",
    detail: "An admin asks in plain language. The app is the team's Vue 3 frontend; the chat screen itself is still planned.",
  },
  {
    id: "api",
    name: "REST API",
    role: "Spring Boot · POST /api/ask",
    owner: "me",
    detail: "One endpoint takes { question } and returns { answer, sql }, so every answer can be checked against its query.",
    code: {
      file: "controller/AiController.java",
      lang: "java",
      code: `@PostMapping("/ask")
public AiAskResponseDto ask(@Valid @RequestBody AiAskRequestDto aiAskRequestDto) {
    return nlToSqlService.ask(aiAskRequestDto.getQuestion());
}`,
    },
  },
  {
    id: "sql",
    name: "SQL from the model",
    role: "Gemini via Spring AI",
    owner: "me",
    detail: "The prompt holds the database schema and numbered rules. The model may answer only with one SELECT, or with FORBIDDEN or CANNOT_ANSWER.",
    code: {
      file: "service/NlToSqlService.java · system prompt",
      lang: "text",
      code: `1. Return JSON {"answer": "<sql>"} where <sql> is ONLY one raw SQL SELECT statement.
4. Never generate INSERT, UPDATE, DELETE, DROP, ALTER or TRUNCATE.
5. If the question asks to modify, delete, insert or save data, return {"answer": "FORBIDDEN"}.
6. If the question cannot be answered using this schema, return {"answer": "CANNOT_ANSWER"}.`,
    },
  },
  {
    id: "validate",
    name: "Validation",
    role: "Java · before anything runs",
    owner: "me",
    detail: "Generated SQL is untrusted. It must start with SELECT and may not contain write keywords or touch the user table.",
    code: {
      file: "service/NlToSqlService.java",
      lang: "java",
      code: `String upperCaseSql = generatedSql.toUpperCase();

if (!upperCaseSql.startsWith("SELECT")) {
    throw new IncorrectInputException("Lubatud on ainult SELECT päringud", "FORBIDDEN_SQL");
}

// Keelatud märksõnad ükskõik kus päringus (\\b = terve sõna)
if (upperCaseSql.matches("(?s).*\\\\b(DROP|DELETE|INSERT|UPDATE|TRUNCATE|ALTER|GRANT|COPY|CALL|DO|CREATE|MERGE|INTO)\\\\b.*")) {
    throw new IncorrectInputException("Päring sisaldab keelatud SQL märksõnu", "FORBIDDEN_SQL");
}`,
    },
  },
  {
    id: "db",
    name: "PostgreSQL",
    role: "Read-only · rolled back",
    owner: "me",
    detail: "Jobs, cargo, vehicles and crane capacities. The query runs on a read-only connection, so PostgreSQL itself rejects any write.",
    code: {
      file: "service/NlToSqlService.java",
      lang: "java",
      code: `connection.setAutoCommit(false);
connection.setReadOnly(true);
try (Statement statement = connection.createStatement();
     ResultSet resultSet = statement.executeQuery(sql)) {
    // ...
} finally {
    // Midagi ei salvestata
    connection.rollback();
}`,
    },
  },
  {
    id: "summary",
    name: "Summary",
    role: "Gemini · 1 to 3 sentences",
    owner: "me",
    detail: "The model turns the rows into a short answer in the language of the question, specific about numbers, with no SQL jargon.",
  },
  {
    id: "answer",
    name: "Answer + SQL",
    role: "Back to the app",
    owner: "me",
    detail: "The answer is returned together with the query it came from. Refusals come back as a clear 400 message instead of a guess.",
  },
];

export interface Question {
  text: string;
  /** Index of the last node the request reaches. */
  reaches: number;
  outcome: string;
}

export const questions: Question[] = [
  {
    text: "Which vehicles can lift 4 tonnes at a 10 m reach?",
    reaches: systemNodes.length - 1,
    outcome: "Passes every layer. Answer and SQL go back to the app.",
  },
  {
    text: "Delete all cancelled jobs.",
    reaches: 3,
    outcome: "The model answers FORBIDDEN, Java stops it: FORBIDDEN_SQL. Nothing reaches the database.",
  },
  {
    text: "What will the weather be tomorrow?",
    reaches: 3,
    outcome: "Not in the schema, so the model answers CANNOT_ANSWER instead of guessing.",
  },
];
