import Link from "next/link";
import {
  journeyOverview,
} from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export default function Home() {
  const experienceHighlight = profileContent.experiences;
  const topSkills = profileContent.skills.strengths;

  const skillCategories = [
    { label: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C#"] },
    { label: "Front-End", items: ["React", "Next.js", "React Native", "Tailwind"] },
    { label: "Back-End", items: ["Flask", "Node.js", "MongoDB", "SQL"] },
    { label: "Cloud & DevOps", items: ["Azure", "Docker", "Vercel", "CI/CD"] },
  ];

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur lg:grid-cols-[2fr,1fr]">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-pink-500/15 blur-[80px]" />
        <div className="relative space-y-5">
          <p className="inline-block rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-purple-200">
            {profileContent.role}
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
            {profileContent.name}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-100">
            {profileContent.tagline}
          </p>
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-slate-300">
            {journeyOverview.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-400/40"
            >
              View my projects
              <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
            >
              Get in touch
            </Link>
          </div>
        </div>
        <div className="relative space-y-5 rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-slate-100">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-300/70">Location</p>
            <p className="mt-1 text-base font-medium text-white">{profileContent.location}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-300/70">Availability</p>
            <p className="mt-1 text-base text-white">{profileContent.availability}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-300/70">Education</p>
            <p className="mt-1 text-base text-white">
              MSc Human-Centered AI @ DTU
            </p>
            <p className="text-sm text-slate-300">
              BSc Software Engineering @ VIA
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-300/70">Core Strengths</p>
            <ul className="mt-2 space-y-2">
              {topSkills.map((skill) => (
                <li key={skill} className="flex gap-2">
                  <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                  <span className="text-slate-200">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300/70">
            Technical skills
          </p>
          <h2 className="text-2xl font-semibold">What I work with</h2>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => (
            <div
              key={cat.label}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-purple-400/30 hover:bg-white/[0.06]"
            >
              <h3 className="text-sm font-semibold text-purple-200">{cat.label}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/tools"
            className="text-sm font-medium text-purple-300 underline decoration-purple-400/40 underline-offset-4 transition hover:text-white hover:decoration-white/60"
          >
            View full skills &amp; toolkit &rarr;
          </Link>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300/70">
            Experience
          </p>
          <h2 className="text-2xl font-semibold">Where I&apos;ve shipped code</h2>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {experienceHighlight.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all hover:border-purple-400/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/70">
                  {exp.company}
                </span>
                <span className="text-xs text-slate-400">{exp.period}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{exp.role}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{exp.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {exp.contributions.slice(0, 2).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tech.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-purple-600/20 via-pink-500/15 to-orange-400/10 p-10 text-center backdrop-blur">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-500/20 blur-[80px]" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-pink-500/15 blur-[80px]" />
        <div className="relative">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Let&apos;s build something together
          </h2>
          <p className="mt-3 mx-auto max-w-lg text-base text-slate-200">
            I&apos;m open to full-stack engineering roles, freelance projects, and conversations about building great products.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-purple-900 transition-all hover:-translate-y-0.5 hover:bg-purple-100 hover:shadow-lg"
            >
              Contact me
            </Link>
            <Link
              href="https://github.com/MarwanSummakieh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
            >
              View GitHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
