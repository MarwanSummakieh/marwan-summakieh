import { profileContent } from "@/lib/profile";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const metadata = {
  title: "Contact | Marwan Summakieh",
};

const ContactPage = () => {
  const { contact, socials } = profileContent;

  return (
    <div className="space-y-12">
      <header className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300/70">
          Contact me
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Get in touch</h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300">
          I&apos;m open to full-stack engineering roles, freelance projects, and conversations about building great software products. Reach out anytime.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {contact.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-100 transition-all hover:border-purple-400/30 hover:bg-white/[0.06]"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-300/70">{item.label}</p>
            <p className="mt-2 text-base font-semibold text-white transition-colors group-hover:text-purple-200">{item.value}</p>
          </a>
        ))}
      </section>

      <section className="space-y-5 text-center">
        <h2 className="text-lg font-semibold text-white">Find me online</h2>
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
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-purple-200 transition-all hover:-translate-y-0.5 hover:border-purple-400/40 hover:bg-white/10 hover:text-white"
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
