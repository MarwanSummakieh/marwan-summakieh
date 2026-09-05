import type { ReactNode } from "react";

type Splat = "tag" | "violet" | "pink" | "peach" | "sky";

const splatColor: Record<Splat, string> = {
  tag: "rgba(80, 227, 128, 0.5)",
  violet: "rgba(109, 92, 255, 0.5)",
  pink: "rgba(255, 77, 141, 0.45)",
  peach: "rgba(255, 178, 122, 0.45)",
  sky: "rgba(88, 200, 255, 0.45)",
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
  <div id={id} className={`relative scroll-mt-28 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}`}>
    <span
      aria-hidden
      className="splat -top-16 left-0 h-44 w-72 opacity-60"
      style={{ background: splatColor[splat] }}
    />
    <p className={`eyebrow relative ${align === "center" ? "flex justify-center" : ""}`}>{eyebrow}</p>
    <h2 className="font-display relative mt-3 text-4xl font-semibold leading-[1.05] text-chalk sm:text-5xl lg:text-6xl">
      {title}
    </h2>
    {lede && (
      <p className={`relative mt-4 max-w-2xl text-base leading-7 text-chalk-dim sm:text-lg ${align === "center" ? "mx-auto" : ""}`}>
        {lede}
      </p>
    )}
  </div>
);

export default SectionHead;
