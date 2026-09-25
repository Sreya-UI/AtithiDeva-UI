"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index — each step adds 80ms. */
  index?: number;
  className?: string;
  as?: ElementType;
  /** Distance travelled on entry, in pixels. */
  distance?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
  distance = 32,
  direction = "up",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: distance, x: 0 };
      case "down": return { y: -distance, x: 0 };
      case "left": return { x: distance, y: 0 };
      case "right": return { x: -distance, y: 0 };
      case "none": return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialPosition();

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, scale: 0.98, ...initialOffset }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.75,
        delay: Math.min(index * 0.08, 0.48),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
