"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

// Trigger lives on the unclipped wrapper; a fully clipped element never registers as in view.
const curtain: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  show: (i: number) => ({ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1, delay: i * 0.1, ease } }),
};
const zoomOut: Variants = {
  hidden: { scale: 1.25 },
  show: (i: number) => ({ scale: 1, transition: { duration: 1.5, delay: i * 0.1, ease } }),
};
const rise: Variants = {
  hidden: { opacity: 0, y: -16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.45 + i * 0.1, ease } }),
};

export default function CategoryTile({
  title,
  href,
  image,
  subtitle,
  index = 0,
  className = "",
}: {
  title: string;
  href: string;
  image: string;
  subtitle?: string;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`group relative ${className}`}
    >
      <motion.div custom={index} variants={curtain} className="absolute inset-0 overflow-hidden rounded-2xl bg-navy-deep">
        <Link href={href} className="absolute inset-0 block">
          <motion.div custom={index} variants={zoomOut} className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(.33,1,.68,1)] group-hover:scale-[1.06] group-hover:saturate-[0.75]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/15 to-navy-deep/40 transition-opacity duration-500 group-hover:opacity-90" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-[left] duration-[1100ms] ease-out group-hover:left-[150%]"
          />
          <motion.div custom={index} variants={rise} className="absolute top-0 left-0 right-0 p-7 max-md:p-5">
            <span className="mb-3 block h-0.5 w-6 bg-gold transition-[width] duration-500 group-hover:w-12" />
            <span className="block text-[clamp(18px,1.9vw,26px)] font-bold font-serif leading-[1.2] text-white transition-colors group-hover:text-gold">
              {title}
            </span>
            {subtitle && <span className="mt-2 block max-w-[320px] text-[13px] font-light text-[#cfd0d1]">{subtitle}</span>}
          </motion.div>
          <span className="absolute bottom-6 left-7 text-[11px] font-semibold uppercase tracking-widest text-cyan opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 max-md:left-5">
            Explore →
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
