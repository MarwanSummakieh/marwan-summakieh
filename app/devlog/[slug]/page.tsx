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
      <section className="drips bricks relative overflow-hidden border-b-2 border-halo shadow-[0_4px_0_#000]">
        <span aria-hidden className="splat -top-10 left-[10%] h-56 w-80 opacity-40" style={{ background: "var(--violet)" }} />
        <span aria-hidden className="splat right-[5%] top-0 h-48 w-64 opacity-35" style={{ background: "var(--tag)" }} />
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <Link href="/devlog" className="inline-flex items-center gap-2 font-marker text-sm text-chalk/60 hover:text-tag">
            <ArrowLeftIcon className="h-4 w-4" /> back to the devlog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusSticker status={project.status} />
            {project.category && <span className="sticker rotate-[1.5deg]">{categoryLabel[project.category]}</span>}
            {project.year && <span className="sticker sticker-peach -rotate-[1deg]">{project.year}</span>}
          </div>
          <h1 className="font-display outline-text mt-5 max-w-5xl text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-chalk/80">{project.summary}</p>
          {project.note && <p className="mt-3 font-marker text-sm text-peach/90">* {project.note}</p>}
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

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-8 pt-20 sm:px-8 lg:grid-cols-[0.75fr,1.25fr]">
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="piece piece-static -rotate-[0.5deg] p-5">
            <p className="eyebrow">stack</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
            <dl className="mt-6 space-y-3 border-t border-halo/15 pt-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="font-marker text-chalk/50">status</dt>
                <dd className="font-black uppercase tracking-wider text-tag">{project.status}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-marker text-chalk/50">source</dt>
                <dd className="font-black uppercase tracking-wider">{githubLinks.length ? "GitHub" : "private"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-marker text-chalk/50">no.</dt>
                <dd className="font-black uppercase tracking-wider">{String(idx + 1).padStart(2, "0")}</dd>
              </div>
            </dl>
          </div>

          {siblings.length > 0 && (
            <div>
              <p className="eyebrow">related</p>
              <ul className="mt-3 space-y-2">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/devlog/${s.slug}`} className="font-display text-2xl leading-none text-chalk/80 hover:text-tag">
                      {s.title} <span className="font-marker text-xs text-chalk/40">{s.year}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div className="space-y-10">
          {media.length > 0 && (
            <div className="grid gap-6">
              {media.map((image, index) => (
                <div key={image.src} className={`piece piece-static relative overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[16/10]"} ${index % 2 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"}`}>
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <section className="piece piece-static rotate-[0.3deg] p-6 sm:p-8">
            <p className="sticker sticker-pink">focus</p>
            <p className="mt-5 text-lg leading-8 text-chalk/85">{project.focus}</p>
          </section>

          <section>
            <p className="sticker sticker-sky">milestones</p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {project.outcomes.map((outcome, index) => (
                <li key={outcome} className="border-l-4 border-tag bg-concrete/70 p-4 shadow-[4px_4px_0_#000]">
                  <p className="font-display text-xl text-tag">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-1 text-sm leading-6 text-chalk/75">{outcome}</p>
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
