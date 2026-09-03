import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { GameProject } from "@/lib/gameJourney";
import StatusSticker from "./StatusSticker";

const categoryLabel: Record<NonNullable<GameProject["category"]>, string> = {
  systems: "Operating system",
  software: "Software",
  games: "Games & VR",
  research: "Research",
};

interface PieceCardProps {
  project: GameProject;
  index?: number;
  variant?: "wide" | "tile";
  showTech?: number;
}

/**
 * A project rendered as a pasted-up piece: white halo, black stroke, hard shadow.
 * `wide` is the featured layout (image or big number on the left); `tile` is compact.
 */
const PieceCard = ({ project, index = 0, variant = "tile", showTech = 5 }: PieceCardProps) => {
  const primary = project.links?.[0];
  const dossierHref = `/devlog/${project.slug}`;
  const rotate = ["-rotate-[0.6deg]", "rotate-[0.4deg]", "-rotate-[0.3deg]", "rotate-[0.7deg]"][index % 4];

  if (variant === "wide") {
    return (
      <article className={`piece ${rotate} grid overflow-hidden lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)]`}>
        <div className="relative min-h-[240px] border-b-2 border-halo bg-wall lg:border-b-0 lg:border-r-2">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-left-top"
            />
          ) : (
            <div className="marble absolute inset-0 opacity-90" aria-hidden>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0)_0,rgba(0,0,0,.55)_100%)]" />
              <p className="font-display outline-text absolute bottom-4 left-5 text-[9rem] leading-none sm:text-[11rem]">
                {String(index + 1).padStart(2, "0")}
              </p>
            </div>
          )}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <StatusSticker status={project.status} />
            {project.year && <span className="sticker rotate-[1.5deg]">{project.year}</span>}
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <p className="eyebrow">{project.category ? categoryLabel[project.category] : "Project"}</p>
          <h3 className="font-display mt-2 text-4xl leading-none text-chalk sm:text-5xl">
            <Link href={dossierHref} className="marker-underline hover:text-tag">
              {project.title}
            </Link>
          </h3>
          <p className="mt-4 text-base leading-7 text-chalk/80">{project.hook ?? project.summary}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.outcomes.slice(0, 4).map((outcome) => (
              <li key={outcome} className="border-l-2 border-tag pl-3 text-sm leading-6 text-chalk/65">
                {outcome}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, showTech + 3).map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
          {project.note && <p className="mt-4 font-marker text-xs text-peach/80">* {project.note}</p>}
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link href={dossierHref} className="btn-tag text-xs">
              Details
            </Link>
            {primary && (
              <a href={primary.href} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
                {primary.label} <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`piece ${rotate} flex flex-col p-5`}>
      <div className="flex items-start justify-between gap-3">
        <StatusSticker status={project.status} />
        {project.year && <span className="font-marker text-xs text-chalk/40">{project.year}</span>}
      </div>
      <h3 className="font-display mt-4 text-3xl leading-none text-chalk">
        <Link href={dossierHref} className="hover:text-tag">
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-chalk/70">{project.hook ?? project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, showTech).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-5 text-xs font-black uppercase tracking-[0.14em]">
        <Link href={dossierHref} className="text-tag hover:text-peach">
          Details →
        </Link>
        {primary && (
          <a href={primary.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-chalk/60 hover:text-halo">
            {primary.label.replace("GitHub repository", "GitHub")} <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
};

export default PieceCard;
