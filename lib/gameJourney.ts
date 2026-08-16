export interface FocusArea {
  title: string;
  description: string;
  deliverables: string[];
}

export type ProjectCategory = "systems" | "software" | "games" | "research";

export interface GameProject {
  slug: string;
  title: string;
  status: "Prototype" | "In Production" | "Released" | "Research" | "Live";
  summary: string;
  focus: string;
  outcomes: string[];
  tech: string[];
  links?: { label: string; href: string }[];
  /** Broad shelf the piece sits on. Defaults to "games" for legacy entries. */
  category?: ProjectCategory;
  /** Year the piece was (last) painted. */
  year?: number;
  /** Fresh paint — surfaces on the home wall. */
  fresh?: boolean;
  /** One-line hook, shorter than summary. */
  hook?: string;
  /** Local hero image (public path). */
  image?: { src: string; alt: string };
  /** Note shown alongside the piece (e.g. educational disclaimer). */
  note?: string;
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
    "Currently pursuing my MSc in Human-Centered AI while exploring software engineering, visual computing, and creative expression through Reel Deal/NinjaFishingVR, real-time strategy AI, neural networks, and Elden Ring social graph analysis.",
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
  // ─── Fresh paint (2026) ────────────────────────────────────────────────
  {
    slug: "marwanos",
    title: "MarwanOS",
    status: "In Production",
    category: "systems",
    year: 2026,
    fresh: true,
    hook: "A Linux distro that boots straight into a controller-driven Godot shell. No desktop, no login, no text.",
    summary:
      "A Fedora-based, image-mode Linux distribution built on bootc and Universal Blue that cold-boots into a gamepad-navigable gaming shell written in Godot 4. The OS is a container image; every change ships as `bootc upgrade` and every mistake is one `bootc rollback` away.",
    focus:
      "Owning the whole stack of an appliance OS — kernel args, Plymouth splash, greetd/gamescope session, systemd supervision, udev rules — and drawing the only UI the machine ever shows in a Godot shell built TV-first with controller focus, held-direction repeat, and hotplug player-one detection. Architecture decisions are recorded as ADRs and never relitigated.",
    outcomes: [
      "Fedora bootc image with atomic upgrade/rollback, built and pushed to GHCR from GitHub Actions",
      "Godot 4 shell: controller-navigable tile grid, launch seam, settings/info screens, Wi-Fi seam, dev-mode terminal behind a flag",
      "Silent boot pipeline: custom Plymouth theme, hidden GRUB, no getty on the appliance — text only reachable via journalctl or devmode ssh",
      "systemd fleet: app scan/launch control, flatpak install units, flight recorder, boot-success watchdog, USB automount, display/window profiles",
      "Phase 1 contract: Godot shell ↔ Rust library daemon over JSON-RPC/WebSocket so installs survive shell restarts",
      "12 architecture decision records covering NVIDIA baseline, compositor choice, single-display appliance model, and an in-house Steam client",
    ],
    tech: ["Godot 4", "GDScript", "bootc", "Fedora / Universal Blue", "systemd", "gamescope", "Plymouth", "Bash", "Containerfile", "GitHub Actions"],
    links: [
      { label: "GitHub repository", href: "https://github.com/MarwanSummakieh/MarwanOS" },
      { label: "Phase 1 plan", href: "https://github.com/MarwanSummakieh/MarwanOS/blob/main/docs/phase-1-plan.md" },
    ],
  },
  {
    slug: "trader",
    title: "Trader",
    status: "Live",
    category: "software",
    year: 2026,
    fresh: true,
    hook: "An intraday momentum bot on Alpaca paper trading with server-side bracket orders, a live dashboard, and a backtest engine every rule was validated against.",
    summary:
      "An automated intraday momentum trading bot for US equities executing through Alpaca paper trading with server-side bracket orders, a FastAPI dashboard, and a backtest / parameter-sweep engine over 5-minute bars. A second, independent instance trades crypto 24/7 on an internal fill simulator with its own ledger.",
    focus:
      "Treating a trading rule as a hypothesis: every entry/exit gate (EMA stack, ADX, RSI band, EMA50 regime, no-late-entries, earnings blackout) was validated on a train/holdout split with walk-forward checks and honest cost modelling — spread, slippage, and SEC/FINRA fees — before it was allowed to trade.",
    outcomes: [
      "Scanner → entry → exit loop over a ~60-symbol universe every 5 minutes during market hours",
      "ATR-anchored stops, 3R take-profit and R-based trailing stops resting server-side at the broker so exits fire even if the process dies",
      "SQLite trade ledger as the single source of truth; one instance per asset class with separate capital",
      "Backtest CLI with parameter sweeps; documented net edge (~+0.14R/trade after all costs) and a crypto rule adopted for drawdown control, edge explicitly marked unproven",
      "Live FastAPI dashboard for stocks and crypto, deployed with Docker",
    ],
    tech: ["Python 3.11", "FastAPI", "Alpaca API", "pandas", "SQLite", "Docker"],
    note: "Paper trading only. Nothing here is financial advice.",
    links: [
      { label: "Live dashboard", href: "https://trader.marwansummakieh.me" },
      { label: "GitHub repository", href: "https://github.com/MarwanSummakieh/trader" },
    ],
  },
  {
    slug: "storyroom",
    title: "Storyroom",
    status: "Released",
    category: "software",
    year: 2026,
    fresh: true,
    hook: "A realtime multiplayer novel-writing workspace: shared cursors, scene chat, a story bible, and CRDT-safe co-editing.",
    summary:
      "A realtime collaborative novel-writing workspace built with Next.js, TipTap, Yjs, Hocuspocus, and Prisma. Co-authors write in the same scene simultaneously with live presence, shared cursors, scene chat, chapter/scene navigation, a story bible, Markdown export, and a one-click Windows installer.",
    focus:
      "Realtime state synchronisation done properly — Yjs CRDTs for conflict-free edits, awareness for presence, stateless WebSocket events for chat that are persisted after broadcast — with a production data model and an automated two-tab Playwright test proving the multiplayer path.",
    outcomes: [
      "TipTap/ProseMirror editor bound to Yjs documents served by a Hocuspocus WebSocket server",
      "Live cursors and presence via Yjs awareness; scene chat over stateless events, persisted after broadcast",
      "Story bible panel for characters, places, canon facts and lore beside the draft",
      "Zero-setup JSON dev store plus Prisma/Postgres schema for hosted deployments; Docker one-command deploy",
      "Native Windows installer (Inno Setup + portable Node) that runs the servers in the background and opens the app",
      "Vitest unit tests and an automated two-browser Playwright realtime test",
    ],
    tech: ["Next.js", "TypeScript", "TipTap", "Yjs", "Hocuspocus", "Prisma", "Postgres", "Tailwind CSS", "Playwright", "Vitest", "Inno Setup"],
    image: { src: "/work/storyroom.webp", alt: "Storyroom workspace with the manuscript editor, story bible and scene chat" },
    links: [{ label: "GitHub repository", href: "https://github.com/MarwanSummakieh/storyroom" }],
  },
  {
    slug: "prosthetic-vision",
    title: "Simulated Prosthetic Vision",
    status: "Research",
    category: "research",
    year: 2026,
    fresh: true,
    hook: "MSc thesis: real-time depth-based walkable-space encoding for simulated prosthetic vision in indoor navigation.",
    summary:
      "Master's thesis playground: a PC-based Python pipeline that takes an RGB-D source, detects walkable space, encodes the scene, and renders it as a simulated phosphene percept with latency metrics — the platform for a human study comparing a raw depth encoder against a simplified, hazard-aware one.",
    focus:
      "Human-centered AI in the most literal sense: designing what a person with a retinal implant would perceive, then measuring whether a smarter encoding (suppress the floor, light up obstacles by proximity, pulse drop-offs, mark the deepest walkable direction) beats raw depth under an identical simulated implant.",
    outcomes: [
      "RGB-D → RANSAC floor + height rules → encoder → phosphene renderer (jitter, dropout, brightness levels, afterglow)",
      "Two experimental encoders sharing one simulated implant so percept differences come from encoding alone",
      "TinySegNet: ~70K-parameter depthwise-separable U-Net predicting walkability from inverse depth + validity, trained on procedurally generated corridors",
      "Synthetic data generator, training/evaluation CLI (IoU + latency vs. rule baseline), NYU Depth V2 support",
      "Live viewer with debug/percept toggles, headless capture mode, and a pytest suite",
    ],
    tech: ["Python", "NumPy", "OpenCV", "PyTorch", "RGB-D", "RANSAC", "Computer Vision", "Human-Centered AI"],
    links: [{ label: "GitHub repository", href: "https://github.com/MarwanSummakieh/real-time-video-feed-subsampling" }],
  },
  {
    slug: "mediawan",
    title: "Mediawan",
    status: "In Production",
    category: "software",
    year: 2026,
    fresh: true,
    hook: "A self-hosted, invite-only streaming front-end study: one Node process for auth, admin, cached metadata, delivery decisions and transcoding — plus a Samsung Tizen TV app.",
    summary:
      "A study of media-server architecture: a single Node process serving an SPA, session auth, an admin panel, cached AniList metadata, source resolution, per-device delivery decisions (direct play vs. remux vs. transcode), and a thin media proxy — with a companion Samsung Tizen TV app. Published for educational purposes; ships no content, indexes or credentials.",
    focus:
      "Delivery engineering: probing what the requesting device can actually decode, copying streams whenever possible, and treating an unnecessary lossy transcode as a regression. Independent backends fail over instead of failing the request.",
    outcomes: [
      "Capability probing + per-track remux/transcode sessions with ffmpeg; direct play preferred",
      "Tiered source ranking with a quality floor; provider chain that moves on when one is down or rate-limited",
      "Security layer: headers, rate limiting, SSRF guards, signed media tokens; SQLite via node:sqlite",
      "Browser UI and a separate TV-optimised UI packaged as a Tizen app",
      "node:test suites, Docker Compose deployment path, diagnostic scripts",
    ],
    tech: ["Node.js 22", "JavaScript", "node:sqlite", "ffmpeg", "Samsung Tizen", "Docker Compose"],
    note: "Educational / research project. No content is hosted or distributed; every source is opt-in.",
    links: [{ label: "GitHub repository", href: "https://github.com/MarwanSummakieh/mediawan" }],
  },
  {
    slug: "marusic",
    title: "Marusic",
    status: "In Production",
    category: "software",
    year: 2026,
    fresh: true,
    hook: "A Spotify-style web player with jam sessions over SSE, UPnP/Sonos casting, a PWA, and a Kotlin Android Auto app.",
    summary:
      "An educational reference for how a streaming-player UI, media proxy, invite-only auth, UPnP/Cast output and a PWA fit together. Search and metadata go through the YouTube Music Innertube API; audio is resolved with yt-dlp and proxied with Range support. Includes a Kotlin Android Auto companion.",
    focus:
      "Product-level polish on a solo project: full-screen mobile now-playing, gapless-ish prefetch, playback surviving reloads, drag-to-reorder playlists, and synchronized multi-device jam sessions where any member can be a remote control.",
    outcomes: [
      "Invite-only accounts with scrypt-hashed passwords, cookie sessions in SQLite, login rate limiting and an admin panel",
      "Jam sessions: shared queue, one speaker, live progress and control over server-sent events; host handoff if the host leaves",
      "Cast to smart TVs and Sonos over UPnP/DLNA from any browser; PWA install; Kotlin Android Auto app",
      "Per-user libraries, radio stations, daily mixes, lyrics, quality selector, FLAC/MP3 export via bundled ffmpeg",
      "Content-type visual language so playlists, singles, albums and stations read at a glance",
    ],
    tech: ["Node.js", "Express", "youtubei.js", "yt-dlp", "SQLite", "SSE", "UPnP / DLNA", "PWA", "Kotlin", "Android Auto"],
    note: "Educational reference only — not affiliated with YouTube, Spotify or Sonos.",
    links: [{ label: "GitHub repository", href: "https://github.com/MarwanSummakieh/marusic" }],
  },

  // ─── Older pieces ──────────────────────────────────────────────────────
  {
    slug: "real-time-strategie",
    category: "games",
    year: 2025,
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
    category: "games",
    year: 2025,
    image: { src: "/reel-deal/reel-deal-slicing.webp", alt: "Reel Deal VR gameplay — slicing a fish with a katana" },
    hook: "A finished Unity VR fishing game — hook minigame, katana slicing, wristwatch progression, 16-participant user testing.",
    title: "Reel Deal (NinjaFishingVR)",
    status: "Released",
    summary:
      "A finished Unity VR game where players fish from a boat, store catches in a cooler, slice them with a katana, earn money, and upgrade equipment.",
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
    category: "games",
    year: 2024,
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
    category: "research",
    year: 2025,
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
    category: "research",
    year: 2025,
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
    category: "software",
    year: 2025,
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
    category: "software",
    year: 2025,
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
    category: "software",
    year: 2024,
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
    category: "software",
    year: 2025,
    hook: "7-class skin-lesion classifier wrapped in a 3D retro Macintosh UI, deployed on Cloudflare Workers.",
    title: "Vibe-Opsy — Skin Cancer Detection AI",
    status: "Released",
    summary:
      "An ML-first skin lesion classification app delivering 7-class diagnostic predictions from dermatoscopic images, wrapped in a retro 3D interface.",
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
    category: "research",
    year: 2025,
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
