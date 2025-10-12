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
  role: "Software engineer learning game development basics",
  mission:
    "Documenting the shift from product engineering into game development by studying core fundamentals and translating past delivery experience into new engines.",
  headline: "Following how Marwan Summakieh is learning game development",
  introduction: [
    "After shipping enterprise tooling with teams like Second Sun and Joker IT, I am carving out time to become a beginner again and learn the essentials of game creation.",
    "The current plan is to focus on Unreal Engine while exploring Unity, applying front-end and automation skills to small exercises, prototypes, and repeatable learning routines.",
  ],
  callToAction: {
    primary: { label: "View Projects", href: "/projects" },
    secondary: { label: "Explore GitHub", href: "https://github.com/MarwanSummakieh" },
  },
};

export const focusAreas: FocusArea[] = [
  {
    title: "Systems & Loop Design",
    description:
      "Designing player-centric loops that balance clarity, challenge, and progression for small team execution.",
    deliverables: [
      "Combat sandbox prototypes in Unity",
      "Economy spreadsheets and tuning docs",
      "UX flows for onboarding and tutorials",
    ],
  },
  {
    title: "Narrative & Worldbuilding",
    description:
      "Translating tabletop storytelling skills into interactive narrative structures and branching dialogue.",
    deliverables: [
      "Quest design bibles and pacing outlines",
      "Dialogue scripting in Ink and Yarn Spinner",
      "Lore development grounded in player agency",
    ],
  },
  {
    title: "Technical Tooling",
    description:
      "Creating pipelines that keep iteration fast, reproducible, and accessible to collaborators.",
    deliverables: [
      "Unity editor utilities for rapid level assembly",
      "Procedural map generation experiments",
      "Versioned design documentation in Notion",
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
    name: "Engines & Frameworks",
    tools: ["Unity", "Godot", "Ink", "Yarn Spinner"],
  },
  {
    name: "Programming",
    tools: ["C#", "TypeScript", "Python", "Lua"],
  },
  {
    name: "Design & Narrative",
    tools: ["Notion", "Miro", "Figma", "Twine"],
  },
  {
    name: "Collaboration",
    tools: ["GitHub", "Supabase", "Linear", "PlaytestCloud"],
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