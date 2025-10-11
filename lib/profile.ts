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
  role: "Software Engineer | Human-Centered AI Graduate Student",
  location: "Copenhagen, Denmark",
  tagline: "Results-driven engineer focused on intuitive user experiences and AI-enabled workflows.",
  greetings: [
    "Pursuing a master's degree in Human-Centered AI while delivering front-end solutions that clarify complex user journeys.",
    "Experienced in React, TypeScript, cloud tooling, and UX analysis for products that reduce friction and improve adoption.",
  ],
  availability: "Open to opportunities in product engineering, user experience optimisation, and AI-assisted interface design.",
  values: [
    {
      title: "User-Focused Delivery",
      description:
        "Anchor decisions in research and measurable improvements to the user journey before scaling delivery.",
    },
    {
      title: "Standards and Consistency",
      description:
        "Document guidelines, maintain reusable components, and align teams on accessibility and quality benchmarks.",
    },
    {
      title: "Evidence-Based Iteration",
      description:
        "Audit current systems, identify blockers, and prioritise changes that improve performance and maintainability.",
    },
  ],
  experiences: [
    {
      company: "Second Sun",
      role: "Frontend Developer",
      period: "2025",
      summary:
        "Elevated the UI of a golf-course shade analysis platform by restructuring journeys and aligning standards.",
      contributions: [
        "Designed interface components that aligned the product with user requirements and increased clarity.",
        "Analysed the existing front-end implementation and produced recommendations for usability improvements.",
        "Created implementation guidelines so the engineering team could apply changes consistently across the product.",
      ],
      tech: ["Python Flask", "HTML", "CSS", "JavaScript"],
    },
    {
      company: "Joker IT",
      role: "Software Engineer",
      period: "2023 — 2024",
      summary:
        "Implemented productivity tooling that reduced manual effort for document management and cloud provisioning.",
      contributions: [
        "Developed a Microsoft Outlook add-in that enabled direct SharePoint uploads without leaving the mail client.",
        "Implemented secure authentication flows and error handling to safeguard file transfers and metadata.",
        "Produced user documentation and training assets to accelerate onboarding.",
      ],
      tech: [
        "Microsoft Office Add-in Framework",
        "React",
        "SharePoint REST API",
        "OAuth",
      ],
    },
    {
      company: "Joker IT",
      role: "Software Engineer",
      period: "2023",
      summary:
        "Delivered an automated provisioning tool that improved Azure deployment consistency and speed.",
      contributions: [
        "Designed a provisioning architecture that standardised resource group creation and policy management.",
        "Built an operational dashboard for tracking resource allocation and detecting configuration issues.",
        "Automated common onboarding tasks and established logging to monitor reliability.",
      ],
      tech: ["Azure Resource Manager", "PowerShell", "Azure CLI", "Azure Functions", "REST APIs"],
    },
    {
      company: "Freelance",
      role: "Software Engineer",
      period: "2024",
      summary:
        "Developed web and mobile applications for a tailoring business to improve customer visibility and internal tracking.",
      contributions: [
        "Launched a Next.js marketing site and an order-tracking application covering drop-off through pick-up.",
        "Integrated AWS-hosted services via Vercel to handle traffic and deployment workflows.",
        "Delivered UI prototypes in Figma and Relume to align stakeholders before implementation.",
      ],
      tech: ["Next.js", "React Native", "Tailwind CSS", "AWS", "Vercel", "Figma", "Relume"],
    },
  ],
  skills: {
    strengths: [
      "Front-end architecture for complex workflows",
      "Human-centered journey analysis",
      "Automation and platform integration",
      "Structured documentation and training",
    ],
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python Flask",
      "Azure Functions",
      "Power Platform",
      "SharePoint",
      "GitHub Actions",
      "Figma",
      "Relume",
    ],
    learning: [
      "Human-Centered AI research",
      "Advanced C# for tooling",
      "Design system governance",
    ],
  },
  showcaseProjects: [
    {
      slug: "shade-analysis",
      title: "Shade Analysis Platform UI Refresh",
      problem:
        "Course designers struggled to interpret shade projections due to inconsistent interface patterns and terminology.",
      solution:
        "Refined layout structure, introduced reusable UI components, and formalised design guidelines for the product team.",
      impact:
        "Improved user navigation through the analysis workflow and reduced ambiguity in status reporting.",
      tech: ["Python Flask", "HTML", "CSS", "JavaScript"],
    },
    {
      slug: "outlook-workflow",
      title: "Outlook File Management Extension",
      problem:
        "Consultants duplicated effort moving attachments between Outlook and SharePoint, increasing audit risk.",
      solution:
        "Packaged document upload, metadata tagging, and notifications into a single Outlook add-in flow.",
      impact:
        "Reduced manual steps for file handoffs and standardised the archive process for project teams.",
      tech: ["Microsoft Office Add-in", "React", "SharePoint REST API", "OAuth"],
    },
    {
      slug: "tailor-order-tracking",
      title: "Tailoring Order Tracking Suite",
      problem:
        "Retail staff lacked a reliable system for tracking garment progress, leading to repeated customer enquiries.",
      solution:
        "Delivered a responsive web portal and companion mobile flows to provide order status visibility.",
      impact:
        "Provided real-time tracking for customers and removed manual reconciliation work for staff.",
      tech: ["Next.js", "React Native", "Tailwind CSS", "Vercel", "AWS"],
    },
  ],
  funFacts: [
    "Table tennis",
    "Football, watching and playing",
    "Learning to play the piano",
    "Writing short stories",
    "Video games",
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
