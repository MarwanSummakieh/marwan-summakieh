import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { gameProjects } from "@/lib/gameJourney";
import SectionHead from "@/components/brand/SectionHead";
import StatusSticker from "@/components/brand/StatusSticker";

export const metadata = {
  title: "Blackbook | MarwanOS",
  description: "Marwan Summakieh's blackbook — every repository with a dossier: focus, milestones, stack, source.",
};

const entries = [...gameProjects]
  .filter((p) => p.links?.some((l) => l.href.includes("github.com")))
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

const BlackbookPage = () => (
  <div className="text-chalk">
    <section className="drips drips-pink bricks border-b-2 border-halo shadow-[0_4px_0_#000]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <SectionHead
          eyebrow="blackbook"
          splat="pink"
          title={
            <>
              Sketches, sources, <span className="marble-text">receipts</span>
            </>
          }
          lede="A graffiti writer keeps a blackbook — every outline before it hits the wall. This is mine: one entry per unique repository, newest first, each pointing at source."
        />
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 pb-8 pt-20 sm:px-8">
      <ol className="space-y-6">
        {entries.map((project, index) => {
          const github = project.links?.find((l) => l.href.includes("github.com"));
          const live = project.links?.find((l) => !l.href.includes("github.com"));
          return (
            <li key={project.slug}>
              <article className={`piece grid gap-5 p-5 sm:p-6 md:grid-cols-[110px,1fr,auto] ${index % 2 ? "rotate-[0.3deg]" : "-rotate-[0.3deg]"}`}>
                <div>
                  <p className="font-display outline-text-tag text-5xl leading-none">{String(index + 1).padStart(2, "0")}</p>
                  <p className="font-marker mt-2 text-xs text-chalk/50">{project.year ?? "—"}</p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-3xl leading-none sm:text-4xl">
                      <Link href={`/devlog/${project.slug}`} className="hover:text-tag">
                        {project.title}
                      </Link>
                    </h2>
                    <StatusSticker status={project.status} />
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-chalk/70">{project.hook ?? project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 6).map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row flex-wrap gap-2 md:w-44 md:flex-col md:justify-end">
                  <Link href={`/devlog/${project.slug}`} className="btn-tag text-xs">
                    Open piece
                  </Link>
                  {live && (
                    <a href={live.href} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
                      {live.label} <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {github && (
                    <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
                      Source <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  </div>
);

export default BlackbookPage;
