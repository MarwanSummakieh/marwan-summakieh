"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blackbook", href: "/devlog" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b-2 border-halo bg-wall/90 text-chalk shadow-[0_4px_0_#000] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-2.5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3" aria-label="MarwanOS home">
            <Image
              src="/brand/marwanos-tag.webp"
              alt="MarwanOS"
              width={1404}
              height={489}
              priority
              className="h-10 w-auto transition group-hover:-rotate-2 group-hover:scale-105 sm:h-11"
            />
            <span className="hidden font-marker text-sm text-chalk/70 lg:inline">marwan summakieh</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="border-2 border-halo bg-concrete p-2 text-chalk shadow-[3px_3px_0_#000] transition hover:bg-tag hover:text-ink md:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const isContact = item.href === "/contact";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-display px-3.5 py-1.5 text-lg tracking-wide transition ${
                      active
                        ? "bg-tag text-ink shadow-[3px_3px_0_#000] outline outline-2 outline-ink"
                        : isContact
                          ? "text-pink hover:bg-pink hover:text-halo hover:shadow-[3px_3px_0_#000]"
                          : "text-chalk/80 hover:bg-halo hover:text-ink hover:shadow-[3px_3px_0_#000]"
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
          <nav className="mt-3 flex flex-col gap-1 border-2 border-halo bg-concrete p-2 shadow-[4px_4px_0_#000] md:hidden">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-display px-3 py-2 text-xl tracking-wide transition ${
                    active ? "bg-tag text-ink" : "text-chalk/80 hover:bg-halo hover:text-ink"
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
