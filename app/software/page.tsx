import { profileContent } from "@/lib/profile";

export const metadata = {
  title: "Software Engineering | Marwan Summakieh",
};

const SoftwarePage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="border-b-4 border-[#fcee0a] bg-[#00f0ff] px-5 py-16 text-black sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.32em]">/// Software Sector</p>
          <h1 className="mt-5 max-w-5xl text-6xl font-black uppercase leading-[0.86] sm:text-8xl">
            Engineering background
          </h1>
          <p className="mt-7 max-w-3xl border-l-4 border-black pl-5 text-xl font-bold leading-8">
            Production web apps, backend services, cloud automation, and product delivery.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-2">
        {profileContent.showcaseProjects.map((project) => (
          <article key={project.slug} className="border-2 border-[#00f0ff]/50 bg-[#101010] p-6 shadow-[8px_8px_0_rgba(0,240,255,.18)]">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#fcee0a]">Case File</p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-none">{project.title}</h2>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-white/75">
              <p><span className="font-black text-[#00f0ff]">Problem:</span> {project.problem}</p>
              <p><span className="font-black text-[#00f0ff]">Solution:</span> {project.solution}</p>
              <p><span className="font-black text-[#fcee0a]">Impact:</span> {project.impact}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="border border-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/70">{tech}</span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="border-2 border-[#fcee0a] bg-[#fcee0a] p-6 text-black">
          <h2 className="text-3xl font-black uppercase">Work history</h2>
          <div className="mt-6 grid gap-5">
            {profileContent.experiences.map((exp) => (
              <div key={`${exp.company}-${exp.period}`} className="border-t-2 border-black pt-5">
                <p className="text-xs font-black uppercase tracking-[0.2em]">{exp.period}</p>
                <h3 className="mt-2 text-2xl font-black uppercase">{exp.role} / {exp.company}</h3>
                <p className="mt-2 max-w-4xl font-semibold leading-7">{exp.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwarePage;
