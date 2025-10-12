import Link from "next/link";
import { gameProjects } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export const metadata = {
  title: "Projects | Game Dev Journey",
};

const ProjectsPage = () => {
  const professionalProjects = profileContent.showcaseProjects;

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/80">
          Project highlights
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Projects from game experiments and client work</h1>
        <p className="max-w-3xl text-base text-slate-200">
          The work below splits into two tracks: ongoing game development experiments and professional engagements with shipped impact. Each entry outlines the problem, the solution path, and measurable outcomes.
        </p>
      </header>

      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/80">
            Game projects
          </p>
          <h2 className="text-2xl font-semibold">In-progress game work</h2>
        </header>
        <div className="space-y-8">
          {gameProjects.map((project) => (
            <article
              key={project.slug}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-[0.3em] text-purple-200/70">
                    {project.status}
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                  <p className="text-sm text-slate-200">{project.summary}</p>
                  <p className="text-sm text-slate-100">{project.focus}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-purple-200">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                <ul className="space-y-2">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2">
                      <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-purple-400" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  {project.links && project.links.length > 0 ? (
                    project.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-purple-200 underline decoration-purple-300/60 underline-offset-4 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">Additional captures and docs publish after the next milestone.</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/80">
            Client projects
          </p>
          <h2 className="text-2xl font-semibold">Work delivered for teams</h2>
        </header>
        <div className="space-y-8">
          {professionalProjects.map((project) => (
            <article
              key={project.slug}
              className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                  <div className="grid gap-2 text-sm text-slate-200">
                    <div>
                      <p className="font-semibold text-purple-200/80">Problem</p>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-200/80">Solution</p>
                      <p>{project.solution}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-200/80">Impact</p>
                      <p>{project.impact}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-purple-200">
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
              {project.link ? (
                <div className="mt-4">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-purple-200 underline decoration-purple-300/60 underline-offset-4 transition hover:text-white"
                  >
                    View supporting materials
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
