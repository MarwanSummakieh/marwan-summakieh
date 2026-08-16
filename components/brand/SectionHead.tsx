import type { ReactNode } from "react";

type Splat = "tag" | "violet" | "pink" | "peach" | "sky";

const splatColor: Record<Splat, string> = {
  tag: "var(--tag)",
  violet: "var(--violet)",
  pink: "var(--pink)",
  peach: "var(--peach)",
  sky: "var(--sky)",
};

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  splat?: Splat;
  align?: "left" | "center";
  id?: string;
}

const SectionHead = ({ eyebrow, title, lede, splat = "tag", align = "left", id }: SectionHeadProps) => (
  <div id={id} className={`relative scroll-mt-24 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}`}>
    <span
      aria-hidden
      className="splat -left-10 -top-10 h-40 w-56"
      style={{ background: splatColor[splat] }}
    />
    <span aria-hidden className="splat -top-6 left-40 h-24 w-32 opacity-40" style={{ background: "var(--pink)" }} />
    <p className={`sticker sticker-${splat === "tag" ? "tag" : splat} relative`}>{eyebrow}</p>
    <h2 className="font-display outline-text relative mt-4 text-5xl leading-[0.9] sm:text-6xl lg:text-7xl">{title}</h2>
    {lede && <p className="relative mt-5 max-w-2xl text-base leading-7 text-chalk/70 sm:text-lg">{lede}</p>}
  </div>
);

export default SectionHead;
