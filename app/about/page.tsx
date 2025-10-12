import { journeyOverview, focusAreas } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export const metadata = {
  title: "About | Game Dev Journey",
};

const AboutPage = () => {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/80">
          About me
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Marwan Summakieh</h1>
        <p className="max-w-3xl text-base text-slate-200">
          {journeyOverview.mission}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-lg font-semibold text-white">My background</h2>
          <p className="text-sm text-slate-200">
            Marwan is a software engineer specialising in human-centered AI and front-end architecture. He applies that foundation to interactive narrative prototypes, combat sandboxes, and tooling that improves iteration speed for small teams.
          </p>
          <p className="text-sm text-slate-200">
            Ongoing studies in Human-Centered AI inform research around player empathy, accessible feedback loops, and responsible telemetry. Weekly tabletop campaigns and creative writing drive the narrative direction of prototype work.
          </p>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200/80">
            Where I live
          </h3>
          <p className="text-base text-white">{profileContent.location}</p>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200/80">
            What I&apos;m working on
          </h3>
          <p className="text-sm text-slate-200">Pursuing a master&apos;s in human-centered AI with research aimed at explainable, accessible product experiences.</p>
        </div>
      </section>

      <section className="space-y-4">
  <h2 className="text-lg font-semibold text-white">How I work</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((area) => (
            <div key={area.title} className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur">
              <h3 className="text-base font-semibold text-white">{area.title}</h3>
              <p className="mt-2 text-sm text-slate-200">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
  <h2 className="text-lg font-semibold text-white">Work history</h2>
        <div className="space-y-5">
          {profileContent.experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex flex-col gap-1 text-sm text-purple-200/80">
                <span className="uppercase tracking-[0.3em]">{exp.company}</span>
                <span className="text-white">{exp.role}</span>
                <span className="text-slate-300">{exp.period}</span>
              </div>
              <p className="mt-3 text-sm text-slate-200">{exp.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-100">
                {exp.contributions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
