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
    {status === "Live" && <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-ink" aria-hidden />}
    {status}
  </span>
);

export default StatusSticker;
