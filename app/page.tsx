import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";
import { gameProjects } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";
import PieceCard from "@/components/brand/PieceCard";
import SectionHead from "@/components/brand/SectionHead";

const fresh = gameProjects.filter((p) => p.fresh);
const featuredSlugs = ["marwanos", "storyroom"];
const featured = featuredSlugs.map((s) => fresh.find((p) => p.slug === s)).filter(Boolean) as typeof fresh;
const freshRest = fresh.filter((p) => !featuredSlugs.includes(p.slug));
const backCatalog = ["ninja-fishing-vr", "vibe-opsy", "real-time-strategie"]
  .map((s) => gameProjects.find((p) => p.slug === s))
  .filter(Boolean) as typeof gameProjects;

const github = profileContent.socials.find((s) => s.label === "GitHub")!;

const marqueeStack = [
  "TypeScript",
  "Python",
  "Node.js",
  "Go",
  "Godot 4",
  "Unity",
  "Next.js",
  "React",
  "Docker",
  "Azure",
  "PyTorch",
  "Postgres",
  "Kotlin",
  "systemd",
];

const stats = [
  { label: "Projects this year", value: String(fresh.length) },
  { label: "Operating systems", value: "1" },
  { label: "Live services", value: "1" },
  { label: "Finished VR games", value: "1" },
  { label: "Thesis in progress", value: "1" },
];

export default function Home() {
  return (
    <div className="text-chalk">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="splat left-[4%] top-[6%] h-72 w-96" style={{ background: "rgba(109, 92, 255, 0.55)" }} />
          <span className="splat right-[2%] top-[14%] h-64 w-80" style={{ background: "rgba(80, 227, 128, 0.4)" }} />
          <span className="splat bottom-[0%] left-[38%] h-56 w-80" style={{ background: "rgba(255, 77, 141, 0.3)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-24">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="sticker sticker-tag">
              <span aria-hidden className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              open to work
            </span>
            <span className="sticker">Copenhagen · DK</span>
            <span className="sticker">MSc Human-Centered AI @ DTU</span>
          </div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <p className="eyebrow">full-stack &amp; systems engineer</p>
              <h1 className="font-display mt-4 text-5xl font-bold leading-[1.02] sm:text-7xl lg:text-8xl">
                I build <span className="marble-text">whole systems.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-chalk-dim">{profileContent.tagline}</p>

              <div className="mt-9 flex flex-wrap gap-3.5">
                <a href="#fresh" className="btn-tag">
                  What I&apos;m building <ArrowDownIcon className="h-4 w-4" />
                </a>
                <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <FaGithub className="h-4 w-4" /> GitHub
                </a>
                <Link href="/contact" className="btn-ghost">
                  Contact
                </Link>
              </div>

              <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-chalk-mute">
                TypeScript · Python · Node · Godot · Unity · Docker · Azure
              </p>
            </div>

            {/* brand piece */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-8 rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 45%, rgba(80, 227, 128, 0.16), transparent 70%), radial-gradient(60% 45% at 30% 70%, rgba(109, 92, 255, 0.18), transparent 70%)",
                }}
              />
              <Image
                src="/brand/marwanos-tag.webp"
                alt="MARWAN — wildstyle graffiti piece"
                width={1404}
                height={489}
                priority
                className="relative w-full animate-float drop-shadow-[0_24px_40px_rgba(0,0,0,0.65)]"
              />
              <p className="relative mt-2 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-mute">
                — the name on the wall since day one
              </p>
            </div>
          </div>
        </div>

        {/* stat strip */}
        <div className="relative border-y border-line bg-wall-2/60">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 sm:grid-cols-3 sm:px-8 lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-bold leading-none text-tag sm:text-5xl">{stat.value}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-mute">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* stack marquee */}
        <div className="marquee-mask overflow-hidden border-b border-line py-5" aria-hidden>
          <div className="marquee-track gap-10">
            {[...marqueeStack, ...marqueeStack].map((tool, i) => (
              <span key={`${tool}-${i}`} className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.2em] text-chalk-mute">
                {tool}
                <span className="h-1 w-1 rounded-full bg-[rgba(80,227,128,0.7)]" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current work ─────────────────────────────────────────────── */}
      <section id="fresh" className="relative scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
          <SectionHead
            eyebrow="2026"
            title={
              <>
                What I&apos;m building <span className="marble-text">right now</span>
              </>
            }
            lede="Six projects I've pushed to GitHub this year: an operating system, a live trading bot, a realtime multiplayer editor, two self-hosted media systems, and my master's thesis on prosthetic vision. All of it is open source."
          />
        </div>

        <div className="mx-auto max-w-7xl space-y-8 px-5 pt-14 sm:px-8">
          {featured.map((project, i) => (
            <PieceCard key={project.slug} project={project} index={i} variant="wide" />
          ))}
          <div className="grid gap-6 pt-2 md:grid-cols-2">
            {freshRest.map((project, i) => (
              <PieceCard key={project.slug} project={project} index={i + 2} variant="tile" showTech={6} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Older projects ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="earlier"
            splat="pink"
            title="Older projects I'm still proud of"
            lede="A finished Unity VR game, an ML skin-lesion classifier with a 3D retro UI, and an RTS with behaviour-tree AI. The rest — cloud tooling, mobile apps, a Go terminal — is on the work page."
          />
          <Link href="/work" className="btn-ghost">
            All work <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {backCatalog.map((project, i) => (
            <PieceCard key={project.slug} project={project} index={i} variant="tile" />
          ))}
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8">
        <SectionHead eyebrow="experience" splat="violet" title="Where I've worked" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {profileContent.experiences.map((exp) => (
            <article key={exp.company} className="piece flex flex-col p-6">
              <p className="font-mono text-xs text-chalk-mute">{exp.period}</p>
              <h3 className="font-display mt-2 text-2xl font-semibold leading-snug">{exp.company}</h3>
              <p className="mt-1.5 text-sm font-medium text-tag">{exp.role}</p>
              <p className="mt-4 text-sm leading-6 text-chalk-dim">{exp.summary}</p>
              <ul className="mt-4 space-y-2">
                {exp.contributions.slice(0, 2).map((c) => (
                  <li key={c} className="border-l border-line-strong pl-3 text-xs leading-5 text-chalk-mute">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.slice(0, 5).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Contact band ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8">
        <div className="piece piece-static relative overflow-hidden">
          <div
            aria-hidden
            className="marble absolute inset-0 opacity-[0.14]"
            style={{ backgroundSize: "200% 200%", animation: "marble-drift 14s ease-in-out infinite alternate" }}
          />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,transparent_0,rgba(10,10,12,0.88)_72%)]" />
          <div className="relative grid items-center gap-8 p-8 sm:p-14 lg:grid-cols-[1fr,auto]">
            <div>
              <p className="sticker sticker-tag">get in touch</p>
              <h2 className="font-display mt-5 text-4xl font-bold leading-[1.02] sm:text-6xl">
                Want to work together?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-chalk-dim">
                {profileContent.availability} Email is the fastest way to reach me, and all my code is on GitHub.
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <Link href="/contact" className="btn-tag">
                Contact
              </Link>
              <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <FaGithub className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
