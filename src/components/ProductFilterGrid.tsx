"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/queries";

export default function ProductFilterGrid({
  products,
  categoryBySlug,
  tabs,
}: {
  products: Product[];
  categoryBySlug: Record<string, string>;
  tabs: string[];
}) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? products : products.filter((p) => categoryBySlug[p.slug] === active);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        {["All", ...tabs].map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`relative cursor-pointer rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
              active === t ? "text-navy-deep" : "text-muted hover:text-ink"
            }`}
          >
            {active === t && (
              <motion.span
                layoutId="product-tab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-deep"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">
              {t}
              <span className="ml-1.5 opacity-60">
                {t === "All" ? products.length : products.filter((p) => categoryBySlug[p.slug] === t).length}
              </span>
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              className="grid"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={p} delay={(i % 3) * 0.08} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
