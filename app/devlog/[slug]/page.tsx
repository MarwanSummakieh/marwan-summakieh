import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { gameProjects } from "@/lib/gameJourney";
import StatusSticker from "@/components/brand/StatusSticker";

const imageMap: Record<string, { src: string; alt: string }[]> = {
  "ninja-fishing-vr": [
    { src: "/reel-deal/reel-deal-slicing.webp", alt: "Reel Deal gameplay slicing scene" },
    { src: "/reel-deal/reel-deal-table-loop.webp", alt: "Reel Deal gameplay table scene" },
    { src: "/reel-deal/reel-deal-watch-ui.webp", alt: "Reel Deal wristwatch interface" },
  ],
  storyroom: [{ src: "/work/storyroom.webp", alt: "Storyroom workspace — manuscript editor, story bible and scene chat" }],
};

const categoryLabel = {
  systems: "Operating system",
  software: "Software",
  games: "Games & VR",
  research: "Research",
} as const;

export function generateStaticParams() {
  return gameProjects
    .filter((project) => project.links?.some((link) => link.href.includes("github.com")))
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = gameProjects.find((item) => item.slug === slug);
  return {
    title: project ? `${project.title} | Marwan Summakieh` : "Project",
    description: project?.hook ?? project?.summary,
  };
}

const ProjectPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = gameProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  const githubLinks = project.links?.filter((link) => link.href.includes("github.com")) ?? [];
  const otherLinks = project.links?.filter((link) => !link.href.includes("github.com")) ?? [];
  const media = imageMap[project.slug] ?? [];
  const idx = gameProjects.findIndex((p) => p.slug === slug);
  const siblings = gameProjects.filter((p) => p.slug !== slug && (p.category ?? "games") === (project.category ?? "games")).slice(0, 3);

  return (
    <div className="text-chalk">
      <section className="drips bricks relative overflow-hidden border-b border-line">
        <span aria-hidden className="splat -top-16 left-[8%] h-56 w-80" style={{ background: "rgba(109, 92, 255, 0.5)" }} />
        <span aria-hidden className="splat right-[4%] top-0 h-48 w-64" style={{ background: "rgba(80, 227, 128, 0.4)" }} />
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <Link href="/devlog" className="inline-flex items-center gap-2 text-sm text-chalk-mute transition hover:text-tag">
            <ArrowLeftIcon className="h-4 w-4" /> back to the devlog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <StatusSticker status={project.status} />
            {project.category && <span className="sticker">{categoryLabel[project.category]}</span>}
            {project.year && <span className="sticker sticker-peach">{project.year}</span>}
          </div>
          <h1 className="font-display mt-5 max-w-5xl text-5xl font-bold leading-[1.02] sm:text-7xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-chalk-dim">{project.summary}</p>
          {project.note && <p className="mt-3 text-sm italic text-peach">* {project.note}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            {otherLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-tag">
                {link.label} <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            ))}
            {githubLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {link.label} <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-16 sm:px-8 lg:grid-cols-[0.72fr,1.28fr]">
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="piece piece-static p-5">
            <p className="eyebrow">stack</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
            <dl className="mt-6 space-y-3 border-t border-line pt-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-mute">status</dt>
                <dd className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-tag">{project.status}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-mute">source</dt>
                <dd className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">{githubLinks.length ? "GitHub" : "private"}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-chalk-mute">no.</dt>
                <dd className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">{String(idx + 1).padStart(2, "0")}</dd>
              </div>
            </dl>
          </div>

          {siblings.length > 0 && (
            <div>
              <p className="eyebrow">related</p>
              <ul className="mt-3 space-y-1">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/devlog/${s.slug}`}
                      className="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 text-chalk-dim transition hover:bg-white/[0.04] hover:text-tag"
                    >
                      <span className="font-display text-lg font-semibold leading-tight">{s.title}</span>
                      <span className="font-mono text-xs text-chalk-mute">{s.year}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div className="space-y-10">
          {media.length > 0 && (
            <div className="grid gap-5">
              {media.map((image, index) => (
                <div
                  key={image.src}
                  className={`piece piece-static relative overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}`}
                >
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <section className="piece piece-static p-6 sm:p-8">
            <p className="sticker sticker-pink">focus</p>
            <p className="mt-5 text-lg leading-8 text-chalk">{project.focus}</p>
          </section>

          <section>
            <p className="sticker sticker-sky">milestones</p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {project.outcomes.map((outcome, index) => (
                <li key={outcome} className="rounded-xl border border-line bg-white/[0.02] p-4 transition hover:border-[rgba(80,227,128,0.3)]">
                  <p className="font-mono text-sm font-semibold text-tag">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-1.5 text-sm leading-6 text-chalk-dim">{outcome}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
