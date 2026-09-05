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
 * Project card. `wide` is the featured layout (image or big numeral on the
 * left); `tile` is compact. Both share the same hairline "piece" surface.
 */
const PieceCard = ({ project, index = 0, variant = "tile", showTech = 5 }: PieceCardProps) => {
  const primary = project.links?.[0];
  const dossierHref = `/devlog/${project.slug}`;
  const accent = ["var(--tag)", "var(--sky)", "var(--violet)", "var(--pink)"][index % 4];

  if (variant === "wide") {
    return (
      <article className="piece grid overflow-hidden lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)]">
        <div className="relative min-h-[240px] border-b border-line bg-wall lg:border-b-0 lg:border-r">
          {project.image ? (
            <>
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-left-top"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-wall/70 via-transparent to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 overflow-hidden" aria-hidden>
              <div
                className="absolute inset-0 opacity-[0.16]"
                style={{
                  background:
                    "radial-gradient(80% 90% at 20% 15%, var(--violet), transparent 60%), radial-gradient(70% 80% at 85% 80%, var(--tag), transparent 60%)",
                }}
              />
              <div className="bricks absolute inset-0 opacity-40" />
              <p className="font-display absolute -bottom-6 left-4 text-[9rem] font-bold leading-none text-chalk/10 sm:text-[11rem]">
                {String(index + 1).padStart(2, "0")}
              </p>
            </div>
          )}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <StatusSticker status={project.status} />
            {project.year && <span className="sticker">{project.year}</span>}
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <p className="eyebrow">{project.category ? categoryLabel[project.category] : "Project"}</p>
          <h3 className="font-display mt-2 text-3xl font-semibold leading-tight text-chalk sm:text-4xl">
            <Link href={dossierHref} className="marker-underline transition hover:text-tag">
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 text-base leading-7 text-chalk-dim">{project.hook ?? project.summary}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.outcomes.slice(0, 4).map((outcome) => (
              <li key={outcome} className="flex gap-2.5 text-sm leading-6 text-chalk-dim">
                <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
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
          {project.note && <p className="mt-4 text-xs italic text-peach/80">* {project.note}</p>}
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link href={dossierHref} className="btn-tag px-5 py-2 text-xs">
              Read the dossier
            </Link>
            {primary && (
              <a href={primary.href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-2 text-xs">
                {primary.label.replace("GitHub repository", "GitHub")} <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="piece group flex flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <StatusSticker status={project.status} />
        {project.year && <span className="font-mono text-xs text-chalk-mute">{project.year}</span>}
      </div>
      <h3 className="font-display mt-4 text-2xl font-semibold leading-snug text-chalk">
        <Link href={dossierHref} className="transition hover:text-tag">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2.5 text-sm leading-6 text-chalk-dim">{project.hook ?? project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, showTech).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-5 text-xs font-semibold uppercase tracking-[0.14em]">
        <Link href={dossierHref} className="inline-flex items-center gap-1 text-tag transition hover:text-peach">
          Details
          <ArrowUpRightIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        {primary && (
          <a
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-chalk-mute transition hover:text-chalk"
          >
            {primary.label.replace("GitHub repository", "GitHub")}
            <ArrowUpRightIcon className="h-3 w-3" />
          </a>
        )}
      </div>
    </article>
  );
};

export default PieceCard;
