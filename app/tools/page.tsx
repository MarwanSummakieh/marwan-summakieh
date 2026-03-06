import { toolkit } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export const metadata = {
  title: "Skills | Marwan Summakieh",
};

const ToolsPage = () => {
  return (
    <div className="space-y-16">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          Skills &amp; Toolkit
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">What I work with</h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
          From production web stacks and cloud infrastructure to Unity game development, VR, and creative computing tools. A structured overview across all domains.
        </p>
      </header>

      {/* Technical Skills Grid */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Technical stack</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((category) => (
            <div key={category.name} className="space-y-4">
              <h3 className="text-base font-semibold text-emerald-600 dark:text-emerald-300">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      {/* Core Strengths */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Core strengths</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {profileContent.skills.strengths.map((strength) => (
            <div key={strength} className="flex items-center gap-3 py-2">
              <span aria-hidden className="block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-white">{strength}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      {/* Currently Learning */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Currently learning</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profileContent.skills.learning.map((item) => (
            <div key={item} className="py-2">
              <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;
