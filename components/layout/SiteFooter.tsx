import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profileContent } from "@/lib/profile";

const SiteFooter = () => {
  const github = profileContent.socials.find((s) => s.label === "GitHub");
  const linkedin = profileContent.socials.find((s) => s.label === "LinkedIn");
  const email = profileContent.contact.find((c) => c.label === "Email");

  return (
    <footer className="relative mt-24 border-t-2 border-halo bg-wall-2 shadow-[0_-4px_0_#000]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1fr,auto] md:items-end">
        <div>
          <Image src="/brand/marwanos-tag.webp" alt="MarwanOS" width={1404} height={489} className="h-14 w-auto opacity-90" />
          <p className="mt-4 max-w-md text-sm leading-6 text-chalk/60">
            {profileContent.availability}
          </p>
          <p className="mt-2 font-marker text-xs text-chalk/40">
            painted in Copenhagen · Next.js · deployed on Vercel · © {new Date().getFullYear()} Marwan Summakieh
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {email && (
            <a href={email.href} className="btn-ghost text-xs">
              Email
            </a>
          )}
          {github && (
            <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
              <FaGithub className="h-4 w-4" /> GitHub
            </a>
          )}
          {linkedin && (
            <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
              <FaLinkedin className="h-4 w-4" /> LinkedIn
            </a>
          )}
          <Link href="/contact" className="btn-tag text-xs">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
