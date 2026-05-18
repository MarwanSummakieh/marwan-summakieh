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
  role: "Full-Stack Engineer & Creative Technologist",
  mission:
    "Building production web apps by day, exploring VR experiences, game development, and creative computing by night — all through the lens of human-centered AI research at DTU.",
  headline: "Marwan Summakieh — Full-Stack Engineer & Creative Technologist",
  introduction: [
    "I ship production software — from enterprise cloud tooling at Joker IT, to a real-time turf management platform at Second Sun, to a full-stack order tracking system as a freelancer. I bring hands-on experience across the modern web stack, Unity game development, and VR interaction design.",
    "Currently pursuing my MSc in Human-Centered AI at DTU, I'm exploring the intersection of software engineering, visual computing, and creative expression — from Reel Deal/NinjaFishingVR, to real-time strategy AI, neural networks, and Elden Ring social graph analysis.",
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
    title: "Game Development & VR",
    description:
      "Creating interactive experiences in Unity — from real-time strategy AI to tactile VR games with physics-driven systems, haptics, and custom shaders.",
    deliverables: [
      "Unity VR experiences with XR Interaction Toolkit and OpenXR",
      "Physics-driven VR interactions, haptics, and diegetic UI",
      "Custom ShaderLab & HLSL visual effects",
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
    title: "AI & Creative Computing",
    description:
      "Applying machine learning, network analysis, and human-centered AI research to creative and analytical projects.",
    deliverables: [
      "Neural networks built from scratch in Python",
      "Social graph analysis and NLP on game data",
      "Learning Blender for 3D visual storytelling",
    ],
  },
];

export const gameProjects: GameProject[] = [
  {
    slug: "real-time-strategie",
    title: "Real-Time Strategie",
    status: "Prototype",
    summary:
      "A Unity RTS prototype combining unit selection, behavior-tree driven AI, and custom ShaderLab effects — with a playable demo on YouTube.",
    focus:
      "Exploring core RTS mechanics with decision-making AI, camera control, unit management, and shader-driven visual clarity.",
    outcomes: [
      "Implemented behavior trees guiding enemy decision-making and combat AI",
      "Built drag-select unit selection with formation movement",
      "Created custom ShaderLab shaders for visual feedback and readability",
      "Shipped a playable prototype with full game loop",
    ],
    tech: ["Unity", "C#", "ShaderLab", "AI Behavior Trees"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/Real-Time-Strategie",
      },
    ],
  },

  {
    slug: "ninja-fishing-vr",
    title: "Reel Deal (NinjaFishingVR)",
    status: "Released",
    summary:
      "A finished DTU 02566 Unity VR game where players fish from a boat, store catches in a cooler, slice them with a katana, earn money, and upgrade equipment.",
    focus:
      "Programming tactile VR systems for the hook minigame, guided onboarding, wristwatch progression, and the feedback loops that make fishing and slicing readable in-headset.",
    outcomes: [
      "Main programmer for the hook mechanic: thumbstick bobber control, moving target circle, success/fail progress, fish difficulty scaling, and rod upgrade balancing",
      "Built step-by-step VR tutorial flow with holographic instructions, controller button imagery, pulsing input highlights, and blinking world-object guidance",
      "Co-implemented progression systems through a Unity UI Toolkit wristwatch with collection book, equipment shop, money display, and render-texture previews",
      "Contributed to a 13-week playable vertical slice with fishing, cooler storage, slicing, earnings, upgrades, mostly self-made 3D assets, and final demo-day validation",
      "Used two rounds of user testing with 16 total participants to improve casting, hook clarity, cooler feedback, tutorial visibility, sound, and bobber physics",
      "Helped connect feedback across sound, haptics, readable UI, physical VR objects, and motion-control interactions",
    ],
    tech: [
      "Unity 6",
      "C#",
      "XR Interaction Toolkit",
      "OpenXR",
      "Unity Input System",
      "Unity UI Toolkit",
      "URP",
      "EzySlice",
    ],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/ReelDeal",
      },
      {
        label: "Project README",
        href: "https://github.com/MarwanSummakieh/ReelDeal#readme",
      },
    ],
  },
  {
    slug: "basket-ball-vr",
    title: "Basketball VR",
    status: "Prototype",
    summary:
      "A VR basketball experience for Oculus headsets built in Unity with the XR Interaction Toolkit — complete with physics-based throwing and scoring.",
    focus:
      "Creating an immersive VR sports experience with realistic ball physics, hand tracking, and spatial audio in a standing play space.",
    outcomes: [
      "Configured Oculus XR and XR Interaction Toolkit for standing VR play",
      "Implemented physics-based ball throwing with accurate trajectory",
      "Built scoring system with visual and audio feedback",
      "Wrote HLSL shader code for visual polish",
    ],
    tech: ["Unity", "C#", "XR Interaction Toolkit", "Oculus XR Plugin", "HLSL"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/Basket-Ball-VR",
      },
    ],
  },
  {
    slug: "neural-network",
    title: "Neural Network from Scratch",
    status: "Research",
    summary:
      "A ground-up neural network implementation in pure Python — no frameworks, just math. Covers neurons, layers, activation functions, and loss calculation.",
    focus:
      "Deep understanding of neural network fundamentals by implementing every component from first principles.",
    outcomes: [
      "Built forward-pass computation with dot products and layer objects",
      "Implemented ReLU and Softmax activation functions from scratch",
      "Coded categorical cross-entropy loss calculation",
      "Demonstrated multi-input neuron and multi-layer architectures",
    ],
    tech: ["Python", "NumPy", "Machine Learning"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/Neural-Network",
      },
    ],
  },
  {
    slug: "elden-ring-social-graphs",
    title: "Elden Ring Social Graphs",
    status: "Research",
    summary:
      "Network analysis of the Elden Ring universe — mapping character relationships through community detection, NLP, and TF-IDF text analysis. DTU coursework.",
    focus:
      "Applying social graph theory and NLP to game narrative data, extracting meaningful community structures from interconnected lore.",
    outcomes: [
      "Constructed character relationship graphs from Elden Ring wiki data",
      "Applied community detection algorithms to identify character factions",
      "Used TF-IDF and NLP techniques to analyze lore text patterns",
      "Visualized network structures with interactive graph renderings",
    ],
    tech: ["Python", "Jupyter", "NetworkX", "NLP", "TF-IDF"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/social_graphs_project",
      },
    ],
  },
  {
    slug: "emergency-button",
    title: "Emergency Alert App",
    status: "Released",
    summary:
      "A React Native/Expo mobile app for sending emergency alerts with real-time GPS location and push notifications — built collaboratively with 3 contributors.",
    focus:
      "Delivering a reliable, location-aware emergency communication tool with instant notifications and minimal user friction.",
    outcomes: [
      "Built with React Native and Expo for cross-platform deployment",
      "Integrated Firebase for real-time alerts and push notifications",
      "Implemented GPS location sharing on emergency trigger",
      "Collaborated with 2 other developers through structured Git workflow",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Firebase", "GPS"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/Emergency-Button",
      },
    ],
  },
  {
    slug: "terminal-go",
    title: "Custom Terminal",
    status: "Prototype",
    summary:
      "A custom terminal emulator built from the ground up in Go — exploring systems programming, process management, and shell mechanics.",
    focus:
      "Learning Go and low-level systems concepts by building a functional terminal from scratch.",
    outcomes: [
      "Implemented command parsing with argument handling",
      "Built process spawning and I/O stream management in Go",
      "Explored Go concurrency patterns for background processes",
    ],
    tech: ["Go", "Systems Programming"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/Terminal",
      },
    ],
  },
  {
    slug: "not-pirate-bay",
    title: "Not Pirate Bay",
    status: "Prototype",
    summary:
      "A React + TypeScript web application with Azure Static Web Apps CI/CD — demonstrating modern frontend architecture and automated cloud deployment.",
    focus:
      "Practicing React architecture, TypeScript patterns, and Azure DevOps integration with automated deployments.",
    outcomes: [
      "Set up Azure Static Web Apps CI/CD pipeline with GitHub Actions",
      "Built a typed React frontend with TypeScript and component architecture",
      "Configured automated deployment workflows for seamless delivery",
    ],
    tech: ["React", "TypeScript", "Azure Static Web Apps", "GitHub Actions"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/MarwanSummakieh/Not-Pirate-bay",
      },
    ],
  },
  {
    slug: "vibe-opsy",
    title: "Vibe-Opsy — Skin Cancer Detection AI",
    status: "Released",
    summary:
      "An ML-first skin lesion classification app delivering 7-class diagnostic predictions from dermatoscopic images, wrapped in a retro 3D interface. Built as part of DTU MLOps course (02476).",
    focus:
      "Prioritizing machine learning reliability and inference workflow: dataset handling, model serving, and prediction delivery, with the frontend designed to make clinical-style outputs understandable.",
    outcomes: [
      "Implemented end-to-end 7-category skin lesion inference flow",
      "Connected frontend uploads to production ML prediction service",
      "Validated prediction output format and confidence reporting for user readability",
      "Built interactive 3D Macintosh Classic using Three.js and React Three Fiber",
      "Designed retro CRT effects, scanline animations, and thermal receipt UI",
      "Deployed to Cloudflare Workers with CI/CD on push to master",
      "Collaborated with a team of 5 contributors",
    ],
    tech: ["React 19", "TypeScript", "Three.js", "React Three Fiber", "Framer Motion", "Tailwind CSS", "Cloudflare Workers", "Vite"],
    links: [
      {
        label: "Live website",
        href: "https://vibe-opsy.aryan-mi.workers.dev/",
      },
      {
        label: "GitHub repository",
        href: "https://github.com/Aryan-Mi/vibe-opsy",
      },
    ],
  },
  {
    slug: "multi-agent-system",
    title: "Multi-Agent System Warmup",
    status: "Research",
    summary:
      "A multi-agent systems exercise from DTU course 02285 — implementing collaborative agent planning, coordination, and problem-solving in structured environments.",
    focus:
      "Exploring multi-agent coordination, search algorithms, and collaborative planning strategies for complex problem spaces.",
    outcomes: [
      "Implemented multi-agent search and planning algorithms",
      "Built agent coordination and communication protocols",
      "Solved complex multi-agent planning problems collaboratively",
    ],
    tech: ["Python", "Multi-Agent Systems", "AI Planning", "Search Algorithms"],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/WendyHui805/02285-Multi-Agent-System-Warmup",
      },
    ],
  },
];

export const toolkit: ToolkitCategory[] = [
  {
    name: "Languages",
    tools: ["Python", "JavaScript", "TypeScript", "Java", "C#", "Go", "Kotlin"],
  },
  {
    name: "Front-End",
    tools: ["React", "React Native", "Next.js", "Three.js", "React Three Fiber", "Tailwind CSS", "HTML/CSS"],
  },
  {
    name: "Back-End & Databases",
    tools: ["Flask", "Node.js", "ASP.NET", "MongoDB", "SQL", "Firebase", "REST APIs"],
  },
  {
    name: "Cloud & DevOps",
    tools: ["Azure", "Docker", "Cloudflare Workers", "PowerShell", "Vercel", "CI/CD", "GitHub Actions"],
  },
  {
    name: "Game Dev & VR",
    tools: ["Unity", "C# for Unity", "XR Interaction Toolkit", "OpenXR", "Unity Input System", "Unity UI Toolkit", "Oculus XR", "ShaderLab", "HLSL", "EzySlice"],
  },
  {
    name: "AI & Data",
    tools: ["Neural Networks", "NLP / TF-IDF", "NetworkX", "Jupyter", "MLOps", "Multi-Agent Systems", "Human-Centered AI"],
  },
  {
    name: "Creative Tools",
    tools: ["Blender (learning)", "Figma", "UX Research", "3D Modeling"],
  },
  {
    name: "Collaboration",
    tools: ["Git", "GitHub", "Microsoft Power Platform", "Notion"],
  },
];

export const resources: ResourceLink[] = [
  {
    label: "GitHub Profile",
    description: "All source code, game prototypes, and open-source projects.",
    href: "https://github.com/MarwanSummakieh",
  },
  {
    label: "LinkedIn",
    description: "Professional profile, experience, and connections.",
    href: "https://www.linkedin.com/in/marwan-summakieh-36aab4290/",
  },
];
// End of resources array
