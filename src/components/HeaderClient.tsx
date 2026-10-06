"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { NavLink } from "@/lib/queries";

export type MegaMenu = {
  recommended: NavLink[];
  buttons: NavLink[];
  columns: { title: string; links: NavLink[]; viewAll?: string }[];
};
export type NavItem = NavLink & { mega?: MegaMenu };

export default function HeaderClient({
  navItems,
  solid = false,
  title,
}: {
  navItems: NavItem[];
  solid?: boolean;
  title?: string;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  // Mobile only (Fontana-style): the header is not pinned, it scrolls away with the page; on
  // pages with a title a slim title bar sticks to the top once the header is out of view.
  const [tucked, setTucked] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!solid) setScrolled(y > 40);
      if (title) setTucked(y > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid, title]);

  const openMega = (label: string | null) => {
    clearTimeout(closeTimer.current);
    setMega(label);
  };
  // small delay so the pointer can travel from the nav link down into the panel
  const closeMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 140);
  };
  const closeAll = () => {
    clearTimeout(closeTimer.current);
    setMega(null);
    setOpen(false);
  };

  const isSolidState = solid || scrolled || mega !== null;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    {title && (
      <div
        className={`md:hidden fixed inset-x-0 top-0 z-[99] flex h-14 items-center border-b border-line bg-navy-deep/95 px-4 backdrop-blur-md transition-transform duration-300 ${
          tucked ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="truncate text-left text-[19px] font-semibold tracking-[-0.01em] text-ink"
        >
          {title}
        </button>
      </div>
    )}
    <header
      className={`fixed top-0 left-0 right-0 z-[100] border-b transition-all duration-300 max-md:absolute max-md:border-line max-md:bg-navy-deep max-md:shadow-none max-md:backdrop-filter-none ${
        isSolidState
          ? "bg-navy-deep/95 border-line shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md"
          : "bg-gradient-to-b from-navy-deep/60 to-transparent border-transparent"
      }`}
    >
      <div
        className={`max-w-[1240px] mx-auto flex items-center justify-between gap-6 px-7 transition-[padding] duration-300 max-md:h-20 max-md:px-4 max-md:py-0 ${
          isSolidState ? "py-2.5" : "py-4"
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center" onClick={closeAll}>
          <span className="flex items-center rounded-lg bg-white px-3 py-1.5 shadow-[0_4px_16px_rgba(212,175,55,0.15)]">
            <Image
              src="/logo.png"
              alt="Marvel Fountains logo"
              height={73}
              width={249}
              className="w-auto"
              style={{ height: "38px" }}
              priority
            />
          </span>
        </Link>

        <nav>
          {/* Mobile: the menu drops down inside the page and scrolls with it (no scroll lock) */}
          <ul
            className={`flex gap-8 lg:gap-9 max-md:absolute max-md:inset-x-0 max-md:top-full max-md:min-h-[calc(100svh-5rem)] max-md:flex-col max-md:justify-start max-md:gap-0 max-md:border-b max-md:border-line max-md:bg-navy-deep max-md:px-4 max-md:pt-4 max-md:pb-12 max-md:transition-[opacity,visibility,translate] max-md:duration-300 ${
              open ? "max-md:visible max-md:translate-y-0 max-md:opacity-100" : "max-md:invisible max-md:-translate-y-3 max-md:opacity-0"
            }`}
          >
            {navItems.map((item) => (
              <li
                key={item.href}
                className="max-md:border-b max-md:border-line"
                onMouseEnter={() => (item.mega ? openMega(item.label) : openMega(null))}
                onMouseLeave={item.mega ? closeMega : undefined}
              >
                <div className="flex items-center justify-between gap-1">
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className={`nav-link font-medium text-[16px] pb-1 whitespace-nowrap transition-colors max-md:py-4 max-md:text-[28px] max-md:tracking-[-0.02em] max-md:text-ink max-md:after:hidden hover:text-cyan ${
                      isActive(item.href) || mega === item.label ? "text-cyan" : isSolidState ? "text-ink" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.mega && (
                    <>
                      <ChevronDown
                        size={14}
                        className={`hidden md:block -ml-0.5 pb-0.5 transition-transform duration-300 ${
                          mega === item.label ? "rotate-180 text-cyan" : isSolidState ? "text-ink/70" : "text-white/80"
                        }`}
                      />
                      <button
                        className="md:hidden cursor-pointer p-2 text-ink"
                        aria-label={`Show ${item.label} links`}
                        aria-expanded={mobileSub === item.label}
                        onClick={() => setMobileSub((v) => (v === item.label ? null : item.label))}
                      >
                        <ChevronDown
                          size={26}
                          strokeWidth={1.5}
                          className={`transition-transform duration-300 ${mobileSub === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    </>
                  )}
                </div>

                {/* Mobile: accordion of the mega-menu links */}
                {item.mega && (
                  <div
                    className={`md:hidden grid transition-[grid-template-rows] duration-300 ${
                      mobileSub === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {item.mega.columns.map((col) => (
                        <div key={col.title} className="pb-5">
                          <div className="mb-2 text-[12px] font-semibold uppercase tracking-[2px] text-gold">{col.title}</div>
                          {col.links.map((l, i) => (
                            <Link
                              key={`${l.label}-${i}`}
                              href={l.href}
                              onClick={closeAll}
                              className="block py-1.5 text-[17px] text-muted hover:text-cyan"
                            >
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Desktop: full-width mega panel (positioned against the fixed header) */}
                {item.mega && (
                  <AnimatePresence>
                    {mega === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="max-md:hidden absolute left-0 right-0 top-full border-t border-line bg-navy-deep/[0.98] shadow-[0_30px_60px_rgba(0,0,0,0.45)] backdrop-blur-md"
                      >
                        <MegaPanel menu={item.mega} onNavigate={closeAll} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/contact"
          onClick={closeAll}
          className="hidden lg:inline-flex items-center rounded-full bg-cyan px-6 py-2.5 font-semibold text-xs tracking-widest uppercase text-navy-deep whitespace-nowrap shadow-[0_6px_18px_rgba(63,197,240,0.35)] transition-all hover:shadow-[0_8px_24px_rgba(63,197,240,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_8px_rgba(63,197,240,0.4)]"
        >
          Get Quote
        </Link>

        <button
          className="hidden max-md:flex h-11 w-11 -mr-1.5 items-center justify-center cursor-pointer z-10 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {/* three thin lines that fold into an X */}
          <span className="relative block h-4 w-8">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300"
                style={{
                  top: open ? 7 : i * 7,
                  opacity: open && i === 1 ? 0 : 1,
                  transform: open && i !== 1 ? `rotate(${i === 0 ? 45 : -45}deg)` : undefined,
                }}
              />
            ))}
          </span>
        </button>
      </div>
    </header>
    </>
  );
}

function MegaPanel({ menu, onNavigate }: { menu: MegaMenu; onNavigate: () => void }) {
  return (
    <div
      className="mx-auto grid max-w-[1240px] gap-10 px-7 py-12"
      style={{ gridTemplateColumns: `repeat(${Math.max(menu.columns.length + 1, 4)}, minmax(0, 1fr))` }}
    >
      <div className="flex flex-col">
        <div className="mb-4 text-[15px] font-light text-muted/60">Recommended:</div>
        {menu.recommended.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            onClick={onNavigate}
            className="mb-3 text-[20px] font-light text-ink transition-colors hover:text-gold"
          >
            {l.label}
          </Link>
        ))}
        <div className="mt-auto flex flex-col gap-2 pt-10">
          {menu.buttons.slice(0, 2).map((b, i) => (
            <Link
              key={`${b.label}-${i}`}
              href={b.href}
              onClick={onNavigate}
              className={
                i === 0
                  ? "rounded-md bg-gold px-4 py-3 text-[14px] font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
                  : "rounded-md border border-line px-4 py-3 text-[14px] text-muted transition-colors hover:border-cyan hover:text-cyan"
              }
            >
              {b.label}
            </Link>
          ))}
        </div>
      </div>

      {menu.columns.map((col, ci) => (
        <motion.div
          key={col.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 + ci * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-5 text-[20px] font-medium text-ink">{col.title}</div>
          <ul className="flex flex-col gap-3">
            {col.links.map((l, i) => (
              <li key={`${l.label}-${i}`}>
                <Link
                  href={l.href}
                  onClick={onNavigate}
                  className="inline-block text-[16px] font-light text-muted transition-all duration-300 hover:translate-x-1 hover:text-cyan"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {col.viewAll && (
            <Link
              href={col.viewAll}
              onClick={onNavigate}
              className="arrow-link mt-6 inline-block text-[14px] text-muted/70 transition-colors hover:text-ink"
            >
              View all
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
}
