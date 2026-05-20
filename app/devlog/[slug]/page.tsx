import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gameProjects } from "@/lib/gameJourney";

const imageMap: Record<string, { src: string; alt: string }[]> = {
  "ninja-fishing-vr": [
    {
      src: "/reel-deal/reel-deal-slicing.webp",
      alt: "Reel Deal gameplay slicing scene",
    },
    {
      src: "/reel-deal/reel-deal-table-loop.webp",
      alt: "Reel Deal gameplay table scene",
    },
    {
      src: "/reel-deal/reel-deal-watch-ui.webp",
      alt: "Reel Deal wristwatch interface",
    },
  ],
};

export function generateStaticParams() {
  return gameProjects
    .filter((project) => project.links?.some((link) => link.href.includes("github.com")))
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = gameProjects.find((item) => item.slug === slug);
  return {
    title: project ? `${project.title} | Devlog` : "Project Dossier",
  };
}

const ProjectDossierPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = gameProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const githubLinks = project.links?.filter((link) => link.href.includes("github.com")) ?? [];
  const media = imageMap[project.slug] ?? [];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="border-b-4 border-[#fcee0a] bg-[#fcee0a] px-5 py-14 text-black sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.32em]">/// Project Dossier</p>
          <h1 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.86] sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-4xl border-l-4 border-black pl-5 text-lg font-bold leading-8">
            {project.summary}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {githubLinks.map((link) => (
              <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#fcee0a] transition hover:bg-[#00f0ff] hover:text-black">
                Source: {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr,1.2fr]">
        <aside className="space-y-5">
          <div className="border-2 border-[#00f0ff]/60 bg-[#101010] p-5 shadow-[8px_8px_0_rgba(0,240,255,.18)]">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#00f0ff]">Signal</p>
            <dl className="mt-5 space-y-4 text-sm font-bold uppercase tracking-[0.12em]">
              <div className="flex justify-between border-t border-white/15 pt-3">
                <dt>Status</dt>
                <dd className="text-[#fcee0a]">{project.status}</dd>
              </div>
              <div className="flex justify-between border-t border-white/15 pt-3">
                <dt>Source</dt>
                <dd>{githubLinks.length ? "GitHub" : "Pending"}</dd>
              </div>
              <div className="flex justify-between border-t border-white/15 pt-3">
                <dt>Media</dt>
                <dd>{media.length ? `${media.length} files` : "No local media"}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/65">
                {tech}
              </span>
            ))}
          </div>
        </aside>

        <div className="space-y-8">
          {media.length > 0 && (
            <div className="grid gap-4">
              {media.map((image, index) => (
                <div key={image.src} className={index === 0 ? "relative aspect-[16/9] overflow-hidden border-2 border-[#fcee0a]" : "relative aspect-[16/10] overflow-hidden border-2 border-[#00f0ff]/50"}>
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <section className="border-2 border-[#ff003c]/60 bg-[#101010] p-6">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#ff5a7d]">Focus</p>
            <p className="mt-4 text-lg font-semibold leading-8 text-white/85">{project.focus}</p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {project.outcomes.map((outcome, index) => (
              <div key={outcome} className="border-l-4 border-[#fcee0a] bg-[#101010] p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00f0ff]">Milestone {String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{outcome}</p>
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
};

export default ProjectDossierPage;
