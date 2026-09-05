import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { gameProjects } from "@/lib/gameJourney";
import SectionHead from "@/components/brand/SectionHead";
import StatusSticker from "@/components/brand/StatusSticker";

export const metadata = {
  title: "Devlog | Marwan Summakieh",
  description: "Every repository Marwan Summakieh has published, with a detail page for each: focus, milestones, stack, source.",
};

const entries = [...gameProjects]
  .filter((p) => p.links?.some((l) => l.href.includes("github.com")))
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

const DevlogPage = () => (
  <div className="text-chalk">
    <section className="drips drips-pink bricks border-b border-line">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHead
          eyebrow="devlog"
          splat="pink"
          title={
            <>
              Every repo, <span className="marble-text">newest first</span>
            </>
          }
          lede="One entry per repository. Each one opens a detail page and links straight to the source."
        />
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
      <ol className="space-y-4">
        {entries.map((project, index) => {
          const github = project.links?.find((l) => l.href.includes("github.com"));
          const live = project.links?.find((l) => !l.href.includes("github.com"));
          return (
            <li key={project.slug}>
              <article className="piece grid gap-5 p-5 sm:p-6 md:grid-cols-[90px,1fr,auto] md:items-start">
                <div>
                  <p className="font-display text-4xl font-bold leading-none text-[rgba(236,238,232,0.14)]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-mono text-xs text-chalk-mute">{project.year ?? "—"}</p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-2xl font-semibold leading-snug sm:text-3xl">
                      <Link href={`/devlog/${project.slug}`} className="transition hover:text-tag">
                        {project.title}
                      </Link>
                    </h2>
                    <StatusSticker status={project.status} />
                  </div>
                  <p className="mt-2.5 max-w-3xl text-sm leading-6 text-chalk-dim">{project.hook ?? project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 6).map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row flex-wrap gap-2 md:w-44 md:flex-col md:justify-start md:pt-1">
                  <Link href={`/devlog/${project.slug}`} className="btn-tag px-4 py-1.5 text-xs">
                    Details
                  </Link>
                  {live && (
                    <a href={live.href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-1.5 text-xs">
                      {live.label.replace("Live dashboard", "Dashboard")} <ArrowUpRightIcon className="h-3 w-3" />
                    </a>
                  )}
                  {github && (
                    <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-1.5 text-xs">
                      Source <ArrowUpRightIcon className="h-3 w-3" />
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

export default DevlogPage;
