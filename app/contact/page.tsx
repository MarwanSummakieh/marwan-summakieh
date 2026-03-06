import { profileContent } from "@/lib/profile";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const metadata = {
  title: "Contact | Marwan Summakieh",
};

const ContactPage = () => {
  const { contact, socials } = profileContent;

  return (
    <div className="space-y-16">
      <header className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
          Contact me
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Get in touch</h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
          I&apos;m open to full-stack engineering roles, freelance projects, and conversations about building great software products. Reach out anytime.
        </p>
      </header>

      <section className="grid gap-8 sm:grid-cols-3">
        {contact.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group space-y-2"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">{item.label}</p>
            <p className="text-base font-semibold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">{item.value}</p>
          </a>
        ))}
      </section>

      <hr className="border-slate-200 dark:border-white/10" />

      <section className="space-y-5 text-center">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Find me online</h2>
        <div className="flex justify-center gap-4">
          {socials.map((link) => {
            const icon = link.label === "LinkedIn" ? (
              <FaLinkedin className="h-5 w-5" aria-hidden />
            ) : (
              <FaGithub className="h-5 w-5" aria-hidden />
            );

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-emerald-600 transition-all hover:-translate-y-0.5 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-white"
                aria-label={link.label}
              >
                {icon}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
