import { toolkit } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export const metadata = {
  title: "Skills | Marwan Summakieh",
};

const ToolsPage = () => {
  return (
    <div className="space-y-14">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300/70">
          Skills &amp; Toolkit
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">What I work with</h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-300">
          A structured overview of the technologies, tools, and platforms I use across front-end, backend, cloud, and design work.
        </p>
      </header>

      {/* Technical Skills Grid */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Technical stack</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {toolkit.map((category) => (
            <div
              key={category.name}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all hover:border-purple-400/25 hover:bg-white/[0.06]"
            >
              <h3 className="text-base font-semibold text-purple-200">{category.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-200 transition-colors group-hover:border-purple-400/20"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Strengths */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Core strengths</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {profileContent.skills.strengths.map((strength) => (
            <div
              key={strength}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-5 transition-all hover:border-purple-400/20"
            >
              <span aria-hidden className="block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
              <span className="text-sm font-medium text-white">{strength}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Currently Learning */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Currently learning</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {profileContent.skills.learning.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 transition-all hover:border-purple-400/25"
            >
              <span className="text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;
