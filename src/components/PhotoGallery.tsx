"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GalleryPhoto } from "@/lib/queries";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Repeating bento pattern: a big square, a tall tile, then regular tiles
const spanFor = (i: number) => {
  const n = i % 8;
  if (n === 0) return "col-span-2 row-span-2";
  if (n === 3) return "row-span-2";
  if (n === 6) return "col-span-2";
  return "";
};

export default function PhotoGallery({
  photos,
  categories,
  showTabs = true,
}: {
  photos: GalleryPhoto[];
  categories: string[];
  showTabs?: boolean;
}) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const visible = active === "All" ? photos : photos.filter((p) => p.category === active);

  // Mega-menu links point at /gallery#<category-slug>; pick that tab when the hash matches
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      const match = categories.find((c) => slug(c) === hash);
      if (match) {
        setActive(match);
        document.getElementById("photos")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [categories]);

  const step = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  const current = lightbox === null ? null : visible[lightbox];

  return (
    <>
      <div className={`mb-10 flex flex-wrap justify-center gap-2 ${showTabs ? "" : "hidden"}`}>
        {["All", ...categories].map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`relative cursor-pointer rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
              active === t ? "text-navy-deep" : "text-muted hover:text-ink"
            }`}
          >
            {active === t && (
              <motion.span
                layoutId="gallery-tab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-deep"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-flow-dense grid-cols-2 auto-rows-[160px] gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:auto-rows-[230px]"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((img, i) => (
            <motion.button
              key={img.src}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightbox(i)}
              className={`group relative cursor-zoom-in overflow-hidden rounded-xl border border-line bg-sand text-left ${spanFor(i)}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute right-3 top-3 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <Expand size={16} />
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-4 max-sm:p-3">
                <span className="mb-2 block h-0.5 w-5 bg-gold transition-[width] duration-500 group-hover:w-10" />
                <div className="text-[10px] font-semibold uppercase tracking-[2px] text-gold">{img.category}</div>
                <div className="mt-0.5 text-[14px] font-medium leading-snug text-white sm:text-[16px]">{img.alt}</div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {current && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-md sm:p-10"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[75vh] w-full max-w-[1100px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </motion.div>

            <div className="absolute bottom-6 left-0 right-0 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[2px] text-gold">{current.category}</div>
              <div className="mt-1 text-white">{current.alt}</div>
              <div className="mt-1 text-xs text-muted">
                {lightbox! + 1} / {visible.length}
              </div>
            </div>

            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={22} />
            </button>
            {visible.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-navy-deep shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform hover:scale-110 sm:left-6"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-navy-deep shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform hover:scale-110 sm:right-6"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
