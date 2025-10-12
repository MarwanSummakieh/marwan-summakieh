import { toolkit } from "@/lib/gameJourney";

export const metadata = {
  title: "Toolkit | Game Dev Journey",
};

const ToolsPage = () => {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/80">
          Tools
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Tools I use every day</h1>
        <p className="max-w-3xl text-base text-slate-200">
          A snapshot of the technical stack supporting current prototypes, testing workflows, and collaboration habits.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {toolkit.map((category) => (
          <div
            key={category.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <h2 className="text-xl font-semibold text-white">{category.name}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-100">
              {category.tools.map((tool) => (
                <li key={tool} className="flex gap-2">
                  <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-purple-400" />
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
