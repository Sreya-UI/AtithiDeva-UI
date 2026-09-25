"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  "✦ Five-Star Front Desk Architecture",
  "✦ Real-Time Room Status Board",
  "✦ Instant Ledger & Folio Settlement",
  "✦ Back-Calculated Corporate Quotations",
  "✦ Turnaround Housekeeping Cycle",
  "✦ Banquet Enquiries & Hall Calendar",
  "✦ Fine Dining Table Service & KOT",
  "✦ Automated Night Audit & Reconciliation",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-brass-soft/30 bg-gradient-to-r from-sand/30 via-paper to-sand/30 py-3.5">
      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 28,
              ease: "linear",
            },
          }}
          className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 text-[0.82rem] font-semibold tracking-wide text-ink-70"
        >
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-3">
              <span className="text-brass font-bold">{item}</span>
              <span className="size-1 rounded-full bg-brass-soft/60" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
