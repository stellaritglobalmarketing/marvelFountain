"use client";

import { motion, Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-left" | "fade-right" | "zoom-in";
  delay?: number;
  className?: string;
};

const variantMap: Record<NonNullable<RevealProps["variant"]>, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variantMap[variant]}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.8, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
