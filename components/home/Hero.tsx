"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { ButtonLink } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { HeroImageScroll } from "@/components/home/HeroImageScroll";

const occupancySplit = [
  { label: "Available", value: 24, className: "text-state-available" },
  { label: "Occupied", value: 18, className: "text-state-occupied" },
  { label: "Cleaning", value: 5, className: "text-state-cleaning" },
  { label: "Maintenance", value: 2, className: "text-state-maintenance" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fade = reduceMotion
    ? {}
    : {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
    };

  return (
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
          {/* ---------------------------------------------------------- Copy */}
          <div className="min-w-0 max-w-xl">
            <motion.div
              {...fade}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-[0.8rem] text-ink-50"
            >
              <span aria-hidden className="h-px w-8 bg-brass-soft" />
              <span>Hotel operations software</span>
            </motion.div>

            <motion.h1
              {...fade}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="optical-display mt-6 text-[2.8rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance sm:text-[3.6rem] lg:text-[4rem]"
            >
              Run the floor.
              <br />
              Close the day.
            </motion.h1>

            <motion.p
              {...fade}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[54ch] text-[1.06rem] leading-[1.68] text-ink-70"
            >
              AtithiDeva holds rooms, reservations, guests, housekeeping, restaurant, banquets,
              billing, finance and reporting in one system. The front desk, the floor and the books
              all read from the same records, so the board on the wall and the balance on the folio
              never disagree.
            </motion.p>

            <motion.div
              {...fade}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/contact">
                Request a demo
                <ArrowRight aria-hidden className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/#quotations" variant="secondary">
                See how a quotation works
              </ButtonLink>
            </motion.div>

            <motion.div
              {...fade}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 border-t border-linen pt-6"
            >
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                {occupancySplit.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[0.74rem] text-ink-50">{item.label}</dt>
                    <dd
                      className={`optical-text mt-1 font-display text-[1.6rem] leading-none font-medium ${item.className}`}
                    >
                      <AnimatedCounter value={item.value} pad={2} />
                    </dd>
                  </div>
                ))}
              </dl>
              <DemoNote className="mt-4" />
            </motion.div>
          </div>

          {/* ------------------------------------------------------- Product */}
          <motion.div
            {...(reduceMotion
              ? {}
              : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-w-0 lg:pl-6"
          >
            <HeroImageScroll />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
