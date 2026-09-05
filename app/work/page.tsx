import Link from "next/link";
import { gameProjects, type ProjectCategory } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";
import PieceCard from "@/components/brand/PieceCard";
import SectionHead from "@/components/brand/SectionHead";

export const metadata = {
  title: "Work | Marwan Summakieh",
  description: "Everything Marwan Summakieh has built: operating systems, software, games & VR, and research.",
};

const shelves: { key: ProjectCategory; eyebrow: string; title: string; lede: string; splat: "tag" | "violet" | "pink" | "peach" | "sky" }[] = [
  {
    key: "systems",
    eyebrow: "operating systems",
    title: "Operating systems",
    lede: "Image-mode Linux, systemd services, boot pipelines, and a Godot shell built for a TV.",
    splat: "tag",
  },
  {
    key: "software",
    eyebrow: "software",
    title: "Software",
    lede: "Realtime editors, trading bots, media servers, mobile apps, cloud automation — things people actually run.",
    splat: "sky",
  },
  {
    key: "games",
    eyebrow: "games & vr",
    title: "Games & VR",
    lede: "A finished VR fishing game, an RTS with behaviour-tree AI, physics-driven VR basketball.",
    splat: "pink",
  },
  {
    key: "research",
    eyebrow: "research",
    title: "Research",
    lede: "Master's thesis on simulated prosthetic vision, neural nets from scratch, social-graph NLP, multi-agent planning.",
    splat: "violet",
  },
];

const rank = (p: (typeof gameProjects)[number]) => (p.year ?? 0) * 10 + (p.status === "Live" || p.status === "Released" ? 2 : p.status === "In Production" ? 1 : 0);
const byYear = (a: (typeof gameProjects)[number], b: (typeof gameProjects)[number]) => rank(b) - rank(a);

const WorkPage = () => {
  const showcase = profileContent.showcaseProjects;

  return (
    <div className="text-chalk">
      <section className="drips bricks border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionHead
            eyebrow="all work"
            title={
              <>
                Everything I&apos;ve <span className="marble-text">built</span>
              </>
            }
            lede="Grouped by type, newest first. Every card opens a detail page with what I focused on, what got done, the stack, and the source."
          />
          <nav className="mt-8 flex flex-wrap gap-2.5" aria-label="Shelves">
            {shelves.map((s) => (
              <a key={s.key} href={`#${s.key}`} className="sticker transition hover:border-[rgba(80,227,128,0.45)] hover:text-tag">
                {s.eyebrow}
              </a>
            ))}
            <a href="#client-work" className="sticker transition hover:border-[rgba(80,227,128,0.45)] hover:text-tag">
              client work
            </a>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-24 px-5 pt-24 sm:px-8">
        {shelves.map((shelf) => {
          const items = gameProjects.filter((p) => (p.category ?? "games") === shelf.key).sort(byYear);
          if (!items.length) return null;
          return (
            <section key={shelf.key}>
              <SectionHead id={shelf.key} eyebrow={shelf.eyebrow} title={shelf.title} lede={shelf.lede} splat={shelf.splat} />
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((project, i) =>
                  items.length === 1 ? (
                    <div key={project.slug} className="md:col-span-2 xl:col-span-3">
                      <PieceCard project={project} index={i} variant="wide" />
                    </div>
                  ) : (
                    <PieceCard key={project.slug} project={project} index={i} variant="tile" showTech={6} />
                  ),
                )}
              </div>
            </section>
          );
        })}

        {/* client / employer work */}
        <section>
          <SectionHead
            id="client-work"
            eyebrow="client work"
            title="Work I've done for companies"
            lede="Problem, solution and impact for what I built at Second Sun, for Zaki's, and at Joker IT."
            splat="peach"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {showcase.map((project) => (
              <article key={project.slug} className="piece flex flex-col p-6">
                <p className="eyebrow">client project</p>
                <h3 className="font-display mt-2 text-2xl font-semibold leading-snug">{project.title}</h3>
                <dl className="mt-5 space-y-4 text-sm leading-6 text-chalk-dim">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-sky">problem</dt>
                    <dd className="mt-1">{project.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-sky">solution</dt>
                    <dd className="mt-1">{project.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-tag">impact</dt>
                    <dd className="mt-1">{project.impact}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="piece piece-static mt-8 p-6 sm:p-8">
            <p className="eyebrow">work history</p>
            <div className="mt-2 divide-y divide-[rgba(255,255,255,0.07)]">
              {profileContent.experiences.map((exp) => (
                <div key={`${exp.company}-${exp.period}`} className="grid gap-2 py-5 sm:grid-cols-[180px,1fr]">
                  <p className="font-mono text-xs text-chalk-mute">{exp.period}</p>
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-snug">
                      {exp.role} <span className="text-tag">/ {exp.company}</span>
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-chalk-dim">{exp.summary}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-tag px-5 py-2 text-xs">
                Contact me
              </Link>
              <a href={profileContent.socials[0].href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-2 text-xs">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkPage;
