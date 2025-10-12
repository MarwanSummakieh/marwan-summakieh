import { profileContent } from "@/lib/profile";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const metadata = {
  title: "Contact | Game Dev Journey",
};

const ContactPage = () => {
  const { contact, socials } = profileContent;

  return (
    <div className="space-y-10">
      <header className="space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-200/80">
          Contact me
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Get in touch</h1>
        <p className="mx-auto max-w-2xl text-base text-slate-200">
          Reach out to discuss game development partnerships, contract work on tooling, or collaborative research into human-centered AI for interactive media.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {contact.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-100 transition hover:border-white/40 hover:bg-white/10"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-purple-200/80">{item.label}</p>
            <p className="mt-2 text-base font-semibold text-white">{item.value}</p>
          </a>
        ))}
      </section>

      <section className="space-y-4 text-center">
  <h2 className="text-lg font-semibold text-white">Find me online</h2>
        <div className="flex justify-center gap-4 text-purple-200">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/5 transition hover:border-white/60 hover:bg-white/10"
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
