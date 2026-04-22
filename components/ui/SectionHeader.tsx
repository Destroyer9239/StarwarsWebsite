"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleClass?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  titleClass = "text-gold",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${isCenter ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <p className="font-display text-xs tracking-[0.3em] text-gold/70 uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl md:text-4xl font-bold tracking-wide uppercase ${titleClass}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed text-slate-400 ${isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {description}
        </p>
      )}
      <div className={`mt-6 divider-gold max-w-xs ${isCenter ? "mx-auto" : ""}`} />
    </motion.div>
  );
}
