import { FaGithub, FaLinkedin } from "react-icons/fa";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { profileContent } from "@/lib/profile";
import SectionHead from "@/components/brand/SectionHead";

export const metadata = {
  title: "Contact | MarwanOS",
  description: "Get in touch with Marwan Summakieh — full-stack & systems engineer in Copenhagen.",
};

const icons: Record<string, React.ReactNode> = {
  Email: <EnvelopeIcon className="h-5 w-5" />,
  Phone: <PhoneIcon className="h-5 w-5" />,
  Location: <MapPinIcon className="h-5 w-5" />,
};

const accents: Record<string, string> = {
  Email: "bg-[rgba(80,227,128,0.1)] text-tag border-[rgba(80,227,128,0.35)]",
  Phone: "bg-[rgba(88,200,255,0.1)] text-sky border-[rgba(88,200,255,0.35)]",
  Location: "bg-[rgba(109,92,255,0.12)] text-[#a99dff] border-[rgba(109,92,255,0.4)]",
};

const ContactPage = () => {
  const { contact, socials } = profileContent;

  return (
    <div className="text-chalk">
      <section className="drips bricks border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionHead
            eyebrow="contact"
            title={
              <>
                Let&apos;s <span className="marble-text">talk</span>
              </>
            }
            lede={profileContent.availability}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {contact.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Location" ? "_blank" : undefined}
              rel={item.label === "Location" ? "noopener noreferrer" : undefined}
              className="piece group flex flex-col p-6"
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition ${accents[item.label] ?? "bg-white/5 text-chalk border-line-strong"}`}
              >
                {icons[item.label]}
              </span>
              <p className="eyebrow mt-5">{item.label}</p>
              <p className="font-display mt-1.5 break-words text-xl font-semibold leading-snug transition group-hover:text-tag sm:text-2xl">
                {item.value}
              </p>
            </a>
          ))}
        </div>

        <div className="piece piece-static mt-8 grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr,auto] md:items-center">
          <div>
            <p className="sticker sticker-violet">links</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-chalk-dim">
              All source lives on GitHub. Career history and recommendations are on LinkedIn. If you&apos;re hiring in
              Copenhagen or remote, email is fastest.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socials.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {link.label === "LinkedIn" ? <FaLinkedin className="h-4 w-4" /> : <FaGithub className="h-4 w-4" />}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
