"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Devlog", href: "/devlog" },
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
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-[hsl(210,10%,6%)]/80">
      <div className="mx-auto max-w-5xl px-6 py-4 sm:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-300"
          >
            Marwan Summakieh
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="rounded-full border border-black/10 p-2 text-slate-600 transition hover:border-black/30 hover:text-slate-900 dark:border-white/10 dark:text-slate-200 dark:hover:border-white/30 dark:hover:text-white md:hidden"
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
            <nav className="hidden items-center gap-1 text-sm md:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-1.5 transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-white/15 dark:text-white"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        {isMobileMenuOpen && (
          <nav className="mt-4 flex flex-col gap-1 rounded-2xl border border-black/5 bg-white/95 p-3 text-sm dark:border-white/10 dark:bg-[hsl(210,10%,8%)]/95 md:hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-white/15 dark:text-white"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
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
