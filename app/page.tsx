import Link from "next/link";
import {
  journeyOverview,
} from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export default function Home() {
  const experienceHighlight = profileContent.experiences.slice(0, 2);
  const topSkills = profileContent.skills.strengths.slice(0, 4);

  return (
    <div className="space-y-16">
      <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:grid-cols-[2fr,1fr]">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200">
            {profileContent.role}
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {profileContent.name}
          </h1>
          <p className="max-w-3xl text-lg text-slate-100">
            {profileContent.tagline}
          </p>
          <p className="max-w-3xl text-base text-slate-200">
            {journeyOverview.mission}
          </p>
          <div className="flex flex-col gap-3 text-sm text-slate-200">
            {journeyOverview.introduction.slice(0, 2).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 transition hover:-translate-y-0.5 hover:shadow-purple-400/60"
            >
              View portfolio highlights
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
            >
              Schedule a conversation
            </Link>
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-slate-100">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/80">Location</p>
            <p className="mt-1 text-base text-white">{profileContent.location}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/80">Availability</p>
            <p className="mt-1 text-base text-white">{profileContent.availability}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/80">Primary focus</p>
            <p className="mt-1 text-base text-white">
              Pursuing a master's in human-centered AI while translating research into practical product experiences.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/80">Core strengths</p>
            <ul className="mt-2 space-y-2">
              {topSkills.map((skill) => (
                <li key={skill} className="flex gap-2">
                  <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-purple-400" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/80">
            Recent impact
          </p>
          <h2 className="text-2xl font-semibold">How I have been delivering outcomes</h2>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {experienceHighlight.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="text-xs uppercase tracking-[0.3em] text-purple-200/70">
                {exp.company}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{exp.role}</h3>
              <p className="text-sm text-slate-300">{exp.period}</p>
              <p className="mt-3 text-sm text-slate-200">{exp.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-100">
                {exp.contributions.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/15 bg-gradient-to-r from-purple-600/15 via-pink-500/10 to-orange-400/10 p-8 text-center backdrop-blur">
        <h2 className="text-2xl font-semibold text-white">
          Let&apos;s discuss how this experience fits your team
        </h2>
        <p className="mt-3 text-base text-slate-100">
          I welcome conversations about gameplay systems, UX-focused engineering, and tools that help small teams ship faster.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-purple-800 transition hover:-translate-y-0.5 hover:bg-purple-100"
          >
            Contact details
          </Link>
          <Link
            href="https://github.com/MarwanSummakieh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
          >
            Review GitHub repositories
          </Link>
        </div>
      </section>
    </div>
  );
}
