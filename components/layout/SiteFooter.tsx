import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { profileContent } from "@/lib/profile";

const SiteFooter = () => {
  const github = profileContent.socials.find((s) => s.label === "GitHub");
  const linkedin = profileContent.socials.find((s) => s.label === "LinkedIn");
  const email = profileContent.contact.find((c) => c.label === "Email");

  return (
    <footer className="relative mt-28 border-t border-line bg-wall-2">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(80,227,128,0.5)] to-transparent"
      />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-end">
          <div>
            <Image src="/brand/marwanos-tag.webp" alt="Marwan" width={1404} height={489} className="h-12 w-auto opacity-90" />
            <p className="mt-5 max-w-md text-sm leading-6 text-chalk-dim">{profileContent.availability}</p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            {email && (
              <a
                href={email.href}
                className="group inline-flex items-center gap-2 font-mono text-sm text-chalk transition hover:text-tag"
              >
                {email.value}
                <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            )}
            <div className="flex flex-wrap gap-2 md:justify-end">
              {github && (
                <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-1.5 text-xs">
                  <FaGithub className="h-3.5 w-3.5" /> GitHub
                </a>
              )}
              {linkedin && (
                <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-1.5 text-xs">
                  <FaLinkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              )}
              <Link href="/contact" className="btn-tag px-4 py-1.5 text-xs">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-mute">
          <span>Copenhagen, Denmark</span>
          <span>
            © {new Date().getFullYear()} Marwan Summakieh · Next.js · Vercel
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
