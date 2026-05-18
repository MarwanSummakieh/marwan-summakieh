import Link from "next/link";
import Image from "next/image";
import { gameProjects } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export default function Home() {
  const featuredSlugs = ["vibe-opsy", "ninja-fishing-vr", "real-time-strategie"];
  const featuredProjects = featuredSlugs
    .map((slug) => gameProjects.find((project) => project.slug === slug))
    .filter((project): project is (typeof gameProjects)[number] => Boolean(project));
  const reelDealProject = gameProjects.find((project) => project.slug === "ninja-fishing-vr");
  const focusAreas = [
    "Full-stack product engineering",
    "Released VR game: Reel Deal",
    "Human-centered AI applications",
  ];
  const reelDealStats = [
    { label: "Role", value: "Programmer" },
    { label: "Build", value: "Playable final" },
    { label: "Timeline", value: "13 weeks" },
    { label: "Tests", value: "16 users" },
  ];
  const reelDealImages = [
    {
      src: "/reel-deal/reel-deal-table-loop.webp",
      alt: "Reel Deal gameplay table with katana, fishing rod, sliced fish, and lake environment",
    },
    {
      src: "/reel-deal/reel-deal-watch-ui.webp",
      alt: "Reel Deal wristwatch collection book UI shown in VR",
    },
  ];

  return (
    <div className="space-y-20">
      <section className="relative space-y-8 pt-8">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            {profileContent.role}
          </p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            {profileContent.name}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {profileContent.tagline}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300"
              >
                {area}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-3 sm:flex-row">
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Explore projects
              <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-7 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
            >
              Get in touch
            </Link>
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-5 text-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">Location</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{profileContent.location}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">Availability</p>
            <p className="mt-1 text-slate-700 dark:text-slate-200">{profileContent.availability}</p>
          </div>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      {reelDealProject && (
        <section className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="space-y-6">
            <header className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                Featured VR project
              </p>
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
                  Reel Deal
                </h2>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  aka NinjaFishingVR
                </p>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {reelDealProject.summary}
              </p>
            </header>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {reelDealStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-slate-200 bg-white/80 p-3 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <ul className="space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {reelDealProject.outcomes.slice(0, 3).map((outcome) => (
                <li key={outcome} className="flex gap-2">
                  <span aria-hidden className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {reelDealProject.tech.slice(0, 6).map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-400"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Link
                href="https://github.com/MarwanSummakieh/ReelDeal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-md dark:bg-teal-500 dark:hover:bg-teal-400"
              >
                View repository
              </Link>
              <Link
                href="https://github.com/MarwanSummakieh/ReelDeal#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
              >
                Read breakdown
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5">
              <Image
                src="/reel-deal/reel-deal-slicing.webp"
                alt="Reel Deal VR slicing scene with fish, katana, boat, and lake environment"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {reelDealImages.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 205px, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <hr className="border-slate-200 dark:border-white/10" />

      <section className="space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            Featured work
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Selected projects</h2>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            A quick look at recent builds. The full project archive lives on the projects page.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="space-y-3 rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                {project.status}
              </p>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{project.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-emerald-600 underline decoration-emerald-300/40 underline-offset-4 transition hover:text-emerald-800 dark:text-emerald-400 dark:decoration-emerald-400/30 dark:hover:text-white"
                    >
                      {link.label} &rarr;
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 underline decoration-emerald-300/40 underline-offset-4 transition hover:text-emerald-800 dark:text-emerald-400 dark:decoration-emerald-400/30 dark:hover:text-white"
          >
            See all projects &rarr;
          </Link>
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      <section className="grid gap-6 sm:grid-cols-3">
        <Link
          href="/about"
          className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">About</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Background, values, and the way I like to work.</p>
        </Link>
        <Link
          href="/tools"
          className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Toolkit</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Tech stack, workflows, and platforms I use to ship.</p>
        </Link>
        <Link
          href="/devlog"
          className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Devlog</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Notes from experiments, ideas, and ongoing builds.</p>
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-8 text-center dark:border-white/10 dark:bg-white/5">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
          Looking for a focused builder?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-500 dark:text-slate-400">
          I collaborate on product engineering, creative technology, and AI-adjacent software projects.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md dark:hover:bg-emerald-500"
          >
            Contact me
          </Link>
          <Link
            href="https://github.com/MarwanSummakieh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-7 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
          >
            View GitHub
          </Link>
        </div>
      </section>
    </div>
  );
}
