import { FaGithub, FaLinkedin } from "react-icons/fa";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { profileContent } from "@/lib/profile";
import SectionHead from "@/components/brand/SectionHead";

export const metadata = {
  title: "Contact | MarwanOS",
  description: "Get in touch with Marwan Summakieh — full-stack & systems engineer in Copenhagen.",
};

const icons: Record<string, React.ReactNode> = {
  Email: <EnvelopeIcon className="h-6 w-6" />,
  Phone: <PhoneIcon className="h-6 w-6" />,
  Location: <MapPinIcon className="h-6 w-6" />,
};

const ContactPage = () => {
  const { contact, socials } = profileContent;

  return (
    <div className="text-chalk">
      <section className="drips bricks border-b-2 border-halo shadow-[0_4px_0_#000]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <SectionHead
            eyebrow="signal open"
            title={
              <>
                Let&apos;s put something <span className="marble-text">on the wall</span>
              </>
            }
            lede={profileContent.availability}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 pt-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {contact.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Location" ? "_blank" : undefined}
              rel={item.label === "Location" ? "noopener noreferrer" : undefined}
              className={`piece flex flex-col p-6 ${["-rotate-[0.6deg]", "rotate-[0.5deg]", "-rotate-[0.3deg]"][i]}`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center border-2 border-ink bg-tag text-ink shadow-[3px_3px_0_#000]">
                {icons[item.label]}
              </span>
              <p className="eyebrow mt-5">{item.label}</p>
              <p className="font-display mt-1 break-words text-2xl leading-tight sm:text-3xl">{item.value}</p>
            </a>
          ))}
        </div>

        <div className="piece piece-static mt-12 grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr,auto] md:items-center">
          <div>
            <p className="sticker sticker-violet">elsewhere</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-chalk/70">
              All source lives on GitHub. Career history and recommendations are on LinkedIn. If you&apos;re hiring in Copenhagen or remote, email is fastest.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socials.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {link.label === "LinkedIn" ? <FaLinkedin className="h-5 w-5" /> : <FaGithub className="h-5 w-5" />}
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
