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

export default function Home() {
  return (
    <div className="text-chalk">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="splat left-[8%] top-[18%] h-72 w-96 opacity-40" style={{ background: "var(--violet)" }} />
          <span className="splat right-[6%] top-[10%] h-64 w-72 opacity-35" style={{ background: "var(--tag)" }} />
          <span className="splat bottom-[5%] left-[40%] h-56 w-80 opacity-30" style={{ background: "var(--pink)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:pb-28">
          <div className="flex flex-wrap items-center gap-3">
            <span className="sticker sticker-tag">Copenhagen · DK</span>
            <span className="sticker rotate-[1.5deg]">MSc Human-Centered AI @ DTU</span>
            <span className="sticker sticker-pink -rotate-[1deg]">open to work</span>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.15fr,0.85fr]">
            <div>
              <Image
                src="/brand/marwanos-tag.webp"
                alt="MARWAN — wildstyle graffiti piece"
                width={1404}
                height={489}
                priority
                className="w-full max-w-3xl animate-float drop-shadow-[0_18px_30px_rgba(0,0,0,.6)]"
              />
              <p className="font-marker mt-2 text-lg text-chalk/60 sm:text-xl">— marwan summakieh, full-stack &amp; systems engineer, copenhagen</p>

              <h1 className="font-display mt-8 text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
                <span className="outline-text">I build</span> <span className="marble-text">whole systems.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-chalk/80">
                {profileContent.tagline}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#fresh" className="btn-tag">
                  What I'm building <ArrowDownIcon className="h-4 w-4" />
                </a>
                <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <FaGithub className="h-4 w-4" /> GitHub
                </a>
                <Link href="/contact" className="btn-ghost">
                  Contact
                </Link>
              </div>
            </div>

            {/* quick stats */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="piece piece-static rotate-[1deg] p-6">
                <p className="eyebrow">at a glance</p>
                <ul className="mt-4 space-y-3 font-display text-2xl leading-none">
                  <li className="flex items-baseline justify-between gap-4 border-b border-halo/15 pb-3">
                    <span>Projects this year</span>
                    <span className="outline-text-tag text-4xl">{fresh.length}</span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4 border-b border-halo/15 pb-3">
                    <span>Operating systems</span>
                    <span className="outline-text-tag text-4xl">1</span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4 border-b border-halo/15 pb-3">
                    <span>Live services</span>
                    <span className="outline-text-tag text-4xl">1</span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4 border-b border-halo/15 pb-3">
                    <span>Finished VR games</span>
                    <span className="outline-text-tag text-4xl">1</span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4">
                    <span>Thesis in progress</span>
                    <span className="outline-text-tag text-4xl">1</span>
                  </li>
                </ul>
                <p className="font-marker mt-5 text-sm text-chalk/50">
                  stack: TypeScript · Python · Node · Godot · Unity · Docker · Azure
                </p>
              </div>
              
              
            </div>
          </div>
        </div>
      </section>

      {/* ── Current work ─────────────────────────────────────────────── */}
      <section id="fresh" className="relative scroll-mt-20">
        <div className="drips bricks border-y-2 border-halo shadow-[0_4px_0_#000]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
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
        </div>

        <div className="mx-auto max-w-7xl space-y-10 px-5 pb-8 pt-20 sm:px-8">
          {featured.map((project, i) => (
            <PieceCard key={project.slug} project={project} index={i} variant="wide" />
          ))}
          <div className="grid gap-8 md:grid-cols-2">
            {freshRest.map((project, i) => (
              <PieceCard key={project.slug} project={project} index={i + 2} variant="tile" showTech={6} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Older projects ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
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
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {backCatalog.map((project, i) => (
            <PieceCard key={project.slug} project={project} index={i} variant="tile" />
          ))}
        </div>
      </section>

      {/* ── Crew / experience ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <SectionHead
          eyebrow="experience"
          splat="violet"
          title="Where I've worked"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {profileContent.experiences.map((exp, i) => (
            <article key={exp.company} className={`piece p-6 ${i % 2 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"}`}>
              <p className="font-marker text-xs text-chalk/50">{exp.period}</p>
              <h3 className="font-display mt-2 text-3xl leading-none">{exp.company}</h3>
              <p className="eyebrow mt-1">{exp.role}</p>
              <p className="mt-4 text-sm leading-6 text-chalk/75">{exp.summary}</p>
              <ul className="mt-4 space-y-2">
                {exp.contributions.slice(0, 2).map((c) => (
                  <li key={c} className="border-l-2 border-violet pl-3 text-xs leading-5 text-chalk/60">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tech.slice(0, 5).map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Contact band ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <div className="piece piece-static marble relative overflow-hidden p-8 sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,.15)_0,rgba(0,0,0,.7)_70%)]" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr,auto]">
            <div>
              <p className="sticker sticker-tag">get in touch</p>
              <h2 className="font-display outline-text mt-4 text-5xl leading-[0.9] sm:text-7xl">
                Want to work together?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-halo/85">
                {profileContent.availability} Email is the fastest way to reach me, and all my code is on GitHub.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
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
