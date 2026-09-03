export interface ValueStatement {
  title: string;
  description: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  contributions: string[];
  tech: string[];
}

export interface ShowcaseProject {
  slug: string;
  title: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  link?: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export interface ProfileContent {
  name: string;
  role: string;
  location: string;
  tagline: string;
  greetings: string[];
  availability: string;
  values: ValueStatement[];
  experiences: ExperienceItem[];
  skills: {
    strengths: string[];
    tools: string[];
    learning: string[];
  };
  showcaseProjects: ShowcaseProject[];
  funFacts: string[];
  contact: ContactLink[];
  socials: ContactLink[];
}

export const profileContent: ProfileContent = {
  name: "Marwan Summakieh",
  role: "Full-Stack Engineer & Creative Technologist | MSc Human-Centered AI @ DTU",
  location: "Copenhagen, Denmark",
  tagline: "I'm a full-stack engineer. Recently I've built a Linux distro that boots into a controller shell, a realtime multiplayer writing app, a live trading bot, and a finished VR game — and I like owning the whole thing, from the OS image to the UI.",
  greetings: [
    "Currently writing an MSc thesis in Human-Centered AI at DTU on simulated prosthetic vision, with hands-on experience across Next.js, React, Python, Node, Godot, Unity, Docker, and Azure.",
    "I ship production applications by day and build operating systems, media servers, and games by night.",
  ],
  availability: "Open to full-stack, systems, and AI-adjacent software engineering roles in Copenhagen (or remote).",
  values: [
    {
      title: "Ship Real Products",
      description:
        "Focus on building and deploying features that reach production, not just prototypes — from Docker containers to live Vercel deployments.",
    },
    {
      title: "Creative Engineering",
      description:
        "Combine software engineering craft with creative expression — from Reel Deal/NinjaFishingVR in Unity VR to real-time strategy AI and custom shader effects.",
    },
    {
      title: "Full-Stack Ownership",
      description:
        "Take responsibility across the stack — from React interfaces to Flask APIs, Azure infrastructure, Unity VR, physics-driven interactions, and everything in between.",
    },
  ],
  experiences: [
    {
      company: "Second Sun",
      role: "Full Stack Developer Intern",
      period: "May 2025 – Sep 2025",
      summary:
        "Built a full-stack web application in Flask for a production-facing turf management platform.",
      contributions: [
        "Containerized application services with Docker to improve deployment consistency and streamline environment setup.",
        "Enhanced sensor-data visualization and core user flows to strengthen platform usability.",
        "Improved user interfaces for sensor data monitoring and overall platform experience.",
      ],
      tech: ["Python", "Flask", "Docker", "JavaScript", "HTML", "CSS"],
    },
    {
      company: "Zaki's Skrædder & Renseri",
      role: "Freelance Software Engineer",
      period: "Sep 2024 – Apr 2025",
      summary:
        "Developed a full-stack web platform using Next.js and MongoDB for a tailoring business.",
      contributions: [
        "Designed and implemented a Track & Trace ticketing system that digitized manual order workflows.",
        "Deployed the application on Vercel for scalable, production-ready hosting.",
        "Created Figma prototypes to align stakeholders before implementation.",
      ],
      tech: ["Next.js", "React Native", "MongoDB", "Tailwind CSS", "Vercel", "Figma"],
    },
    {
      company: "Joker IT",
      role: "Cloud Developer",
      period: "Aug 2023 – Aug 2024",
      summary:
        "Managed Azure cloud infrastructure as the sole developer, using PowerShell automation to support operational workflows.",
      contributions: [
        "Developed and deployed a custom Outlook extension to improve enterprise email productivity.",
        "Maintained legacy systems with 99% uptime to support client operations.",
        "Integrated Copilot AI into development workflows to streamline code generation and troubleshooting.",
      ],
      tech: ["Azure", "PowerShell", "React", "Microsoft Office Add-in", "SharePoint REST API", "OAuth"],
    },
  ],
  skills: {
    strengths: [
      "Full-stack product delivery",
      "VR & interactive 3D development",
      "Cloud infrastructure & automation",
      "Human-centered UX engineering",
    ],
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "Flask",
      "Node.js",
      "Java",
      "C#",
      "Go",
      "Unity",
      "OpenXR",
      "Unity UI Toolkit",
      "Docker",
      "Azure",
      "PowerShell",
      "MongoDB",
      "SQL",
      "Vercel",
      "CI/CD",
      "Tailwind CSS",
      "Figma",
      "Git",
    ],
    learning: [
      "Blender — 3D modeling & visual storytelling",
      "VR experience design with Unity XR",
      "Human-Centered AI research at DTU",
      "Advanced game AI & behavior systems",
    ],
  },
  showcaseProjects: [
    {
      slug: "turf-management",
      title: "Turf Management Platform",
      problem:
        "Course managers needed a unified tool to monitor sensor data and manage turf conditions across their facilities.",
      solution:
        "Built a full-stack Flask application with Docker containerization, improving deployment consistency and enabling clearer sensor data visualization.",
      impact:
        "Improved deployment workflow reliability and enhanced sensor data monitoring for end users.",
      tech: ["Python", "Flask", "Docker", "JavaScript"],
    },
    {
      slug: "tailor-order-tracking",
      title: "Track & Trace Order System",
      problem:
        "A tailoring business relied on manual order tracking, leading to lost orders and repeated customer inquiries.",
      solution:
        "Delivered a full-stack web platform with Next.js and MongoDB, including a Track & Trace ticketing system to digitize the entire order workflow.",
      impact:
        "Digitized manual workflows, provided real-time order visibility for customers, and reduced operational overhead for staff.",
      tech: ["Next.js", "MongoDB", "React Native", "Tailwind CSS", "Vercel"],
    },
    {
      slug: "outlook-workflow",
      title: "Outlook File Management Extension",
      problem:
        "Consultants duplicated effort moving attachments between Outlook and SharePoint, increasing audit risk.",
      solution:
        "Packaged document upload, metadata tagging, and notifications into a single Outlook add-in flow with secure OAuth authentication.",
      impact:
        "Reduced manual steps for file handoffs and standardized the archive process for project teams.",
      tech: ["Microsoft Office Add-in", "React", "SharePoint REST API", "OAuth"],
    },
    {
      slug: "azure-provisioning",
      title: "Azure Cloud Provisioning Tool",
      problem:
        "Manual Azure resource setup was error-prone and inconsistent across client environments.",
      solution:
        "Built an automated provisioning tool with PowerShell and Azure CLI, including dashboards for monitoring resource allocation.",
      impact:
        "Maintained 99% uptime for legacy systems and standardized cloud resource deployment across the organization.",
      tech: ["Azure", "PowerShell", "Azure CLI", "Azure Functions", "REST APIs"],
    },
  ],
  funFacts: [
    "Table tennis",
    "Football, watching and playing",
    "Learning to play the piano",
    "Writing short stories",
    "Video games",
    "Creating visual experiences in VR",
    "Learning 3D modeling in Blender",
  ],
  contact: [
    {
      label: "Email",
      value: "marwansummakieh97@gmail.com",
      href: "mailto:marwansummakieh97@gmail.com",
    },
    {
      label: "Phone",
      value: "+45 27 29 78 28",
      href: "tel:+4527297828",
    },
    {
      label: "Location",
      value: "Copenhagen, Denmark",
      href: "https://maps.app.goo.gl/1CFU5Cw2fUu2H7mH9",
    },
  ],
  socials: [
    {
      label: "LinkedIn",
      value: "linkedin.com/in/marwan-summakieh-36aab4290",
      href: "https://www.linkedin.com/in/marwan-summakieh-36aab4290/",
    },
    {
      label: "GitHub",
      value: "github.com/MarwanSummakieh",
      href: "https://github.com/MarwanSummakieh",
    },
  ],
};
