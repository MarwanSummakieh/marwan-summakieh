"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Software", href: "/software" },
  { label: "Game Dev", href: "/games" },
  { label: "Devlog", href: "/devlog" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#fcee0a] bg-[#050505]/95 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-[#fcee0a] transition"
          >
            <span className="grid h-9 w-9 place-items-center border-2 border-[#00f0ff] bg-[#00f0ff] text-xs font-black text-black transition group-hover:bg-[#fcee0a]">
              MS
            </span>
            <span className="hidden sm:inline">Marwan Summakieh</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="border border-[#fcee0a]/60 p-2 text-[#fcee0a] transition hover:bg-[#fcee0a] hover:text-black md:hidden"
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
                const isContact = item.href === "/contact";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 font-bold uppercase tracking-[0.12em] transition ${
                      isActive
                        ? "bg-[#fcee0a] text-black"
                        : isContact
                          ? "border border-[#ff003c] text-[#ff5a7d] hover:bg-[#ff003c] hover:text-white"
                        : "text-white/70 hover:bg-[#00f0ff] hover:text-black"
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
          <nav className="mt-4 flex flex-col gap-1 border border-[#fcee0a]/40 bg-black p-3 text-sm md:hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                    className={`px-3 py-2 font-bold uppercase tracking-[0.12em] transition ${
                    isActive
                      ? "bg-[#fcee0a] text-black"
                      : "text-white/70 hover:bg-[#00f0ff] hover:text-black"
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
