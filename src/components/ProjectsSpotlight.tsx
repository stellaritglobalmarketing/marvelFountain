"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export type Project = { place: string; title: string; image: string };

const ease = [0.16, 1, 0.3, 1] as const;

// The in-view trigger sits on the unclipped tile; these variants cascade to its children
// (a fully clipped element never registers as intersecting).
const curtain: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: (i: number) => ({ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, delay: i * 0.12, ease } }),
};
const zoomOut: Variants = {
  hidden: { scale: 1.3 },
  show: (i: number) => ({ scale: 1, transition: { duration: 1.6, delay: i * 0.12, ease } }),
};
const riseUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 + i * 0.12, ease } }),
};

export default function ProjectsSpotlight({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:h-[32vw] lg:max-h-[520px]">
      {projects.map((p, i) => (
        <motion.div
          key={p.image}
          custom={i}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="group relative h-[70vw] sm:h-[45vw] lg:h-full lg:flex-1 lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(.16,1,.3,1)] lg:hover:flex-[2]"
        >
          <motion.div custom={i} variants={curtain} className="absolute inset-0 overflow-hidden">
            <Link href="/projects" className="absolute inset-0 block">
              <motion.div custom={i} variants={zoomOut} className="absolute inset-0">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.08]"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

              {/* light sweep on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-[left] duration-[1100ms] ease-out group-hover:left-[150%]"
              />

              <motion.div custom={i} variants={riseUp} className="absolute bottom-0 left-0 right-0 p-6 max-md:p-4">
                <span className="mb-3 block h-0.5 w-6 bg-gold transition-[width] duration-500 group-hover:w-12" />
                <span className="text-gold text-[15px] lg:text-[17px]">{p.place}</span>
                <div className="mt-1 text-[22px] font-medium leading-[28px] text-white lg:text-[26px] lg:leading-[30px] transition-transform duration-500 group-hover:-translate-y-1">
                  {p.title}
                </div>
                <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                  <span className="overflow-hidden whitespace-nowrap pt-2 text-[11px] font-semibold uppercase tracking-widest text-cyan">
                    View Project →
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
