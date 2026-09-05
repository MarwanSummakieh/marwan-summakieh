import type { GameProject } from "@/lib/gameJourney";

const styles: Record<GameProject["status"], string> = {
  Live: "sticker-tag",
  Released: "sticker-sky",
  "In Production": "sticker-peach",
  Prototype: "",
  Research: "sticker-violet",
};

const StatusSticker = ({ status, className = "" }: { status: GameProject["status"]; className?: string }) => (
  <span className={`sticker ${styles[status]} ${className}`}>
    {status === "Live" && <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
    </span>}
    {status}
  </span>
);

export default StatusSticker;
