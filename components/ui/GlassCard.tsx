"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "gold" | "sith" | "jedi" | "none";
  onClick?: () => void;
  delay?: number;
  animate?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
  onClick,
  delay = 0,
  animate = true,
}: GlassCardProps) {
  const glowClasses = {
    gold: "hover:border-gold/30 hover:shadow-gold",
    sith: "hover:border-sith/30 hover:shadow-sith",
    jedi: "hover:border-jedi/30 hover:shadow-jedi",
    none: "",
  };

  const Component = animate ? motion.div : "div";

  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, delay },
        whileHover: hover ? { y: -4, scale: 1.01 } : undefined,
      }
    : {};

  return (
    <Component
      className={cn(
        "glass rounded-xl transition-all duration-300",
        hover && "cursor-pointer",
        glowClasses[glow],
        className
      )}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
