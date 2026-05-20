import Link from "next/link";

const zones = [
  {
    label: "01 / Software Engineering",
    title: "Production systems, interfaces, cloud tooling.",
    body: "Full-stack work across Next.js, Flask, Docker, Azure, MongoDB, and product workflows.",
    href: "/software",
    cta: "Enter software sector",
  },
  {
    label: "02 / Game Development",
    title: "Interactive systems, Unity loops, player feedback.",
    body: "Unity prototypes, VR interaction systems, gameplay mechanics, shaders, and readable feedback loops.",
    href: "/games",
    cta: "Enter game sector",
  },
  {
    label: "03 / Devlog",
    title: "Repo transmissions from shipped builds.",
    body: "A cyberpunk contract board for unique repositories and implementation notes.",
    href: "/devlog",
    cta: "Open devlog",
  },
  {
    label: "04 / Contact",
    title: "Patch into Copenhagen.",
    body: "Open for full-stack engineering, creative technology, and AI-adjacent software work.",
    href: "/contact",
    cta: "Contact me",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="relative overflow-hidden border-b-4 border-[#fcee0a] bg-[#fcee0a] text-black">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,#000_12.5%,transparent_12.5%,transparent_50%,#000_50%,#000_62.5%,transparent_62.5%,transparent_100%)] [background-size:28px_28px]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr,0.75fr] lg:items-center">
          <div className="space-y-7">
            <p className="text-sm font-black uppercase tracking-[0.32em]">/// Portfolio Mainframe</p>
            <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.82] tracking-tight sm:text-8xl lg:text-9xl">
              Marwan Summakieh
            </h1>
            <p className="max-w-2xl border-l-4 border-black pl-5 text-xl font-bold leading-8">
              Full-stack software engineer building production apps, cloud tooling, applied AI workflows, and interactive systems.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/software" className="bg-black px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#fcee0a] transition hover:bg-[#00f0ff] hover:text-black">
                Start
              </Link>
              <Link href="/contact" className="border-2 border-black px-7 py-4 text-sm font-black uppercase tracking-[0.18em] transition hover:bg-black hover:text-[#fcee0a]">
                Contact
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] border-4 border-black bg-[#050505] font-mono text-[#00ff9f] shadow-[16px_16px_0_#ff003c]">
            <div className="absolute inset-0 opacity-20 [background:repeating-linear-gradient(0deg,transparent_0px,transparent_3px,#00ff9f_4px)]" />
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_50%_50%,transparent_0,rgba(0,255,159,.18)_100%)]" />
            <div className="relative flex h-full flex-col p-6">
              <div className="mb-5 flex items-center justify-between border-b border-[#00ff9f]/35 pb-3 text-xs font-black uppercase tracking-[0.22em]">
                <span>MS-DOS / Portfolio Shell</span>
                <span className="text-[#fcee0a]">v2.07</span>
              </div>

              <div className="flex-1 space-y-3 text-sm font-bold leading-6">
                <p><span className="text-[#fcee0a]">C:\PORTFOLIO&gt;</span> boot marwan.exe</p>
                <p>Loading software sector ............ <span className="text-[#fcee0a]">OK</span></p>
                <p>Loading game-dev sector ............ <span className="text-[#fcee0a]">OK</span></p>
                <p>Loading repo contracts ............. <span className="text-[#fcee0a]">OK</span></p>
                <p>Base node: Copenhagen</p>
                <p>Primary stack: React / Python / Azure</p>
                <p>Mode: product software + interactive systems</p>
                <p className="pt-5 text-[#00f0ff]">
                  &gt; choose route<span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#00f0ff] align-middle" />
                </p>
              </div>

              <div className="mt-5 border-t border-[#00ff9f]/35 pt-3 text-xs uppercase tracking-[0.18em] text-[#00ff9f]/70">
                Type START, CONTACT, SOFTWARE, GAMES
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-4">
          {zones.map((zone) => (
            <Link key={zone.href} href={zone.href} className="group min-h-[330px] border-2 border-[#fcee0a]/60 bg-[#111] p-5 transition hover:-translate-y-1 hover:border-[#00f0ff] hover:shadow-[10px_10px_0_#00f0ff]">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#fcee0a]">{zone.label}</p>
              <h2 className="mt-8 text-3xl font-black uppercase leading-none text-white">{zone.title}</h2>
              <p className="mt-5 text-sm font-medium leading-7 text-white/65">{zone.body}</p>
              <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-[#00f0ff] group-hover:text-[#fcee0a]">
                {zone.cta} →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
