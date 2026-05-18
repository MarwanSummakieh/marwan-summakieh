import Link from "next/link";

export const metadata = {
  title: "Devlog | Marwan Summakieh",
};

type DevlogEntry = {
  date: string;
  title: string;
  status: "Shipped" | "In progress" | "Experiment";
  summary: string;
  details: string[];
  tags: string[];
  href?: string;
};

const projectRepo = "https://github.com/MarwanSummakieh/ReelDeal";

const entries: DevlogEntry[] = [
  {
    date: "2026-05-18",
    title: "Reel Deal final report complete",
    status: "Shipped",
    summary:
      "Reel Deal/NinjaFishingVR is now a finished DTU 02566 VR game: a 13-week Unity build centered on fishing, slicing, collecting, earning money, and upgrading equipment.",
    details: [
      "The final report credits Marwan as a programmer and main responsible contributor for the hook mechanic and tutorial system, with shared responsibility for progression mechanics.",
      "The playable build includes boat-based fishing, cooler storage, katana slicing, a wristwatch collection/equipment UI, money progression, upgrades, sound, haptics, and mostly self-made 3D assets.",
      "Two user-test rounds with 16 total participants drove improvements to casting clarity, bobber control, hook feedback, cooler logic, tutorial visibility, and audio guidance.",
    ],
    tags: ["Released", "Unity VR", "User testing", "Portfolio"],
    href: projectRepo,
  },
  {
    date: "2026-05-18",
    title: "Portfolio pass from the active Unity project",
    status: "Shipped",
    summary:
      "Updated the portfolio narrative from the current NinjaFishingVR repository: a DTU 02566 VR fishing game built in Unity 6 with XR Interaction Toolkit, OpenXR, URP, and C# systems.",
    details: [
      "Pulled project details from the repository structure, Unity package manifest, and gameplay scripts.",
      "Highlighted the current core loop: cast, hook, reel, manage fish, slice, and receive feedback through haptics and audio.",
      "Reframed the project as an in-production technical case study instead of only a future roadmap item.",
    ],
    tags: ["Portfolio", "Unity 6", "XR Interaction Toolkit", "DTU 02566"],
    href: projectRepo,
  },
  {
    date: "2026-05-18",
    title: "Fishing rod, rope, and bobber systems",
    status: "Shipped",
    summary:
      "The fishing interaction now has a technical backbone: grab-based rod input, reel release, line retraction, bobber steering, spool animation, and rope tension feedback.",
    details: [
      "Rod logic reads XR input actions for release, retract, and stick steering while tracking rod-tip velocity for cast feel.",
      "Rod line simulation uses Verlet particles, max-distance constraints, taut-line detection, and bobber coupling.",
      "Line tension is surfaced through color feedback, bobber behavior, and haptic/audio hooks.",
    ],
    tags: ["Gameplay systems", "Physics", "VR UX", "C#"],
    href: projectRepo,
  },
  {
    date: "2026-05-18",
    title: "Fish ecosystem and slicing loop",
    status: "Shipped",
    summary:
      "The project has grown beyond casting into an end-to-end fish loop with weighted underwater spawning, catch attachment physics, inventory updates, and sword-based slicing using EzySlice.",
    details: [
      "Fish spawn gradually within lake bounds using depth checks against water and terrain constraints.",
      "Caught fish attach to the bobber through configurable joints and can be released into inventory flow.",
      "Slicing uses blade motion, mesh hull generation, physics impulses, haptics, and audio feedback to turn caught fish into sushi ingredients.",
    ],
    tags: ["Fish AI", "EzySlice", "Inventory", "Haptics"],
    href: projectRepo,
  },
  {
    date: "2026-03-06",
    title: "NinjaFishingVR devlog started",
    status: "In progress",
    summary:
      "Kickoff log for NinjaFishingVR, a VR fishing game project for DTU course 02566: Creating Digital Visual Experiences.",
    details: [
      "Defined a short production timeline for March to May.",
      "Set a milestone-driven scope to keep delivery realistic.",
      "Added this devlog page as the public progress tracker.",
    ],
    tags: ["VR", "Unity", "Production planning"],
    href: projectRepo,
  },
  {
    date: "2026-03-06",
    title: "Core fishing loop planning",
    status: "In progress",
    summary:
      "Breaking the game into core mechanics: cast, hook, reel, score, and feedback loop for satisfying VR interaction.",
    details: [
      "Prioritized responsive rod and line behavior first.",
      "Outlined player feedback needs: haptics, audio cues, and fish tension states.",
      "Reserved polish pass after mechanics are stable.",
    ],
    tags: ["Gameplay", "Interaction design", "VR UX"],
    href: projectRepo,
  },
  {
    date: "2026-03-01",
    title: "May release target",
    status: "Experiment",
    summary:
      "Working toward a playable build by May with complete core loop and a polished vertical slice.",
    details: [
      "March: mechanics implementation and control tuning.",
      "April: content pass, balancing, and performance optimization.",
      "May: bug fixing, UX polish, and final showcase build.",
    ],
    tags: ["Milestones", "Delivery", "Roadmap"],
    href: projectRepo,
  },
];

function statusClasses(status: DevlogEntry["status"]) {
  if (status === "Shipped") {
    return "text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15";
  }
  if (status === "In progress") {
    return "text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-500/15";
  }
  return "text-sky-700 bg-sky-100 dark:text-sky-300 dark:bg-sky-500/15";
}

const DevlogPage = () => {
  return (
    <div className="space-y-14">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          Devlog
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Build notes and progress updates</h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
          This devlog tracks progress for <span className="font-semibold text-slate-700 dark:text-slate-200">Reel Deal/NinjaFishingVR</span>, a finished DTU 02566 VR fishing game focused on tactile casting, reeling, haptics, fish behavior, wristwatch progression, and sushi-slicing interactions.
        </p>
        <div>
          <Link
            href={projectRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-emerald-600 underline decoration-emerald-300/40 underline-offset-4 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-white"
          >
            Open repository &rarr;
          </Link>
        </div>
      </header>

      <section className="space-y-6">
        {entries.map((entry) => (
          <article
            key={`${entry.date}-${entry.title}`}
            className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{entry.date}</p>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusClasses(entry.status)}`}
              >
                {entry.status}
              </span>
            </div>

            <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{entry.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{entry.summary}</p>

            <ul className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
              {entry.details.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {entry.href && (
              <div className="mt-4">
                <Link
                  href={entry.href}
                  className="text-sm font-medium text-emerald-600 underline decoration-emerald-300/40 underline-offset-4 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-white"
                >
                  Open related page &rarr;
                </Link>
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Want deeper technical breakdowns?</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          I can also share architecture notes, implementation tradeoffs, source-level system breakdowns, and playtest outcomes from NinjaFishingVR.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={projectRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700 dark:hover:bg-emerald-500"
          >
            View repository
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
          >
            Request a walkthrough
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DevlogPage;
