"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Devlog", href: "/devlog" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-[rgba(10,10,12,0.85)] backdrop-blur-xl" : "border-transparent bg-[rgba(10,10,12,0.6)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3" aria-label="Home">
            <Image
              src="/brand/marwanos-tag.webp"
              alt="Marwan"
              width={1404}
              height={489}
              priority
              className="h-9 w-auto transition group-hover:scale-[1.03] sm:h-10"
            />
            <span className="hidden h-4 w-px bg-line-strong sm:inline-block" aria-hidden />
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-chalk-mute lg:inline">
              marwan summakieh
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-line bg-white/[0.03] p-2 text-chalk-dim transition hover:border-line-strong hover:text-chalk md:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition ${
                      active ? "bg-white/[0.07] text-chalk" : "text-chalk-dim hover:bg-white/[0.04] hover:text-chalk"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-tag shadow-[0_0_8px_rgba(80,227,128,0.9)]"
                      />
                    )}
                  </Link>
                );
              })}
              <Link href="/contact" className="btn-tag ml-2 px-4 py-1.5 text-xs">
                Let&apos;s talk
              </Link>
            </nav>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            className="mt-3 flex flex-col gap-1 rounded-2xl border border-line bg-[rgba(18,18,22,0.95)] p-2 shadow-2xl shadow-black/60 md:hidden"
            aria-label="Mobile"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-2.5 text-base font-medium transition ${
                    active ? "bg-white/[0.07] text-chalk" : "text-chalk-dim hover:bg-white/[0.04] hover:text-chalk"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
