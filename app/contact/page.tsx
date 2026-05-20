import { profileContent } from "@/lib/profile";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const metadata = {
  title: "Contact | Marwan Summakieh",
};

const ContactPage = () => {
  const { contact, socials } = profileContent;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="border-b-4 border-[#fcee0a] bg-[#fcee0a] px-5 py-16 text-black sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.32em]">/// Signal Open</p>
          <h1 className="mt-5 max-w-5xl text-6xl font-black uppercase leading-[0.86] sm:text-8xl">
            Contact me
          </h1>
          <p className="mt-7 max-w-3xl border-l-4 border-black pl-5 text-xl font-bold leading-8">
            Open to full-stack roles, product engineering, creative technology, and AI-adjacent software.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-8 lg:grid-cols-3">
        {contact.map((item) => (
          <a key={item.label} href={item.href} className="border-2 border-[#00f0ff]/50 bg-[#101010] p-6 transition hover:-translate-y-1 hover:border-[#fcee0a] hover:shadow-[10px_10px_0_#fcee0a]">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#00f0ff]">{item.label}</p>
            <p className="mt-5 break-words text-2xl font-black text-white">{item.value}</p>
          </a>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-wrap gap-4 border-2 border-[#ff003c] bg-[#101010] p-6">
          {socials.map((link) => {
            const icon = link.label === "LinkedIn" ? <FaLinkedin className="h-6 w-6" /> : <FaGithub className="h-6 w-6" />;
            return (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#ff003c] px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#00f0ff] hover:text-black">
                {icon}
                {link.label}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
