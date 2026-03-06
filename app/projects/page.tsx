import Link from "next/link";
import { gameProjects } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export const metadata = {
  title: "Projects | Marwan Summakieh",
};

const ProjectsPage = () => {
  const professionalProjects = profileContent.showcaseProjects;

  return (
    <div className="space-y-14">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300/70">
          Project highlights
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Shipped work &amp; side projects</h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-300">
          A mix of professional engagements with shipped impact and personal experiments. Each entry outlines the problem, the approach, and the outcome.
        </p>
      </header>

      {/* Professional Projects */}
      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300/70">
            Professional work
          </p>
          <h2 className="text-2xl font-semibold">Production projects</h2>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {professionalProjects.map((project) => (
            <article
              key={project.slug}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all hover:border-purple-400/25 hover:bg-white/[0.06]"
            >
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-200/70">Problem</p>
                  <p className="mt-1">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-200/70">Solution</p>
                  <p className="mt-1">{project.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/70">Impact</p>
                  <p className="mt-1">{project.impact}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {project.link && (
                <div className="mt-4">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-purple-300 underline decoration-purple-400/40 underline-offset-4 transition hover:text-white"
                  >
                    View project &rarr;
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Side Projects */}
      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300/70">
            Side projects
          </p>
          <h2 className="text-2xl font-semibold">Experiments &amp; explorations</h2>
        </header>
        <div className="space-y-6">
          {gameProjects.map((project) => (
            <article
              key={project.slug}
              className="group rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur transition-all hover:border-purple-400/20"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3 flex-1">
                  <div className="inline-block rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-purple-300">
                    {project.status}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">{project.summary}</p>
                  <p className="text-sm text-slate-400">{project.focus}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-purple-200 md:max-w-[200px] md:justify-end">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 text-sm text-slate-200 md:grid-cols-2">
                <ul className="space-y-2">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2">
                      <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-purple-400" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  {project.links && project.links.length > 0 ? (
                    project.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-purple-300 underline decoration-purple-400/40 underline-offset-4 transition hover:text-white"
                      >
                        {link.label} &rarr;
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">More details coming soon.</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
