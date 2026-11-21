/**
 * Posts for the Writing section. Each post is plain data: chapters of paragraphs.
 * Facts come from the owner (docs/02-owner-info.md → Career story) and the CV.
 * Add a post only when it has real content: no "coming soon" placeholders.
 */

export type Chapter = {
  id: string;
  heading: string;
  /** Optional mono line under the heading, e.g. "Jazz · Data Analyst Intern · 2023". */
  meta?: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  chapters: Chapter[];
};

export const posts: Post[] = [
  {
    slug: "my-journey-so-far",
    title: "My journey so far",
    summary:
      "From LeetCode in my first semester to being on call for a production app: what I learned, in what order, and what each job taught me.",
    date: "2026-11-21",
    chapters: [
      {
        id: "starting-out",
        heading: "Starting out",
        meta: "Bahria University · 2021",
        paragraphs: [
          "I started grinding LeetCode as soon as I joined university. I took part in Meta Hacker Cup and a range of other online coding competitions. I was drawn to computer science early, and contests were the quickest way to find out how much I didn't know yet.",
          "Around the same time I came across the idea of being T-shaped: know the breadth of the whole field, and go deep in one part of it. That idea decided most of what I learned next.",
        ],
      },
      {
        id: "breadth",
        heading: "Breadth: web, then mobile",
        paragraphs: [
          "I learned web development on both sides. On the frontend that meant HTML, CSS, JavaScript and TypeScript, then React, Next.js and Tailwind. I learned the backend alongside it, so I could build a whole app and not just its screens.",
          "After the web I learned Flutter so I could build mobile apps too.",
        ],
      },
      {
        id: "depth",
        heading: "Depth: AI",
        paragraphs: [
          "AI was the part of computer science I kept coming back to, so it became the deep part of the T. I took Andrew Ng's machine learning and deep learning courses and read O'Reilly books on machine learning, deep learning, data science and AI.",
          "Then I started building: projects with classical ML algorithms and with deep learning models, to see how they behave outside a course notebook.",
        ],
      },
      {
        id: "system-design",
        heading: "System design",
        paragraphs: [
          "System design turned out to be one of the most important things I studied. I read Designing Data-Intensive Applications and watched the system design videos from Hello Interview and Jordan has no life on YouTube. I didn't stop at watching. I built the systems they described.",
          "Building them taught me a lot of technologies, but the bigger lessons were different. I stopped being afraid of what happens when something goes wrong. I got better at finding bugs. I learned what to do in a specific failure, and which component to reach for in which situation.",
        ],
      },
      {
        id: "jazz",
        heading: "First internship: data in the finance department",
        meta: "Jazz · Data Analyst Intern · 2023",
        paragraphs: [
          "I found every one of my internships the same way: I applied online, through LinkedIn.",
          "The first was at Jazz, in the finance department. I was responsible for cleaning Excel data files, applying transformations and merging them. I used Python to turn that work into automated pipelines, and then pulled insights out of the cleaned data.",
        ],
      },
      {
        id: "chi-tech",
        heading: "First real client",
        meta: "Chi Tech · Full Stack Developer Intern · 2024",
        paragraphs: [
          "At Chi Tech I worked on a real full-stack project for a real client for the first time. Writing the code turned out to be only part of the job.",
          "I learned how a team communicates and organises its work, and how Docker, Git, debugging, testing and tickets fit into a normal working day.",
        ],
      },
      {
        id: "hull",
        heading: "First full-time role",
        meta: "Hull Technologies · Full Stack AI Engineer · 2025",
        paragraphs: [
          "I was fortunate that my first full-time role was as a Full Stack AI Engineer. I worked on a full-stack app with AI built into it, and used a DCGAN model to enhance image resolution.",
          "My biggest contribution, and the thing I learned most from, was putting my system design study to work. I used threads, managed background workers and handled spikes in requests. I built a complex pipeline and made sure it stayed fault tolerant.",
        ],
      },
      {
        id: "devsinc",
        heading: "Two products and an AI platform",
        meta: "Devsinc · Associate Software Engineer · 2025–2026",
        paragraphs: [
          "At Devsinc I worked on two full-stack products, Supy and BrightBee, and on an AI project.",
          "Supy came first. It followed Domain-Driven Design, and I worked mostly on the backend. The system had more than 10 microservices, and I was responsible for 3 of them. The hard part was understanding the whole repository. It was very large, and it was being moved from legacy code to a DDD design, so the code was complex to manage.",
          "BrightBee was full stack, and it taught me how a product team works day to day. We planned tickets together, reviewed each other's code, built CI/CD pipelines and shipped behind feature flags. I was on call two days a week, taking the live issues that needed fixing.",
          "One day traffic spiked suddenly and our server crashed. I debugged it and found the cause in the dashboard, which was fetching too many complex queries. I created database views for that work, and that fixed the issue.",
          "On the AI side I built an RFP automation platform: an LLM system that drafts RFP responses with structured prompt chaining and domain-specific retrieval. It held 90% factual consistency and a hallucination rate under 5% across more than 500 generated documents.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function readingMinutes(post: Post): number {
  const words = post.chapters
    .flatMap((c) => [c.heading, ...c.paragraphs])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
