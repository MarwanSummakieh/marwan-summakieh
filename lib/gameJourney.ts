export interface FocusArea {
  title: string;
  description: string;
  deliverables: string[];
}

export interface GameProject {
  slug: string;
  title: string;
  status: "Prototype" | "In Production" | "Released" | "Research";
  summary: string;
  focus: string;
  outcomes: string[];
  tech: string[];
  links?: { label: string; href: string }[];
}

export interface ToolkitCategory {
  name: string;
  tools: string[];
}

export interface ResourceLink {
  label: string;
  description: string;
  href: string;
}

export const journeyOverview = {
  role: "Full-Stack Software Engineer & MSc Student",
  mission:
    "Building and deploying production-ready web applications across front end, backend, and cloud — while pursuing a master's in Human-Centered AI at DTU.",
  headline: "Marwan Summakieh — Full-Stack Software Engineer",
  introduction: [
    "With experience shipping enterprise tooling at Joker IT, building a turf management platform at Second Sun, and delivering a full-stack order tracking system as a freelancer, I bring hands-on production experience across the modern web stack.",
    "I'm currently pursuing my MSc in Human-Centered Artificial Intelligence at DTU, applying research-informed thinking to everything I build — from React and Next.js interfaces to Flask APIs and Azure infrastructure.",
  ],
  callToAction: {
    primary: { label: "View Projects", href: "/projects" },
    secondary: { label: "Explore GitHub", href: "https://github.com/MarwanSummakieh" },
  },
};

export const focusAreas: FocusArea[] = [
  {
    title: "Full-Stack Development",
    description:
      "Building complete web applications from front-end interfaces to backend APIs, databases, and deployment pipelines.",
    deliverables: [
      "Next.js and React production applications",
      "Flask and Node.js backend services",
      "MongoDB and SQL database design",
    ],
  },
  {
    title: "Cloud & DevOps",
    description:
      "Managing cloud infrastructure, containerizing applications, and automating deployment workflows for reliable delivery.",
    deliverables: [
      "Azure infrastructure management with PowerShell",
      "Docker containerization for consistent deployments",
      "CI/CD pipelines and Vercel deployments",
    ],
  },
  {
    title: "Human-Centered Design",
    description:
      "Applying AI research and UX principles to create interfaces that are intuitive, accessible, and evidence-driven.",
    deliverables: [
      "User journey analysis and UX prototyping",
      "Accessible, responsive interface design",
      "Research-informed product decisions",
    ],
  },
];

export const gameProjects: GameProject[] = [
  {
    slug: "basket-ball-vr",
    title: "Basketball VR",
    status: "Prototype",
    summary:
      "Unity 2020.3 project delivering a VR basketball experience for Oculus headsets, built on the XR Interaction Toolkit.",
    focus:
      "Maintain a playable hoop scene with headset interactions, controller input, and clear setup documentation.",
    outcomes: [
      "Configured Oculus XR and interaction packages for a standing VR play space",
      "Documented Unity project structure and headset setup for quick onboarding",
      "Implemented scoring logic and scene management within the Ballin.unity scene",
    ],
    tech: ["Unity", "C#", "XR Interaction Toolkit", "Oculus XR Plugin"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/Basket-Ball-VR",
      },
      {
        label: "Setup notes",
        href: "https://raw.githubusercontent.com/MarwanSummakieh/Basket-Ball-VR/main/README.md",
      },
    ],
  },
  {
    slug: "real-time-strategie",
    title: "Real-Time Strategie",
    status: "Prototype",
    summary:
      "An RTS prototype in Unity combining unit selection, behavior-tree driven AI, and custom ShaderLab effects.",
    focus:
      "Explore core RTS mechanics with a focus on decision-making AI and selection flows inspired by genre staples.",
    outcomes: [
      "Shipped controllable unit selection and movement within a playable scene",
      "Implemented behavior trees guiding enemy decision making",
      "Packaged shader experiments to support visual readability in the prototype",
    ],
    tech: ["Unity", "C#", "ShaderLab"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/Real-Time-Strategie",
      },
      {
        label: "Gameplay demo",
        href: "https://youtu.be/8PO0YCkXQO0",
      },
    ],
  },
];

export const toolkit: ToolkitCategory[] = [
  {
    name: "Languages",
    tools: ["Python", "JavaScript", "TypeScript", "Java", "C#", "Kotlin"],
  },
  {
    name: "Front-End",
    tools: ["React", "React Native", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    name: "Back-End & Databases",
    tools: ["Flask", "Node.js", "ASP.NET", "MongoDB", "SQL", "REST APIs"],
  },
  {
    name: "Cloud & DevOps",
    tools: ["Azure", "Docker", "PowerShell", "Vercel", "CI/CD", "GitHub Actions"],
  },
  {
    name: "AI & Data",
    tools: ["MLOps", "Data Analytics", "Human-Centered AI", "Copilot Integration"],
  },
  {
    name: "Design & Collaboration",
    tools: ["Figma", "UX Research", "Git", "Microsoft Power Platform"],
  },
];

export const resources: ResourceLink[] = [
  {
    label: "Design documentation snapshot",
    description: "Core loop breakdowns, economy spreadsheets, and pacing guides (Notion).",
    href: "https://www.notion.so/game-design-snapshot",
  },
  {
    label: "Prototype showcase playlist",
    description: "Short gameplay captures of current vertical slices (YouTube).",
    href: "https://www.youtube.com/playlist?list=prototype-highlights",
  },
  {
    label: "Narrative experiments archive",
    description: "Interactive fiction builds and branching dialogue tests (Itch.io).",
    href: "https://marwansummakieh.itch.io",
  },
];
// End of resources array