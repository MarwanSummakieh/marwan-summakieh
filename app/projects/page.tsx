import Link from "next/link";
import { gameProjects } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export const metadata = {
  title: "Projects | Marwan Summakieh",
};

const ProjectsPage = () => {
  const professionalProjects = profileContent.showcaseProjects;

  // Categorize side projects
  const collabProjects = gameProjects.filter((p) =>
    ["vibe-opsy", "multi-agent-system"].includes(p.slug)
  );
  const gameDevProjects = gameProjects.filter((p) =>
    ["ninja-fishing-vr", "real-time-strategie", "basket-ball-vr"].includes(p.slug)
  );
  const aiResearchProjects = gameProjects.filter((p) =>
    ["neural-network", "elden-ring-social-graphs"].includes(p.slug)
  );
  const appProjects = gameProjects.filter((p) =>
    ["emergency-button", "terminal-go", "not-pirate-bay"].includes(p.slug)
  );

  return (
    <div className="space-y-20">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          Project highlights
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Shipped work &amp; creative experiments</h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
          From production web platforms to VR games, neural networks, and social graph analysis — here&apos;s a curated selection of professional and personal work.
        </p>
      </header>

      {/* Professional Projects */}
      <section className="space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            Professional work
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Production projects</h2>
        </header>
        <div className="space-y-10">
          {professionalProjects.map((project) => (
            <article key={project.slug} className="grid gap-4 md:grid-cols-[1fr,2fr]">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-500 dark:bg-white/5 dark:text-slate-400">
                      {item}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <div className="mt-3">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-emerald-600 underline decoration-emerald-300/40 underline-offset-4 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-white"
                    >
                      View project &rarr;
                    </Link>
                  </div>
                )}
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Problem</p>
                  <p className="mt-1">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Solution</p>
                  <p className="mt-1">{project.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Impact</p>
                  <p className="mt-1">{project.impact}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      {/* Collaborative Projects */}
      <section className="space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            Collaborative work
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Team projects &amp; open-source</h2>
        </header>
        <div className="grid gap-10 md:grid-cols-2">
          {collabProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      {/* Game Dev & VR */}
      <section className="space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
            Game development &amp; VR
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Interactive experiences</h2>
        </header>
        <div className="grid gap-10 md:grid-cols-2">
          {gameDevProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      {/* AI & Research */}
      <section className="space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            AI &amp; research
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Machine learning &amp; data analysis</h2>
        </header>
        <div className="grid gap-10 md:grid-cols-2">
          {aiResearchProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      {/* Apps & Tools */}
      <section className="space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
            Apps &amp; tools
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Software projects &amp; experiments</h2>
        </header>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {appProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

function ProjectCard({ project }: { project: typeof gameProjects[number] }) {
  return (
    <article className="space-y-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        {project.status}
      </p>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{project.summary}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-500 dark:bg-white/5 dark:text-slate-400">
            {item}
          </span>
        ))}
      </div>

      <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
        {project.outcomes.slice(0, 3).map((outcome) => (
          <li key={outcome} className="flex gap-2">
            <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>

      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-emerald-600 underline decoration-emerald-300/40 underline-offset-4 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-white"
            >
              {link.label} &rarr;
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}

export default ProjectsPage;
