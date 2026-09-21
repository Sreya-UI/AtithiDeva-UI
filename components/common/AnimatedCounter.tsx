"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  /** Rendered before the number, e.g. a currency symbol. */
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Pads to a fixed width, e.g. 2 renders 5 as "05". */
  pad?: number;
  locale?: string;
  className?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
  pad,
  locale = "en-IN",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setAnimated(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  // Reduced motion, and the frames before the counter enters the viewport,
  // render the final value rather than a number that never settles.
  const display = reduceMotion || !inView ? value : animated;

  const formatted = pad
    ? String(display).padStart(pad, "0")
    : new Intl.NumberFormat(locale).format(display);

  return (
    <span ref={ref} data-numeric className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
