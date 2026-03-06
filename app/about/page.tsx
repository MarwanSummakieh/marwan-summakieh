import { focusAreas } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export const metadata = {
  title: "About | Marwan Summakieh",
};

const AboutPage = () => {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300/70">
          About me
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Marwan Summakieh</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-200">
          {profileContent.tagline}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
          <h2 className="text-lg font-semibold text-white">My background</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            I&apos;m a full-stack software engineer and Human-Centered AI graduate student based in Copenhagen. My work spans front-end architecture, backend API development, cloud infrastructure, and deployment automation — with a constant focus on building products that are intuitive and reliable.
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            At Second Sun, I built a full-stack Flask application with Docker containerization for a turf management platform. As a freelancer, I shipped a Track &amp; Trace order system using Next.js and MongoDB. At Joker IT, I managed Azure cloud infrastructure as the sole developer and built productivity tooling including a custom Outlook extension — maintaining 99% uptime across legacy systems.
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            I&apos;m currently pursuing my MSc in Human-Centered Artificial Intelligence at DTU (Denmark&apos;s Technical University), combining research on explainable AI and accessible interfaces with hands-on engineering practice.
          </p>
        </div>
        <div className="space-y-5 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur">
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-300/70">
              Location
            </h3>
            <p className="mt-1 text-base font-medium text-white">{profileContent.location}</p>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-300/70">
              Education
            </h3>
            <p className="mt-1 text-sm text-white">MSc Human-Centered AI — DTU</p>
            <p className="text-sm text-slate-400">BSc Software Engineering — VIA University</p>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-300/70">
              Certification
            </h3>
            <p className="mt-1 text-sm text-white">Microsoft Power Platform App Maker</p>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-300/70">
              Languages
            </h3>
            <p className="mt-1 text-sm text-white">English (Bilingual), Arabic (Native), Danish (Speaking)</p>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-white">How I work</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((area) => (
            <div key={area.title} className="group rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur transition-all hover:border-purple-400/25 hover:bg-black/40">
              <h3 className="text-base font-semibold text-white">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{area.description}</p>
              <ul className="mt-4 space-y-1.5">
                {area.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-xs text-slate-400">
                    <span aria-hidden className="mt-1 block h-1.5 w-1.5 rounded-full bg-purple-400/60" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-white">Work history</h2>
        <div className="space-y-5">
          {profileContent.experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all hover:border-purple-400/20"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/70">{exp.company}</span>
                  <h3 className="mt-1 text-base font-semibold text-white">{exp.role}</h3>
                </div>
                <span className="text-sm text-slate-400">{exp.period}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{exp.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {exp.contributions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[10px] text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fun Facts */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Outside of code</h2>
        <div className="flex flex-wrap gap-3">
          {profileContent.funFacts.map((fact) => (
            <span
              key={fact}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
            >
              {fact}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
