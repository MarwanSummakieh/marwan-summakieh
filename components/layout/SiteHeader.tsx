"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090d1d]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-200"
          >
            Marwan Summakieh
          </Link>
          <button
            type="button"
            className="rounded-full border border-white/10 p-2 text-slate-200 transition hover:border-white/30 hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <nav className="hidden items-center gap-4 text-sm text-slate-200 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1 transition ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        {isMobileMenuOpen && (
          <nav className="mt-4 flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#0c1126]/95 p-4 text-sm text-slate-200 md:hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "hover:bg-white/10 hover:text-white"
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
