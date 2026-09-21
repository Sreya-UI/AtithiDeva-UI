"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatINR } from "@/lib/utils";

export type BarDatum = { label: string; value: number };

export function RevenueBars({
  data,
  tone = "brass",
}: {
  data: readonly BarDatum[];
  tone?: "brass" | "olive";
}) {
  const reduceMotion = useReducedMotion();
  const max = Math.max(...data.map((d) => d.value));
  const fill = tone === "olive" ? "bg-state-available" : "bg-brass";

  return (
    <ul className="space-y-3.5">
      {data.map((item, index) => {
        const share = Math.round((item.value / max) * 100);
        return (
          <li key={item.label}>
            <div className="flex items-baseline justify-between text-[0.82rem]">
              <span className="text-ink-70">{item.label}</span>
              <span data-numeric className="font-medium text-ink">
                {formatINR(item.value)}
              </span>
            </div>
            <div
              aria-hidden
              className="mt-1.5 h-2 overflow-hidden rounded-full bg-linen-soft"
            >
              <motion.div
                className={`h-full rounded-full ${fill}`}
                initial={reduceMotion ? { width: `${share}%` } : { width: 0 }}
                whileInView={{ width: `${share}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.9,
                  delay: reduceMotion ? 0 : 0.08 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
