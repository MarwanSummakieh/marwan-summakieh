import Link from "next/link";
import { gameProjects } from "@/lib/gameJourney";

export const metadata = {
  title: "Devlog | Marwan Summakieh",
};

const contractSlugs = [
  "vibe-opsy",
  "ninja-fishing-vr",
  "real-time-strategie",
  "neural-network",
  "terminal-go",
  "emergency-button",
];

const DevlogPage = () => {
  const contracts = contractSlugs
    .map((slug) => gameProjects.find((project) => project.slug === slug))
    .filter((project): project is (typeof gameProjects)[number] => Boolean(project));

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="border-b-4 border-[#fcee0a] bg-[#ff003c] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-[#fcee0a]">/// Repo Contracts</p>
          <h1 className="mt-5 max-w-5xl text-6xl font-black uppercase leading-[0.86] sm:text-8xl">
            Devlog board
          </h1>
          <p className="mt-7 max-w-3xl border-l-4 border-[#fcee0a] pl-5 text-xl font-bold leading-8">
            Only unique repositories. No duplicate mission spam. Each contract points to source.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-5">
          {contracts.map((project, index) => (
            <article key={project.slug} className="group grid gap-5 border-2 border-[#fcee0a]/50 bg-[#101010] p-5 transition hover:border-[#00f0ff] hover:shadow-[10px_10px_0_#00f0ff] md:grid-cols-[140px,1fr,220px]">
              <div>
                <p className="text-5xl font-black text-[#fcee0a]">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.22em] text-[#00f0ff]">{project.status}</p>
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase leading-none">{project.title}</h2>
                <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-white/70">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.slice(0, 5).map((tech) => (
                    <span key={tech} className="border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-end gap-2">
                <Link href={`/devlog/${project.slug}`} className="bg-[#ff003c] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#00f0ff] hover:text-black">
                  Open dossier →
                </Link>
                {project.links?.map((link) => (
                  <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="bg-[#fcee0a] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#00f0ff]">
                    {link.label} →
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DevlogPage;
