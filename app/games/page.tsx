import Image from "next/image";
import Link from "next/link";
import { gameProjects } from "@/lib/gameJourney";

export const metadata = {
  title: "Game Development | Marwan Summakieh",
};

const gameSlugs = ["ninja-fishing-vr", "real-time-strategie", "basket-ball-vr"];

const GamesPage = () => {
  const games = gameSlugs
    .map((slug) => gameProjects.find((project) => project.slug === slug))
    .filter((project): project is (typeof gameProjects)[number] => Boolean(project));

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="grid border-b-4 border-[#fcee0a] lg:grid-cols-[1fr,0.9fr]">
        <div className="bg-[#fcee0a] px-5 py-16 text-black sm:px-8">
          <div className="mx-auto max-w-3xl lg:ml-auto">
            <p className="text-sm font-black uppercase tracking-[0.32em]">/// Game Sector</p>
            <h1 className="mt-5 text-6xl font-black uppercase leading-[0.86] sm:text-8xl">
              Game dev systems
            </h1>
            <p className="mt-7 border-l-4 border-black pl-5 text-xl font-bold leading-8">
              Unity, C#, interaction loops, feedback systems, shaders, and playable prototypes.
            </p>
          </div>
        </div>
        <div className="relative min-h-[420px]">
          <Image src="/reel-deal/reel-deal-slicing.webp" alt="Reel Deal gameplay scene" fill priority sizes="50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-6">
          {games.map((project, index) => (
            <article key={project.slug} className="grid gap-6 border-2 border-[#fcee0a]/50 bg-[#101010] p-6 lg:grid-cols-[220px,1fr]">
              <div>
                <p className="text-6xl font-black text-[#ff003c]">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] text-[#fcee0a]">{project.status}</p>
              </div>
              <div>
                <h2 className="text-4xl font-black uppercase leading-none">{project.title}</h2>
                <p className="mt-4 max-w-4xl text-base leading-8 text-white/70">{project.summary}</p>
                <ul className="mt-5 grid gap-2 md:grid-cols-3">
                  {project.outcomes.slice(0, 3).map((outcome) => (
                    <li key={outcome} className="border-l-2 border-[#00f0ff] pl-3 text-sm leading-6 text-white/70">{outcome}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.links?.map((link) => (
                    <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="bg-[#00f0ff] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black hover:bg-[#fcee0a]">
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GamesPage;
