import { focusAreas } from "@/lib/gameJourney";
import { profileContent } from "@/lib/profile";

export const metadata = {
  title: "About | Marwan Summakieh",
};

const AboutPage = () => {
  return (
    <div className="space-y-16">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          About me
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Marwan Summakieh</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
          {profileContent.tagline}
        </p>
      </header>

      <section className="grid gap-12 md:grid-cols-[2fr,1fr]">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My background</h2>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            I&apos;m a full-stack software engineer and creative technologist based in Copenhagen. My work spans front-end architecture, backend API development, cloud infrastructure, VR interaction design, and game development — with a constant focus on building products that are intuitive and impactful.
          </p>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            At Second Sun, I built a full-stack Flask application with Docker containerization for a turf management platform. As a freelancer, I shipped a Track &amp; Trace order system using Next.js and MongoDB. At Joker IT, I managed Azure cloud infrastructure as the sole developer and built a custom Outlook extension — maintaining 99% uptime across legacy systems.
          </p>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            I&apos;m currently pursuing my MSc in Human-Centered Artificial Intelligence at DTU, combining research on explainable AI and accessible interfaces with hands-on engineering. Outside of production work, I explore creative computing — building finished Unity VR games like Reel Deal, RTS prototypes with behavior-tree AI, and learning 3D modeling in Blender.
          </p>
        </div>
        <aside className="space-y-6">
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Location</h3>
            <p className="mt-1 text-base font-medium text-slate-900 dark:text-white">{profileContent.location}</p>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Education</h3>
            <p className="mt-1 text-sm text-slate-900 dark:text-white">MSc Human-Centered AI — DTU</p>
            <p className="text-sm text-slate-400 dark:text-slate-500">BSc Software Engineering — VIA University</p>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Certification</h3>
            <p className="mt-1 text-sm text-slate-900 dark:text-white">Microsoft Power Platform App Maker</p>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Languages</h3>
            <p className="mt-1 text-sm text-slate-900 dark:text-white">English (Bilingual), Arabic (Native), Danish (Speaking)</p>
          </div>
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Creative interests</h3>
            <ul className="mt-2 space-y-1.5">
              <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span aria-hidden className="mt-1 block h-1.5 w-1.5 rounded-full bg-teal-500" />
                <span>VR visual experiences</span>
              </li>
              <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span aria-hidden className="mt-1 block h-1.5 w-1.5 rounded-full bg-teal-500" />
                <span>Game development in Unity</span>
              </li>
              <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span aria-hidden className="mt-1 block h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>Learning Blender for 3D</span>
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      <section className="space-y-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">How I work</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area) => (
            <div key={area.title} className="space-y-3">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{area.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{area.description}</p>
              <ul className="space-y-1.5">
                {area.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-xs text-slate-400 dark:text-slate-500">
                    <span aria-hidden className="mt-1 block h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      <section className="space-y-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Work history</h2>
        <div className="space-y-10">
          {profileContent.experiences.map((exp) => (
            <div key={`${exp.company}-${exp.period}`} className="grid gap-4 md:grid-cols-[160px,1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">{exp.company}</p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{exp.period}</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{exp.role}</h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{exp.summary}</p>
                <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                  {exp.contributions.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span key={t} className="rounded-full bg-slate-100 px-3 py-0.5 text-[10px] text-slate-500 dark:bg-white/5 dark:text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      {/* Fun Facts */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Outside of code</h2>
        <div className="flex flex-wrap gap-3">
          {profileContent.funFacts.map((fact) => (
            <span
              key={fact}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300"
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
