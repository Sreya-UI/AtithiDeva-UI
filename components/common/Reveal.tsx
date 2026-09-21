"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index — each step adds 70ms. */
  index?: number;
  className?: string;
  as?: ElementType;
  /** Distance travelled on entry, in pixels. Kept small on purpose. */
  distance?: number;
};

/**
 * A restrained entrance: 14px of travel and a fade, once, when the element
 * first enters the viewport. Disabled entirely under prefers-reduced-motion.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
  distance = 14,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.07, 0.42),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
